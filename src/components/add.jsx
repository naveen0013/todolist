import React,{useState,useEffect} from 'react'
import { Button, Form, FormControl, FormGroup,FormLabel } from 'react-bootstrap';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function AddTask(data) {
    const navigate=useNavigate();
    let datee=new Date();
    let initially={};
    const initial={title:"",detail:"",date:datee}
    data.data.editing ? initially=data.data.selectedTask : initially=initial
    const [task,setTask]=useState(initially);

    useEffect(()=>{
        setTask(initially);
    },[data.data.editing])

    const HandleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setTask({...task,[name]:value})
    }


    // const [file, setFile] = useState(''); // storing the uploaded file    
    // // storing the recived file from backend
    // const [datafile, getFile] = useState({ name: "", path: "" });    
    // const [progress, setProgess] = useState(0);
    // const uploadFile = () => {
    //     const formData = new FormData();        
    //     formData.append('file', file); // appending file
    //     axios.post('http://localhost:3000/upload', formData, {
    //         onUploadProgress: (ProgressEvent) => {
    //             let progress = Math.round(
    //             ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
    //             setProgess(progress);
    //         }
    //     }).then(res => {
    //         console.log(res);
    //         getFile({ name: res.data.name,
    //                  path: 'http://localhost:3000' + res.data.path
    //                })
    //     }).catch(err => console.log(err))}

    const createTask=()=>{
       console.log("t-",task)
       if( data.data.editing) {
            data.data.settingEditTask(task);//uploadFile(task.file);
         }
       else{ 
            data.data.settingTasklist(task);// uploadFile(task.file);
        }
       navigate('/');
    }


  return (
    <div className='all'>
                <div className='footer'>
            <Form>
                <FormGroup>
                    <FormLabel>Title:</FormLabel>
                    <FormControl type='text'  name="title" onChange={HandleChange} value={task.title}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Date:</FormLabel>
                    <FormControl type='date'  name="date" onChange={HandleChange} value={task.date}/>
                </FormGroup>
                {/* <FormGroup>
                    <FormLabel>File:</FormLabel>
                    <FormControl type='file'  name="file" onChange={HandleChange} value={task.file}/>
                </FormGroup> */}
                <FormGroup>
                    <FormLabel>Detail:</FormLabel>
                    <textarea type='text' name="detail"  onChange={HandleChange} value={task.detail}  rows="10" cols="69" />
                </FormGroup>
                <br />
                <Button onClick={createTask} className="primaryBtn" >Save</Button>
            </Form>
        </div>
    </div>
  )
}

export default AddTask