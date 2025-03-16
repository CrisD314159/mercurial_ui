import { useMutation } from "@tanstack/react-query"
import { Task, TaskDoneList, TaskList } from "../lib/types/types"
import { getDoneTasks, getTasks } from "../lib/utils"
import { useCallback, useEffect, useState } from "react"
import { useGuardianStore } from "../store/guardianStore"


// Hook que se encarga de manejar las tareas del usuario entre los compoenentes del dashboard
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario
  const [filteredTasks, setFilterdTasks] = useState<Task[]>(tasks) // Estado que contendrá las tareas del usuario esto lo hacemos para poder filtrar sin necesidad de hacer otra petición
  const [donetasks, setDoneTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página
  const token = localStorage.getItem('accessToken') // Obtenemos el token del localStorage
  const checkAuth = useGuardianStore(state=> state.checkAuthStatus)
  
  const tasksMutation = useMutation<TaskList, Error, string>({
    mutationFn: getTasks,
    onSuccess: (data: TaskList) => {
      setTasks(data.tasksUser) // Si hay tareas, entonces seteamos las tareas en el estado tasks
      setFilterdTasks(data.tasksUser) // Si hay tareas, entonces seteamos las tareas en el estado tasksContainer    
    },
    onError: (error: Error) => {
      if (error.message === 'Unauthorized') { // Si el error es Unauthorized, entonces cerramos la sesión del usuario y lo redirigimos al login
       //usar zustant para refrescar el token
      } else {
        setAlert(true) // Si es otro error diferente, entonces mostramos una alerta de error
      }

    },
  })

  const doneTasksMutation = useMutation<TaskDoneList, Error, string>({ // Mutación que obtiene las tareas completadas del usuario
    mutationFn: getDoneTasks, // Función que se encarga de hacer la petición
    onSuccess: (data: TaskDoneList) => {
      setDoneTasks(data.tasks) // Si hay tareas completadas, entonces seteamos las tareas en el estado donetasks
    },
    onError: (error: Error) => {
      if (error.message === 'Unauthorized') { // Si el error es Unauthorized, entonces cerramos la sesión del usuario y lo redirigimos al login
       //usar zustant para refrescar el token
      } else {
        setAlert(true) // Si es otro error diferente, entonces mostramos una alerta de error
      }

    }
  })

  
  useEffect(() => {
    document.title = 'Mercurial || Dashboard' // Si esta la imagen podemos cambiar el titulo del documento de la siguiente forma
    if (token) {
      tasksMutation.mutate(token) // Hacemos la petición de las tareas del usuario
      doneTasksMutation.mutate(token) // Hacemos la petición de las tareas completadas del usuario
    }else{
      checkAuth()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTaskCreation = (task: Task) => { // Función que se encarga de añadir una tarea a la lista de tareas
    if(tasks && tasks.length> 0){
      setTasks([...tasks, task]) // Añadimos la tarea al estado
      setFilterdTasks([...tasks, task]) // Añadimos la tarea al estado

    }else{
      setTasks([task]) // Añadimos la tarea al estado
      setFilterdTasks([task]) // Añadimos la tarea al estado
    }
  }

  const filterTasks = useCallback((subjectId: string) => {
    // Función que se encarga de filtrar las tareas por asignatura
    if (subjectId !== '') { // Si el id de la asignatura es 0, entonces mostramos todas las tareas
      setFilterdTasks(tasks.filter(task => task.subjectid === subjectId)) // Filtramos las tareas por asignatura

    } else {
      setFilterdTasks(tasks) // Si el id de la asignatura es '', entonces mostramos todas las tareas
    }

  },[tasks, setFilterdTasks])

  const markAsDone = useCallback((taskId: string) => { // Función que se encarga de marcar una tarea como completada
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
  },[tasks, donetasks, setTasks, setFilterdTasks, setDoneTasks])

  const deleteTask = (taskId: string) => { // Función que se encarga de eliminar una tarea
    setTasks(tasks.filter(task => task.id !== taskId))
    setFilterdTasks(tasks.filter(task => task.id !== taskId))
  }

  const markAsRollBack = useCallback((taskId: string) => {
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
  },[donetasks, tasks, setDoneTasks, setTasks, setFilterdTasks])

  return {
    tasks,
    filteredTasks,
    donetasks,
    alert,
    tasksMutation,
    doneTasksMutation,
    handleTaskCreation,
    filterTasks,
    markAsDone,
    deleteTask,
    markAsRollBack
  }


}

export default useTasks