import { Task } from '../../types/types'
import './done.css'


interface DoneProps {
  tasks: Task[]
}
export default function Done(props: DoneProps) {
  const { tasks } = props
  return (
    <div className="doneContainer"> { /** El componente Done contendrá los botones para ir a las asignaturas y topics, y las tareas
    que están marcadas como completadas */}
      <div className="doneButtonContainer">
        {/* Aquí dentro irán los botones tal cual como están en el figma*/}
        <button className='subjectButton'>Go to Subjects</button>
        <button className='topicButton'>Go to Topics</button>

      </div>
      <div className='mainTitleContainer'><h1 className='doneTitle'>Done</h1>
        <button className='hide_showButton'>Hide/Show</button>
      </div>
      <div className="doneTasksContainer">
        {/** Aquí usando map, irán las tareas que llegan mediante las props */}
        {
          tasks.map((tasks: Task) => {
            return (
              <div className='taskContainer' key={tasks.id}>
                <div className='iconContainer'></div>
                <div className='titleContainer'>
                  <h3 className='title'>{tasks.title}</h3>
                  <p className='subject'>{tasks.subject_id}</p>
                </div>
                <p className='state'>{tasks.state}</p>
                <p className='topic'>{tasks.topic_id}</p>
                <button className='roll_backButton'>Roll-back</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}