import { useState } from "react"
import { Subject } from "../types/types"
import './subjectSlider.css'
import {Fab } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
interface SliderProps{
  subjects: Subject[]
}
export default function SubjectSlider(props:SliderProps){
  const {subjects} = props
  const [selected, setSelected] = useState<number>(0)
  const handleClick = (id:number)=>{
    setSelected(id)

  }
  return(
    <div className="mainSliderContainer">
      {
      selected !== 0?<Fab size="small" color="secondary" onClick={()=> handleClick(0)}><ClearIcon/></Fab>:<></>
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