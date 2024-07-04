import Header from "../../components/Header";
import Done from "../../components/dashboard/done/Done";
import ToDo from "../../components/dashboard/todo/ToDo";
import './dashboard.css'
import json from '../../../public/dataset.json'
import { useState } from "react";


export default function Dashboard(){
  const [subjects] = useState(json.subjects)
  const [tasks] = useState(json.tasks)
  const [create, setCreate] = useState(false)

  function createTask(){
    setCreate(!create)
  }
  /**
   * Este componente es el proncipal del dashboard, en el se encuentran los componentes ToDo y Done
   * Aquí realizaremos la petición a la API, la cual nos retornará las tareas y asignaturas correspondientes al usuario
   * Las asignaturas y las tareas pendientes se mostrarán en el componente ToDo, 
   * mientras que las tareas completadas se mostrarán en el componente Done 
   * Por ahora, utilizaremos un archivo JSON para simular la respuesta de la API
   */
  return (
    <div>
      
      {
        create ? 
        <div className="createTaskContainer">
          <div className="createTask">
            <h1>Create Task</h1>
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Description"/>
            <input type="text" placeholder="Subject"/>
            <input type="text" placeholder="Topic"/>
            <button onClick={createTask}>Create</button>
          </div>
        </div> /** En este fragmento mas adelante irá el componenete que va a permitir crear las tareas
         * Por el momento solo se muestra este formulario basico sin funcionalidad
          */
        : null
      }
      <Header picture="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
      <div className="dashboardMainContainer">
        <ToDo subjects={subjects} tasks={tasks} createTask={createTask}/> {/**Aquí importamos el componente to do
         * Enviamos la funcion de createTask para poder que en el todo mediante un evento accionado por el 
         * boton + se muestre el formulario de creación de tareas
         */}
        <Done tasks={tasks}/> {/** Aquí importamos el compoenente Done */}
      </div>
     
        
  
      
    
      


    </div>
  )
}