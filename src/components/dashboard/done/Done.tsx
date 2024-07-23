import {  useState } from 'react'
import { Task } from '../../types/types'
import './done.css'
import { NavLink } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface DoneProps {
  tasks: Task[]

}

export default function Done(props:DoneProps) {
  const [description, setDescription] = useState('')


  // Mas adelante hacemos la funcionalidad de roll-back
  
  const [trigger, setTrigger] = useState(false)
  return (
    <div className="doneContainer"> { /** El componente Done contendrá los botones para ir a las asignaturas y topics, y las tareas
    que están marcadas como completadas */}
   
      <div className="doneButtonContainer">
        {/* Aquí dentro irán los botones tal cual como están en el figma*/}
        <NavLink to='/dashboard/subjects' className="subjectButton">
          <button className='subjectButton'>Go to Subjects</button>
        </NavLink>
        <NavLink to="/dashboard/topics" className='topicButton'>
          <button className='topicButton'>Go to Topics</button>
        </NavLink>



      </div>
      <div className='mainMenuContainer'>
        <div className='mainTitleContainer'>
          <h1 className='doneTitle'>Done</h1>
        </div>
        <button className='hide_showButton' onClick={() => {
          setTrigger(!trigger)
        }}>Hide/Show</button>
      </div>

      {
        trigger ?
          <div className='mainTasksContainer'>
            <div className="doneTasksContainer">
              {/** Aquí usando map, irán las tareas que llegan mediante las props */}
              {
                props.tasks && props.tasks.length > 0 ?
                props.tasks.map((task: Task) => {
                  return (
                    <div className='taskDescriptionContainer'>
                      <div className='taskContainer' key={task.id}>
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
                      </div>
                      <div className='titleContainer'>
                        <h3 className='title'>{task.tittle}</h3>
                        <p className='subject'>{task.subjectname}</p>
                      </div>
                      <p className='state'>Done</p>
                      <p className='topicDone'>{task.topictittle}</p>
                      <button className='roll_backButton'>Roll-back</button>
                    </div>
                    {
                      description === task.id ? 
                      <div className='descriptionContainer'>
                      <p className='description'>{task.description}</p> {/** Descripción de la tarea */}
                    </div>:<></>
                    }

                    </div>
                    
                  )
                }):
                <div>
                  <p style={{textAlign:'center'}}>There are no done tasks</p>
                </div>
              }
            </div>

          </div>
          :
          <></>
      }


    </div>
  )
}