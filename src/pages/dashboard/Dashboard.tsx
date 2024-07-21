import { useEffect } from "react";
import Header from "../../components/Header";
import Done from "../../components/dashboard/done/Done";
import ToDo from "../../components/dashboard/todo/ToDo";
import './dashboard.css'
import { getImageFromLocalStorage } from "../../utils/utils";
import { useNavigate } from "react-router-dom";





export default function Dashboard() {  

  const navigate = useNavigate()
  useEffect(()=>{
    
    if(getImageFromLocalStorage() === ''){ // Si no hay imagen de usuario en el localStorage, redirigimos al usuario al login
      navigate('/')
    }else{
      document.title = 'Mercurial || Dashboard' // Si esta la imagen podemos cambiar el titulo del documento de la siguiente forma
    }
  })

  /**
   * Este componente es el proncipal del dashboard, en el se encuentran los componentes ToDo y Done
   * Las asignaturas y las tareas pendientes se mostrarán en el componente ToDo, 
   * mientras que las tareas completadas se mostrarán en el componente Done 
   * Cada componente hace de forma independiente las peticiones a la API para obtener los datos, esto con el fin de que el dashboard sea más rápido
   * e independiente
   */
  return (
    <div>
    

      
       <div>
        <Header />
        <div className="dashboardMainContainer">
         <ToDo/> {/**Aquí importamos el componente to do
          */}
         <Done  /> {/** Aquí importamos el compoenente Done */}
        </div>
        
       </div>
       
       
       

  

    </div>
  )
}