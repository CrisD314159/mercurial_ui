import './todo.css'

import SubjectSlider from '../../SubjectSlider/SubjectSlider'
import { Subject, SubjectList, Task, TaskList, Topic, TopicList } from '../../types/types'

import TaskCreation from '../../creation/TaskCreation';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getSubjects, getTasks, getTopics, logout } from '../../../utils/utils';
import LoadingComponent from '../../loading/LoadingComponent';
import { useNavigate } from 'react-router-dom';

import TaskContainer from './TaskContainer';






export default function ToDo(){
  
  const navigate = useNavigate() // Hook de react-router-dom que permite navegar entre rutas
  const [tasks, setTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario
  const [filteredTasks, setFilterdTasks] = useState<Task[]>([]) // Estado que contendrá las tareas del usuario esto lo hacemos para poder filtrar sin necesidad de hacer otra petición
  const [subjects, setSubjects] = useState<Subject[]>([]) // Estado que contendrá las materias del usuario
  const [isLoading, setIsLoading] = useState(true) // Estado que indica si la página está cargando
  const [topics, setTopics] = useState<Topic[]>([]) // Estado que contendrá los topics del usuario
  const [empty, setEmpty] = useState(false) // Estado que indica si el usuario no tiene tareas pendientes

  const tasksMutation = useMutation<TaskList, Error>({
    mutationFn: getTasks,
    onSuccess:(data:TaskList)=>{
      if(data.success === false){ // Si la respuesta de la API es que no hay tareas, entonces seteamos el estado empty a true
        setEmpty(true)

      }else{
        setTasks(data.tasksUser) // Si hay tareas, entonces seteamos las tareas en el estado tasks
        setFilterdTasks(data.tasksUser) // Seteamos las tareas en el estado filteredTasks
      }
      
    },
    onError:()=>{ // Si hay un error en la petición, entonces cerramos la sesión del usuario y lo redirigimos al login
      logout() // Función que cierra la sesión del usuario
      localStorage.clear() // Limpiamos el localStorage
      navigate('/') // Redirigimos al usuario al login

    }
  })

  const subjectsMutation = useMutation<SubjectList, Error>({
    mutationFn: getSubjects,
    onSuccess:(data:SubjectList)=>{
      console.log(data.subjects);
      setSubjects(data.subjects)
    },
    onError:()=>{
      console.log('error');
      
    }
  })

  const topicsMutation = useMutation<TopicList, Error>({
    mutationFn: getTopics,
    onSuccess:(data:TopicList)=>{
      setTopics(data.topic)
    }
  })

  const handleTaskCreation = (task:Task)=>{ // Función que se encarga de añadir una tarea a la lista de tareas
    console.log(task);
    setTasks([...tasks, task]) // Añadimos la tarea al estado
    setFilterdTasks([...filteredTasks, task]) // Añadimos la tarea al estado
  }

  const filterTasks = (subjectId:string)=>{ 
    // Función que se encarga de filtrar las tareas por asignatura
    if(subjectId !== ''){ // Si el id de la asignatura es 0, entonces mostramos todas las tareas
      setFilterdTasks(tasks.filter(task => task.subjectid === subjectId)) // Filtramos las tareas por asignatura
      
    }else{
      setFilterdTasks(tasks) // Si el id de la asignatura es '', entonces mostramos todas las tareas
    }

  }
 
  

  useEffect(()=>{ // Hook de react que se ejecuta cuando el componente se monta
    // Necesitamos hacer las peticiones usando useEffect, ya que no podemos hacer peticiones en el cuerpo del componente
    function fetchData() { // Función que se encarga de hacer las peticiones a la API
      subjectsMutation.mutate(),
      topicsMutation.mutate(),
      tasksMutation.mutate()
      setIsLoading(false)
      
    }
    fetchData() // Llamamos a la función fetchData
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) // Importante: debemos pasar un array vacío como segundo argumento para que useEffect se ejecute solo una vez 
 

  if(isLoading){ // Si la página está cargando, entonces mostramos el componente LoadingComponent
    return <LoadingComponent/>
  }
  if(empty){ // Si el usuario no tiene tareas pendientes, entonces mostramos un mensaje
    return(
      <div>
      
      
      <div className="todoContainer">
         {/* Contenedor de las materias del usuario */}
         <div className="subjectsSlider">
            { subjects && subjects.length > 0 && (
              <SubjectSlider subjects={subjects} filterTasks= {filterTasks}/>
            )}
          </div>
          <div className="createMenu">
            {subjects && subjects.length > 0 && topics && topics.length > 0 && (
              <TaskCreation subjects={subjects} topics={topics} handleTaskCreation={handleTaskCreation} />
            )}
            <div className='mainTittleContainer'>
              <h1 className='todoTittle'>To-Do</h1>
            </div>
          </div>


          {/* Contenedor de las tareas del usuario o la materia seleccionada */}
          <div className='mainTasksContainer'>
            <div className="tasksContainer">
             <p>There are not pending tasks right now</p>

            </div>

          </div>
        
      </div>
      
      
         
    </div>
    );
}


  return(
    <div>
      
      
      <div className="todoContainer">
         {/* Contenedor de las materias del usuario */}
         <div className="subjectsSlider">
          { subjects.length > 0 && (
            <SubjectSlider subjects={subjects} filterTasks={filterTasks}/>

          )}
             {/* Aquí se renderiza el componente SubjectSlider, el cual recibe las materias del usuario 
            Luego recibiremos las meterias mediante la api, ademas que envieremos un metodo para poder filtrar las tareas por asignatura*/}
          </div>

         
          <div className="createMenu">  {/* Contenedor de la barra de creación de tareas */}
             {/* Contenedor de la barra de creación de tareas */}
          {subjects.length > 0 && topics.length > 0 && (
            <TaskCreation subjects={subjects} topics={topics} handleTaskCreation={handleTaskCreation}/>
          )}{/** Aquí se renderiza el componente TaskCreation, el cual recibe los topics del usuario */}
             {/** Este boton le añadiremos un evento el cual muestra el menu de creación */}
            <div className='mainTittleContainer'>
              <h1 className='todoTittle'>To-Do</h1>
            </div>
          </div>


          {/* Contenedor de las tareas del usuario o la materia seleccionada */}
          <div className='mainTasksContainer'>
            {
              // Decidi hacer un componente TaskContainer para poder renderizar las tareas de una forma más ordenada
              // ya que se abulta mucho el componente ToDo
              tasks && tasks.length > 0 && (
                <TaskContainer tasks={filteredTasks}/>
              )
            }
            

          </div>
        
      </div>
      
      
         
    </div>
  )
}