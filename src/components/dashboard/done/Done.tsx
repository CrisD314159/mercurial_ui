import { useEffect, useState } from 'react'
import { Task, TaskDoneList } from '../../types/types'
import './done.css'
import { NavLink } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useMutation } from '@tanstack/react-query';
import { getDoneTasks } from '../../../utils/utils';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';



export default function Done() {
  const [doneTasks, setDoneTasks] = useState<Task[]>([])
  const [description, setDescription] = useState('')


  const tasksMutation = useMutation<TaskDoneList, Error>({ // Mutación que obtiene las tareas completadas del usuario
    mutationFn: getDoneTasks,
    onSuccess:(data:TaskDoneList)=>{
      setDoneTasks(data.tasks)
    }
  })

// mas adelante hacemos la funcionalidad de roll-back
 
  useEffect(()=>{
    function fetchData() {
      tasksMutation.mutate()
      
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
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
                doneTasks.map((task: Task) => {
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