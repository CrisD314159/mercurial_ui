import './todo.css'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SubjectSlider from '../../SubjectSlider/SubjectSlider'
import { Subject, Task, Topic } from '../../types/types'
import {  Fab } from '@mui/material';
import TaskCreation from '../../creation/TaskCreation';



interface ToDoProps{
  subjects: Subject[],
  tasks: Task[],
  topics: Topic[],
  createTask: ()=> void
}


export default function ToDo(props: ToDoProps){
  const {subjects, tasks, topics} = props
  return(
    <div className="todoContainer">
          {/* Contenedor de las materias del usuario */}
          <div className="subjectsSlider">
            <SubjectSlider subjects={subjects}/> {/* Aquí se renderiza el componente SubjectSlider, el cual recibe las materias del usuario 
            Luego recibiremos las meterias mediante la api, ademas que envieremos un metodo para poder filtrar las tareas por asignatura*/}
          </div>

         
          <div className="createMenu">  {/* Contenedor de la barra de creación de tareas */}
            <TaskCreation subjects={subjects} topics={topics}/>
             {/** Este boton le añadiremos un evento el cual muestra el menu de creación */}
            <div className='mainTittleContainer'>
              <h1 className='todoTittle'>To-Do</h1>
            </div>
          </div>


          {/* Contenedor de las tareas del usuario o la materia seleccionada */}
          <div className='mainTasksContainer'>
            <div className="tasksContainer">
              {
                tasks.map((task:Task)=>{ // Con map se recorre el array de tareas, y se renderiza cada tarea según el componente taskContainer
                  return (
                    <div className='taskContainer' key={task.id}> {/** Contenedor principal de cada tarea. En react, cuando usamos map
                    debemos colocar un atributo key en el elemento contenedor, esto para poder de que react lo renderize correctamente */}
                      <div className='iconContainer'>
                        <BookmarkIcon/> {/** Este div contendrá el icono de la tarea */}
                      </div>
                      <div className='titleContainer'>
                        <h3 className='title'>{task.title}</h3> {/** Titulo de la tarea */}
                        <p className='subject'>{task.subject_id}</p> { /** Aquí luego pondremos el nombre de la materia, no su id */}
                      </div>
                      <p className='topic'>{task.topic_id}</p> { /** Aquí luego pondremos el nombre del topic, no su id */}
                      <div className='buttonContainer'>
                        <Fab size='small' className='doneButton button'> <DoneIcon/> </Fab> {/** Añadiremos un evento a este botón el cual permite marcar la 
                         * tarea como completada 
                         */}
                        <Fab size='small' color='error' className='deleteButton button'> <DeleteIcon/> </Fab> {/** Añadiremos un evento a este botón el cual permite eliminar la tarea  */}
                      </div>
                  </div>
                  )
                })
              }

            </div>

          </div>
        
    </div>
  )
}