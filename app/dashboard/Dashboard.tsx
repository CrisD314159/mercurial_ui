import { useEffect, useState } from "react";
import Header from "../ui/Header";
import Done from "../ui/dashboard/done/Done";
import ToDo from "../ui/dashboard/todo/ToDo";
import './dashboard.css'
import { Alert } from "@mui/material";
import BottomNav from "../ui/bottomNav/BottomNav";
import useTasks from "../hooks/useTasks";
import Subjects from "./subjects/Subjects";
import Topics from "./subjects/topics/Topics";





export default function Dashboard() {
  const { filteredTasks, donetasks, handleTaskCreation, markAsDone, markAsRollBack, deleteTask, filterTasks } = useTasks()
  const [value, setValue] = useState('todo');
  //const [tasks, setTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario
  //const [filteredTasks, setFilterdTasks] = useState<Task[]>(tasks) // Estado que contendrá las tareas del usuario esto lo hacemos para poder filtrar sin necesidad de hacer otra petición
  // const [donetasks, setDoneTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página
  
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

 


  useEffect(() => {
    document.title = 'Mercurial || Dashboard' // Si esta la imagen podemos cambiar el titulo del documento de la siguiente forma
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className="dashboardMainContainer">
        <Header />
          {
            alert && <Alert severity="error" onClose={() => setAlert(false)}>There was an error with the content loading</Alert>
          }
          <div className="dashboardContainer">
            {value === 'todo' && <ToDo tasks={filteredTasks} handletaskCreation={handleTaskCreation} deleteTask={deleteTask} filterTasks={filterTasks} markAsDone={markAsDone} /> }
            {value === 'done' && <Done tasks={donetasks} markAsRollBack={markAsRollBack} />}
            {value === 'subjects' && <Subjects/>}
            {value === 'topics' && <Topics/>}
            {/**Aquí importamos el componente to do
             y le pasamos por props todos los metodos necesarios para el funcionamiento*/}
            
          </div>
          <footer className="bottomNavContainer">
              <BottomNav value={value} handleChange={handleChange}/>
          </footer>

        </div>
    

      </div>






    </div>
  )
}