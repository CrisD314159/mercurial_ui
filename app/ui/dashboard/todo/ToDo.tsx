import './todo.css'
import SubjectSlider from '../../Subject/Carousels/SubjectCarousel'
import { SubjectList, Task, TopicList } from '../../../lib/types/types'
import TaskCreation from '../../Creation/TaskCreation';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getTopics, getSubjects } from '@/app/lib/utils';
import LoadingComponent from '../../Loading/LoadingComponent';
import TaskContainer from './TaskContainer';
import { Alert } from '@mui/material';
import { useGuardianStore } from '../../../store/useMercurialStore';
import useSubjects from '@/app/hooks/useSubjects';
import useTopics from '@/app/hooks/useTopics';

interface TodoProps {
  tasks: Task[],
  handletaskCreation: (task: Task) => void,
  filterTasks: (subjectId: string) => void,
  markAsDone: (taskId: string) => void,
  deleteTask: (taskId: string) => void,
}

export default function ToDo(props: TodoProps) {
  const {subjects} = useSubjects()
  const {topics} = useTopics()
  const token = localStorage.getItem('accessToken')  // Obtenemos el token del usuario
  //const [subjects, setSubjects] = useState<Subject[]>([]) // Estado que contendrá las materias del usuario {deprecated}
  const [isLoading, setIsLoading] = useState(true) // Estado que indica si la página está cargando
  //const [topics, setTopics] = useState<Topic[]>([]) // Estado que contendrá los topics del usuario {deprecated}
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página
  const checkAuth = useGuardianStore(state=>state.checkAuthStatus)
  
  const errorFunc =(error:Error)=>{
    if (error.message === 'Unauthorized') {
      checkAuth()
    }

  }
  const subjectsMutation = useMutation<SubjectList, Error, string>({
    mutationFn: getSubjects,
    onError: errorFunc
  })

  const topicsMutation = useMutation<TopicList, Error, string>({
    mutationFn: getTopics,
    onError: errorFunc
  })



  const handleTaskCreation = (task: Task) => { // Función que se encarga de añadir una tarea a la lista de tareas
    props.handletaskCreation(task)
  }

  const filterTasks = (subjectId: string) => {
    // Función que se encarga de filtrar las tareas por asignatura
    props.filterTasks(subjectId)

  }
  const markAsDone = (taskId: string) => { // Función que se encarga de marcar una tarea como completada
    props.markAsDone(taskId)
  }

  const deleteTask = (taskId: string) => { // Función que se encarga de eliminar una tarea
    props.deleteTask(taskId)
  }



  useEffect(() => { // Hook de react que se ejecuta cuando el componente se monta
    // Necesitamos hacer las peticiones usando useEffect, ya que no podemos hacer peticiones en el cuerpo del componente
    function fetchData() { // Función que se encarga de hacer las peticiones a la API
      if(token) {
        subjectsMutation.mutate(token),
        topicsMutation.mutate(token),
        setIsLoading(false)
      }
    }
    fetchData() // Llamamos a la función fetchData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Importante: debemos pasar un array vacío como segundo argumento para que useEffect se ejecute solo una vez 


  if (isLoading) { // Si la página está cargando, entonces mostramos el componente LoadingComponent
    return <LoadingComponent />
  }


  return (
    <div className='mainToDoContainer'>
      {
        alert && (
          <Alert severity="error" onClose={() => { setAlert(false) }}>There was an error with the content</Alert>
        )
      }

      <div className="todoContainer">
        {/* Contenedor de las materias del usuario */}
        <div className="subjectsSlider">
          {subjects && subjects.length > 0 && (
            <SubjectSlider subjects={subjects} filterTasks={filterTasks} />
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
          {
            // Decidi hacer un componente TaskContainer para poder renderizar las tareas de una forma más ordenada
            // ya que se abulta mucho el componente ToDo
            props.tasks && props.tasks.length > 0 ? (
              <TaskContainer tasks={props.tasks} deletetask={deleteTask} markAsDone={markAsDone} />
            ) :
              <div className='tasksContainer'>
                <p>There are not pending tasks right now</p>
              </div>

          }


        </div>

      </div>

    </div>
  )
}