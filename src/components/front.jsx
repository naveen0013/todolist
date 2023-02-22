import React,{useEffect, useState} from 'react'
import {Button,Card,ButtonGroup, FormControl,Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function DoLists(data) {
    let navigate=useNavigate();
    let taskList=data.data.taskList
    let datee=new Date();
    const [searched,setSearched]=useState("");
    const [tasks,setTasks]=useState(taskList);

useEffect(()=>{
        if(searched!==""){
            taskList=data.data.taskList.filter(t=> {return t.title.toLowerCase().indexOf(searched.toLowerCase())!==-1});
            console.log(taskList);
            setTasks(taskList);
        }else{
            taskList=data.data.taskList;
            setTasks(taskList)
        }   
        },[searched,taskList])

    const deleteTask=(id)=>{
        taskList=taskList.filter(t=> t.id!==id);
        console.log(taskList);
        data.data.setTasklist(taskList)
    }

    const completedTask=(task)=>{
        taskList=taskList.filter(t=> t.id!==task.id);
       const  newtask={...task,done:true};
        taskList=[...taskList,newtask];
        data.data.setTasklist(taskList);
    }

    const handleCardclick=(task)=>{
        data.data.setEditing(true);
        data.data.setSelectedTask(task);
        navigate(`/task/${task.id}`)
    }


  return (
    <div className='all'>
        <div className='top' >
            <h3 style={{width:'30%'}} >ToDoList</h3> 
            <FormControl placeholder="Search tasks..." id="searchBar" type="text" onKeyDown={(e)=>setSearched(e.target.value)} onChange={(e)=>setSearched(e.target.value)} value={searched} />     
        </div>
        <div className='mid'>
        <br /><br />
            {
                tasks.map(task=>  {
                   return   <div key={task.id} ><Card  className={task.done ? "completed" : "notCompleted"} id="cardId">  
                                    <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card.Text  onClick={()=>!task.done && handleCardclick(task)} className='cardText'>{task.detail} <br/>
                                  <p>{task.date}</p> </Card.Text>
{ !task.done ?              <div >         { task.date[8]+task.date[9]<(datee.getDate()).toString() && <Card.Text >Expired</Card.Text>}
                                    <ButtonGroup  id="notdone">
                                        <Button variant="success" onClick={()=>completedTask(task)} className="doneBtn"><i className="fa fa-check"></i></Button>
                                        <Button variant="info" className="primaryBtn" onClick={()=>deleteTask(task.id)} ><i className="fa fa-trash"></i></Button>
                                    </ButtonGroup>  </div>:
                                                        
                                                        <div id="done"  >   <Button variant="danger" style={{float:"right"}} className='primaryBtn' onClick={()=>deleteTask(task.id)} ><i className="fa fa-trash"></i></Button>
                                                       
                                                     </div> }

                                                       
                                    </Card.Body>
                                    
                                </Card>
                                <br />
                                </div>  
                } )
            }
        </div>
        <Button onClick={()=>navigate('/addtask')} id="addBtn" variant="info" className="primaryBtn"><i className="fa fa-plus"></i></Button>
    </div>
  )
}

export default DoLists