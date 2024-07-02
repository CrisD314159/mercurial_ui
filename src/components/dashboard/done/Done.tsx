import { Task } from '../../types/types'
import './done.css'


interface DoneProps{
  tasks: Task[]
}
export default function Done(props:DoneProps) {
  const {tasks} = props
  return(
    <div className="doneContainer"> { /** El componente Done contendrá los botones para ir a las asignaturas y topics, y las tareas
    que están marcadas como completadas */}
      <div className="doneButtonContainer">
        {/* Aquí dentro irán los botones tal cual como están en el figma*/}
        
      </div>
      <div className="doneTasksContainer">
        {/** Aquí usando map, irán las tareas que llegan mediante las props */}
      </div>
    </div>
  )
}