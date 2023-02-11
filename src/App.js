import {useState} from 'react';

import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ToDo from './components/ToDo'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

const [toDo, setToDo] = useState ([
  {"id": 1, "title": "Cristiano Ronaldo", "status": false},
  {"id": 2, "title": "Lionel Messi", "status": false},
  {"id": 3, "title": "Karin Benzema", "status": false},
  {"id": 4, "title": "Kylian Mbappe", "status": false},
  {"id": 5, "title": "Ricardo Kaka", "status": false},
  {"id": 6, "title": "Vinicius Junior", "status": false},
  {"id": 7, "title": "Gareth Bale", "status": false},
]);

const [newTask, setNewTask] = useState ('');
const [updateData, setUpdateData] = useState ('');

const addTask = () => {
  if (newTask) {
    let num = toDo.length + 1;
    let newEntry = { id: num, title: newTask, status: false}
    setToDo([...toDo, newEntry])
    setNewTask('');
  }
}

const deleteTask = (id) => {  
  let newTask = toDo.filter( task => task.id !== id)
  setToDo(newTask); 
}

const markDone = (id) => {
  let newTask = toDo.map ( task => {
    if( task.id === id ) {
      return ({ ...task, status: !task.status })
    }
    return task;
  })
  setToDo(newTask);
}

const cancelUpdate = () => {
  setUpdateData('');
}

const changeTask = (e) => {
  let newEntry = {
    id: updateData.id, title: e.target.value, status: updateData.status ? true : false 
  }
  setUpdateData(newEntry);
}

const updateTask = () => {
 let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
 let updatedObject = [...filterRecords, updateData]
 setToDo(updatedObject);
 setUpdateData('');
}
  return (
    <div className="container App">

    <br></br>
    <h1>Escribe tus jugadores Favoritos de Futbol</h1> 
    <br></br>

    {updateData && updateData ? (
     <UpdateForm
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
     />

    ) : (
      <AddTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}
    
    {toDo && toDo.length ? '' : 'No hay tareas...'}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    
    </div>
  );
}

export default App;
