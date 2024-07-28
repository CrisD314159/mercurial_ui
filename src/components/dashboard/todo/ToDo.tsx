import './todo.css'
import SubjectSlider from '../../SubjectSlider/SubjectSlider'
import { Subject, SubjectList, Task, Topic, TopicList } from '../../types/types'
import TaskCreation from '../../creation/TaskCreation';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getSubjects, getTopics, logout } from '../../../utils/utils';
import LoadingComponent from '../../loading/LoadingComponent';
import TaskContainer from './TaskContainer';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';



interface TodoProps {
  tasks: Task[],
  handletaskCreation: (task: Task) => void,
  filterTasks: (subjectId: string) => void,
  markAsDone: (taskId: string) => void,
  deleteTask: (taskId: string) => void,


}



export default function ToDo(props: TodoProps) {
  const token = useSelector((state: RootState) => state.auth.token) // Token del usuario
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState<Subject[]>([]) // Estado que contendrá las materias del usuario
  const [isLoading, setIsLoading] = useState(true) // Estado que indica si la página está cargando
  const [topics, setTopics] = useState<Topic[]>([]) // Estado que contendrá los topics del usuario
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página



  const subjectsMutation = useMutation<SubjectList, Error, string>({
    mutationFn: getSubjects,
    onSuccess: (data: SubjectList) => {
      setSubjects(data.subjects)
    },
    onError: (error: Error) => {
      if (error.message === 'Unauthorized') {
        logout()
        localStorage.clear()
        navigate('/')

      } else {
        setAlert(true)
      }


    }
  })

  const topicsMutation = useMutation<TopicList, Error, string>({
    mutationFn: getTopics,
    onSuccess: (data: TopicList) => {
      setTopics(data.topic)
    },
    onError: (error: Error) => {
      if (error.message === 'Unauthorized') {
        logout()
        localStorage.clear()
        navigate('/')
      }
    }
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
    <div>
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