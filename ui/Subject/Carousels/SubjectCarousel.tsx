'use client'
import { useState } from "react"
import {CircularProgress } from "@mui/material"
import { Subject } from "@/lib/types/entityTypes";
import useSWR from "swr";
import { GetSubjects } from "@/lib/RequestIntermediaries/SubjectInter";
import './carousel.css'
import { GenericError } from "@/lib/types/definitions";
import MercurialSnackbar from "../../Snackbars/MercurialSnackbar";


interface SubjectSliderProps{
  filterAssignments: (id:number) => void

}

export default function SubjectCarousel({filterAssignments}: SubjectSliderProps){
  const {data, error, isLoading} = useSWR<Subject[], GenericError>('subjects', ()=> GetSubjects())
  const [selected, setSelected] = useState<number>(0)
  const [alert, setAlert] = useState(error ? true : false)
  const handleClick = (id:number)=>{
    if(selected === id){
      setSelected(0)
      filterAssignments(0)
      return
    }
    setSelected(id) // Con setSelected se cambia el estado de selected, para que se renderize el componente con el color de fondo correspondiente
    filterAssignments(id) // Se llama a la función filterTasks que se encuentra en el componente padre, para filtrar las tareas por materia

  }
  if(isLoading){
    return (
      <div className="w-full h-12 flex px-3 relative top-6">
        <CircularProgress/>
      </div>
    )
  }
  return(
    <div className="w-full h-12 flex relative top-6 justify-center">

      {
        error && <MercurialSnackbar message={error.message} state={alert} type="error" closeMethod={setAlert}/>
      }
      
      <ul className="carousel flex w-[98%] scrollbar-hide">
      {
        data && data?.length > 0 ? (
          data.map((subject:Subject)=>{ // Con map se recorre el array de materias, y se renderiza cada materia según el componente subjectContainer
            const isSelected = selected === subject.id
            return(
              <li className="w-44 rounded-lg mx-3 flex-shrink-0 border border-neutral-500 shadow-sm" key={subject.id} style={isSelected ? { backgroundColor: '#f5075e' } : undefined}>
                <button className="w-full h-full flex items-center justify-center" onClick={() => handleClick(subject.id)}> {/** en este boton mas adelante colocaremos un evento para poder filtrar por la materia */}
                  <h1 className="w-40 truncate">{subject.title}</h1>
                </button>
              </li>
            )
          })
        ):
        (
          <div className="w-full flex justify-center items-center">
            <h2>Created subjects will appear here</h2>
          </div>
        )
      }
      </ul>
    </div>
    
  )
}