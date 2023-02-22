import './App.css';
import {Route,Routes , BrowserRouter as Router} from 'react-router-dom';
import DoLists from './components/front';
import AddTask from './components/add';
import {useEffect, useState} from "react";
//import io from 'socket.io-client';
import Indexview from './components/indexView';


//const socket=io.connect("http://localhost:3001");
const data=[
  {id:1,title:"titleCard1",detail:"taskDetail",done:false,date:'2022-07-10'},
  {id:2,title:"titleCard2",detail:"taskDetail",done:false,date:'2022-07-10'},
  {id:3,title:"titleCard3",detail:"taskDetail",done:false,date:'2022-07-10'},
]
function App() {

  const [editing,setEditing]=useState(false);
  const [selectedTask,setSelectedTask]=useState({});
  const [taskList,setTasklist]=useState([]);
  useEffect(()=>{
  // socket.on("data",(data)=>{
  //      setTasklist(data)
  // })
  //fetch("http://localhost:3001").then(res=>res.json()).then(res=>setTasklist(res))
  setTasklist(data);

},[])

const settingTasklist=(task)=>{
  task={id:taskList.length+1,done:false,...task};
  console.log(task);
  setTasklist([task,...taskList])

}

const settingEditTask=(task)=>{
  setEditing(false);
  setTasklist(taskList.map(t=> t.id===task.id ? task : t))

}


  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<DoLists data={{taskList,settingTasklist,setTasklist,setEditing,setSelectedTask}}/>} />
        <Route path={"/addtask"} element={<AddTask data={{settingTasklist,editing}} />} />
        <Route path={"/task/:id"} element={<AddTask data={{editing,selectedTask,settingEditTask}} />} />
        <Route path={"/try"} element={<Indexview data={{taskList,settingTasklist,setTasklist}} />} />

      </Routes>
    </Router>
  );
}

export default App;
