import './todo.css'
import { useState } from "react"
import { DeleteTaskFields, GeneralResponse, MarkAsDoneFields, Task } from "../../types/types"
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import {  Alert, Fab, IconButton } from '@mui/material';
import { useMutation } from "@tanstack/react-query";
import { deleteTask, markAsDoneTask } from "../../../utils/utils";
import EditTask from '../../editForms/EditTask';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CalendarModal from '../../creation/CalendarModal';
interface TaskProps{
  tasks: Task[]
  deletetask: (taskId:string) => void
  markAsDone: (taskId:string) => void
}

export default function TaskContainer(props: TaskProps) {
  const token = useSelector((state: RootState) => state.auth.token) // Token del usuario
  const [id, setId]= useState('')
  const [alert, setAlert] = useState(false)

  const deleteTaskMutation = useMutation<GeneralResponse, Error, DeleteTaskFields>({
    mutationFn:deleteTask,
    onSuccess:()=>{
      props.deletetask(id)
    },
    onError:()=>{
     setAlert(true)
      
    }
  })

  const markDoneMutation = useMutation<GeneralResponse, Error, MarkAsDoneFields>({
    mutationFn: markAsDoneTask,
    onSuccess:()=>{
      props.markAsDone(id)
    },
    onError:()=>{
      setAlert(true)
    }
  })


  const handleMarkAsDone = (taskId:string) => {
    setId(taskId)
    if(token)markDoneMutation.mutate({taskId, token})
  }

  const handleDelete = (taskId:string) => {
    setId(taskId)
    if(token) deleteTaskMutation.mutate({taskId, token})
  }
  
  const [description, setDescription] = useState('') // Estado que indica si se muestra la descripción de la tarea
  return(
    <div className="tasksContainer">
        {
          alert && <Alert severity="error" onClose={() => setAlert(false)}>There was an error with the content loading</Alert>
        }
              {
                props.tasks.map((task:Task)=>{ // Con map se recorre el array de tareas, y se renderiza cada tarea según el componente taskContainer
                  return (
                    <div className='taskDescriptionContainer' key={task.id}> {/** Contenedor principal de cada tarea. En react, cuando usamos map
                    debemos colocar un atributo key en el elemento contenedor, esto para poder de que react lo renderize correctamente */}
                    <div className='taskContainer'>
                      <div className='iconContainer'>
                        {
                          description === task.id ?
                          <IconButton onClick={()=>{setDescription('')}}>
                            <ClearIcon/>
                          </IconButton> :

                        <IconButton onClick={()=>{setDescription(task.id)}}>
                          <BookmarkIcon/>
                        </IconButton>

                        }
                         {/** Este div contendrá el icono de la tarea */}
                      </div>
                      <div className='titleContainer'>
                        <h3 className='title'>{task.tittle}</h3> {/** Titulo de la tarea */}
                        <p className='subject'>{task.subjectname}</p> { /** Aquí luego pondremos el nombre de la materia, no su id */}
                      </div>
                      <div>
                        <p className='topic' style={{color:`${task.topiccolor}`}}>{task.topictittle}</p> { /** Aquí luego pondremos el nombre del topic, no su id */}
                      </div>
                      <div className='buttonContainer'>
                        <Fab size='small' className='doneButton button' color='success'
                        onClick={()=>{
                          handleMarkAsDone(task.id)
                        }}
                        > <DoneIcon/> </Fab> {/** Añadiremos un evento a este botón el cual permite marcar la 
                         * tarea como completada 
                         */}
                         <EditTask  description={task.description} subjectId={task.subjectid} title={task.tittle} taskId={task.id} topicId={task.topicid} subjectName={task.subjectname} topicName={task.topictittle}/>
                        <Fab size='small' color='secondary' className='deleteButton button' onClick={()=>{
                          handleDelete(task.id)
                        }}> <DeleteIcon/> </Fab> {/** Añadiremos un evento a este botón el cual permite eliminar la tarea  */}
                      </div>

                    </div>
                    {
                      description === task.id ? 
                      <div className='descriptionContainer'>
                      <p className='description'>{task.description}</p> {/** Descripción de la tarea */}
                      
                      <div className='calendar'>
                        <CalendarModal task={task}/>
                       
                      </div>


                    </div>:<></>
                    }
                    
                      
                  </div>
                  )
                })
              }

            </div>

  )
  
}