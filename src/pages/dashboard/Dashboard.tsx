import Header from "../../components/Header";
import Done from "../../components/dashboard/done/Done";
import ToDo from "../../components/dashboard/todo/ToDo";
import './dashboard.css'
import json from '../../../public/dataset.json'
import { useState } from "react";


export default function Dashboard(){
  const [subjects] = useState(json.subjects)
  const [tasks] = useState(json.tasks)
  /**
   * Este componente es el proncipal del dashboard, en el se encuentran los componentes ToDo y Done
   * Aquí realizaremos la petición a la API, la cual nos retornará las tareas y asignaturas correspondientes al usuario
   * Las asignaturas y las tareas pendientes se mostrarán en el componente ToDo, 
   * mientras que las tareas completadas se mostrarán en el componente Done 
   * Por ahora, utilizaremos un archivo JSON para simular la respuesta de la API
   */
  return (
    <div>
      <Header picture="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
      <div className="dashboardMainContainer">
        <ToDo subjects={subjects} tasks={tasks}/> {/**Aquí importamos el componente to do */}
        <Done tasks={tasks}/> {/** Aquí importamos el compoenente Done */}
      </div>


    </div>
  )
}