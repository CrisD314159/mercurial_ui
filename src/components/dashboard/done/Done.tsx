import { useState } from 'react'
import { Task } from '../../types/types'
import './done.css'
import { NavLink } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark';


interface DoneProps {
  tasks: Task[]
}
export default function Done(props: DoneProps) {
  const { tasks } = props
  const [trigger, setTrigger] = useState(false)
  return (
    <div className="doneContainer"> { /** El componente Done contendrá los botones para ir a las asignaturas y topics, y las tareas
    que están marcadas como completadas */}
      <div className="doneButtonContainer">
        {/* Aquí dentro irán los botones tal cual como están en el figma*/}
        <NavLink to={''}>
          <button className='subjectButton'>Go to Subjects</button>
        </NavLink>
        <NavLink to={''}>
          <button className='topicButton'>Go to Topics</button>
        </NavLink>
        
       

      </div>
      <div className='mainMenuContainer'>
        <div className='mainTitleContainer'>
          <h1 className='doneTitle'>Done</h1>
        </div>
        <button className='hide_showButton' onClick={()=>{
          setTrigger(!trigger)
        }}>Hide/Show</button>
      </div>

      {
        trigger ? 
        <div className='mainTasksContainer'>
            <div className="doneTasksContainer">
        {/** Aquí usando map, irán las tareas que llegan mediante las props */}
        {
          tasks.map((tasks: Task) => {
            return (
              <div className='taskContainer' key={tasks.id}>
                <div className='iconContainer'>
                  <BookmarkIcon/>
                </div>
                <div className='titleContainer'>
                  <h3 className='title'>{tasks.title}</h3>
                  <p className='subject'>{tasks.subject_id}</p>
                </div>
                <p className='state'>Done</p>
                <p className='topicDone'>{tasks.topic_id}</p>
                <button className='roll_backButton'>Roll-back</button>
              </div>
            )
          })
        }
      </div>

        </div>
      :
      <></> 
      }
      
      
    </div>
  )
}