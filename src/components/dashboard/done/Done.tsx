import { useState } from 'react'
import { GeneralResponse, RollbackFields, Task } from '../../types/types'
import './done.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Alert, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useMutation } from '@tanstack/react-query';
import { markAsRollBackTask } from '../../../utils/utils';
import { useGuardianStore } from '../../../store/guardianStore';


interface DoneProps {
  tasks: Task[],
  markAsRollBack: (taskId: string) => void

}


export default function Done(props: DoneProps) {
  const token = localStorage.getItem('accessToken')
  const [description, setDescription] = useState('')
  const [id, setId] = useState('')
  const [alert, setAlert] = useState(false)
  const checkAuth = useGuardianStore(state=>state.checkAuthStatus)


  const errorFunc =(error:Error)=>{
    if(error.message === 'Unauthorized'){
      checkAuth()
    }else{
      setAlert(true)
    }
  }
  const rollback = useMutation<GeneralResponse, Error, RollbackFields>({
    mutationFn:markAsRollBackTask,
    onSuccess:()=>{
      props.markAsRollBack(id)
    },
    onError:errorFunc
  })
  const rollBackTask = (taskId: string) => {
    setId(taskId)
    if(token) rollback.mutate({taskId, token})

  }
  return (
    <div className="doneContainer"> { /** El componente Done contendrá los botones para ir a las asignaturas y topics, y las tareas
    que están marcadas como completadas */}
    {
          alert && <Alert severity="error" onClose={() => setAlert(false)}>There was an error with the content loading</Alert>
        }


      <div className='mainMenuContainer'>
        <div className='mainTitleContainer'>
          <h1 className='doneTitle'>Done</h1>
        </div>
      </div>

      <div className='mainTasksContainer'>
            <div className="doneTasksContainer">
              {/** Aquí usando map, irán las tareas que llegan mediante las props */}
              {
                props.tasks && props.tasks.length > 0 ?
                  props.tasks.map((task: Task) => {
                    return (
                      <div className='taskDescriptionContainer' key={task.id}>
                        <div className='taskContainer' key={task.id}>
                          <div className='iconContainer'>
                            {
                              description === task.id ?
                                <IconButton onClick={() => { setDescription('') }}>
                                  <ClearIcon />
                                </IconButton> :

                                <IconButton onClick={() => { setDescription(task.id) }}>
                                  <BookmarkIcon />
                                </IconButton>

                            }
                          </div>
                          <div className='titleContainer'>
                            <h3 className='title'>{task.tittle}</h3>
                            <p className='subject'>{task.subjectname}</p>
                          </div>
                          <p className='state'>Done</p>
                          <p className='topicDone' style={{color:`${task.topiccolor}`}}>{task.topictittle}</p>
                          <button onClick={() => rollBackTask(task.id)} className='roll_backButton'>Roll-back</button>
                        </div>
                        {
                          description === task.id ?
                            <div className='descriptionContainer'>
                              <p className='description'>{task.description}</p> {/** Descripción de la tarea */}
                            </div> : <></>
                        }

                      </div>

                    )
                  }) :
                  <div>
                    <p style={{ textAlign: 'center' }}>There are no done tasks</p>
                  </div>
              }
            </div>

          </div>


    </div>
  )
}