import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Done from "../../components/dashboard/done/Done";
import ToDo from "../../components/dashboard/todo/ToDo";
import './dashboard.css'
import { getDoneTasks, getImageFromLocalStorage, getTasks, logout } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Task, TaskDoneList, TaskList } from "../../components/types/types";
import { Alert } from "@mui/material";





export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario
  const [filteredTasks, setFilterdTasks] = useState<Task[]>(tasks) // Estado que contendrá las tareas del usuario esto lo hacemos para poder filtrar sin necesidad de hacer otra petición
  const [donetasks, setDoneTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página

  const tasksMutation = useMutation<TaskList, Error>({
    mutationFn: getTasks,
    onSuccess: (data: TaskList) => {
      setTasks(data.tasksUser) // Si hay tareas, entonces seteamos las tareas en el estado tasks
      setFilterdTasks(data.tasksUser) // Si hay tareas, entonces seteamos las tareas en el estado tasksContainer    
    },
    onError: (error: Error) => {
      if (error.message === 'Unauthorized') { // Si el error es Unauthorized, entonces cerramos la sesión del usuario y lo redirigimos al login
        logout() // Función que cierra la sesión del usuario
        localStorage.clear() // Limpiamos el localStorage, es decir la imagen del usuario
        navigate('/') // Redirigimos al usuario al login
      } else {
        setAlert(true) // Si es otro error diferente, entonces mostramos una alerta de error
      }

    }
  })

  const doneTasksMutation = useMutation<TaskDoneList, Error>({ // Mutación que obtiene las tareas completadas del usuario
    mutationFn: getDoneTasks, // Función que se encarga de hacer la petición
    onSuccess: (data: TaskDoneList) => {
      setDoneTasks(data.tasks) // Si hay tareas completadas, entonces seteamos las tareas en el estado donetasks
    },
    onError: (error: Error) => {
      if (error.message === 'Unauthorized') { // Si el error es Unauthorized, entonces cerramos la sesión del usuario y lo redirigimos al login
        logout() // Función que cierra la sesión del usuario
        localStorage.clear() // Limpiamos el localStorage, es decir la imagen del usuario
        navigate('/') // Redirigimos al usuario al login
      } else {
        setAlert(true) // Si es otro error diferente, entonces mostramos una alerta de error
      }

    }
  })

  const handleTaskCreation = (task: Task) => { // Función que se encarga de añadir una tarea a la lista de tareas
    if(tasks && tasks.length> 0){
      setTasks([...tasks, task]) // Añadimos la tarea al estado
      setFilterdTasks([...tasks, task]) // Añadimos la tarea al estado

    }else{
      setTasks([task]) // Añadimos la tarea al estado
      setFilterdTasks([task]) // Añadimos la tarea al estado
    }
  }

  const filterTasks = (subjectId: string) => {
    // Función que se encarga de filtrar las tareas por asignatura
    if (subjectId !== '') { // Si el id de la asignatura es 0, entonces mostramos todas las tareas
      setFilterdTasks(tasks.filter(task => task.subjectid === subjectId)) // Filtramos las tareas por asignatura

    } else {
      setFilterdTasks(tasks) // Si el id de la asignatura es '', entonces mostramos todas las tareas
    }

  }

  const markAsDone = (taskId: string) => { // Función que se encarga de marcar una tarea como completada
    const taskDone = tasks.find(task => task.id === taskId) // Buscamos la tarea en el array de tareas
    if (taskDone) {  // Si la tarea existe, entonces la añadimos al array de tareas completadas y la eliminamos del array de tareas pendientes
      setTasks(tasks.filter(task => task.id !== taskId)) // Eliminamos la tarea del array de tareas pendientes
      setFilterdTasks(tasks.filter(task => task.id !== taskId)) // Eliminamos la tarea del array de tareas pendientes filtradas
      if(donetasks && donetasks.length> 0){
        setDoneTasks([...donetasks, taskDone]) // Añadimos la tarea al array de tareas completadas
      // El  procedimiento es parecido para el metodo de rolback, solo que se hace al contrario
      // Había un problema con el markAsDone, ya que no se estaba eliminando la tarea del array de tareas pendientes
      // El problema era en el back, que devolvía un codigo 204, este codigo no devolvía nada de la api, 
      // Por lo que aqui en el front no se sabia si ya estaba marcada o no

      }else{
        setDoneTasks([taskDone])
      }
      

    }
  }

  const deleteTask = (taskId: string) => { // Función que se encarga de eliminar una tarea
    setTasks(tasks.filter(task => task.id !== taskId))
    setFilterdTasks(tasks.filter(task => task.id !== taskId))
  }

  const markAsRollBack = (taskId: string) => {
    const taskRollBack = donetasks.find(task => task.id === taskId)
    if (taskRollBack) {
      setDoneTasks(donetasks.filter(task => task.id !== taskId))
      if (tasks && tasks.length > 0){
        setTasks([...tasks, taskRollBack])
        setFilterdTasks([...tasks, taskRollBack])
      }else{
        setTasks([taskRollBack])
        setFilterdTasks([taskRollBack])
      }
      
    }
  }

  const navigate = useNavigate()
  useEffect(() => {

    if (getImageFromLocalStorage() === '') { // Si no hay imagen de usuario en el localStorage, redirigimos al usuario al login
      navigate('/')
    } else {
      document.title = 'Mercurial || Dashboard' // Si esta la imagen podemos cambiar el titulo del documento de la siguiente forma
      tasksMutation.mutate() // Hacemos la petición de las tareas del usuario
      doneTasksMutation.mutate() // Hacemos la petición de las tareas completadas del usuario
    }
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
        <Header />
        {
          alert && <Alert severity="error" onClose={() => setAlert(false)}>There was an error with the content loading</Alert>
        }
        <div className="dashboardMainContainer">
          <ToDo tasks={filteredTasks} handletaskCreation={handleTaskCreation} deleteTask={deleteTask} filterTasks={filterTasks} markAsDone={markAsDone} /> {/**Aquí importamos el componente to do
           y le pasamos por props todos los metodos necesarios para el funcionamiento*/}
          <Done tasks={donetasks} markAsRollBack={markAsRollBack} /> {/** Aquí importamos el compoenente Done y le pasamos las tareas completadas */}
        </div>

      </div>






    </div>
  )
}