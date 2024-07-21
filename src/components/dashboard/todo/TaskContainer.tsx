import { useState } from "react"
import { Task } from "../../types/types"
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
import {  Fab, IconButton } from '@mui/material';
interface TaskProps{
  tasks: Task[]
}

export default function TaskContainer(props: TaskProps) {
  
  const [description, setDescription] = useState('') // Estado que indica si se muestra la descripción de la tarea
  return(
    <div className="tasksContainer">
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
                        <p className='topic'>{task.topictittle}</p> { /** Aquí luego pondremos el nombre del topic, no su id */}
                      </div>
                      <div className='buttonContainer'>
                        <Fab size='small' className='doneButton button'> <DoneIcon/> </Fab> {/** Añadiremos un evento a este botón el cual permite marcar la 
                         * tarea como completada 
                         */}
                        <Fab size='small' color='error' className='deleteButton button'> <DeleteIcon/> </Fab> {/** Añadiremos un evento a este botón el cual permite eliminar la tarea  */}
                      </div>

                    </div>
                    {
                      description === task.id ? 
                      <div className='descriptionContainer'>
                      <p className='description'>{task.description}</p> {/** Descripción de la tarea */}
                    </div>:<></>
                    }
                    
                      
                  </div>
                  )
                })
              }

            </div>

  )
  
}