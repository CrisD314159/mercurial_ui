import { useState } from "react"
import { Subject } from "../types/types"
import './subjectSlider.css'
import {Fab } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';


interface SubjectSliderProps{
  subjects: Subject[],
  filterTasks: (id:string) => void

}

export default function SubjectSlider(props: SubjectSliderProps){
  const [subjects] = useState<Subject[]>(props.subjects)
  const [selected, setSelected] = useState<string>('')
  const handleClick = (id:string)=>{
    setSelected(id) // Con setSelected se cambia el estado de selected, para que se renderize el componente con el color de fondo correspondiente
    props.filterTasks(id) // Se llama a la función filterTasks que se encuentra en el componente padre, para filtrar las tareas por materia

  }
  return(
    <div className="mainSliderContainer">
      {
      selected !== ''?<Fab size="small" color="secondary" onClick={()=> handleClick('')}><ClearIcon/></Fab>:<></>
    }
      
      <div className="subjectsSlider">
      {
        subjects.map((subject:Subject)=>{ // Con map se recorre el array de materias, y se renderiza cada materia según el componente subjectContainer
          const isSelected = selected === subject.id
          return(
            <div className="subjectContainer" key={subject.id} style={isSelected? {backgroundColor: '#e0e0e0'}: {backgroundColor:'black'}}>
              <button className="buttonContainerSlider" onClick={() => handleClick(subject.id)}> {/** en este boton mas adelante colocaremos un evento para poder filtrar por la materia */}
                <h1 style={isSelected? {color:'black'}: {color:'#e0e0e0'}} className="subjectTitle">{subject.name}</h1>
              </button>
              
            </div>
          )
        })
      }
    </div>
    
    

    </div>
    
  )
}