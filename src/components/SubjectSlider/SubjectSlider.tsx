import { Subject } from "../types/types"
import './subjectSlider.css'
interface SliderProps{
  subjects: Subject[]
}
export default function SubjectSlider(props:SliderProps){
  const {subjects} = props
  return(
    <div className="subjectsSlider">
      {
        subjects.map((subject:Subject)=>{ // Con map se recorre el array de materias, y se renderiza cada materia según el componente subjectContainer
          return(
            <div className="subjectContainer" key={subject.id}>
              <button className="buttonContainerSlider"> {/** en este boton mas adelante colocaremos un evento para poder filtrar por la materia */}
                <h1 className="subjectTitle">{subject.name}</h1>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}