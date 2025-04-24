'use client'
import { useState } from "react"
import {CircularProgress, IconButton } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { Subject } from "@/app/lib/types/entityTypes";
import useSWR from "swr";
import { GetSubjects } from "@/app/lib/RequestIntermediaries/SubjectInter";
import './carousel.css'
import { GenericError } from "@/app/lib/types/definitions";
import MercurialSnackbar from "../Snackbars/MercurialSnackbar";


interface SubjectSliderProps{
  filterAssignments: (id:number) => void

}

export default function SubjectCarousel({filterAssignments}: SubjectSliderProps){
  const {data, error, isLoading} = useSWR<Subject[], GenericError>('subjects', ()=> GetSubjects())
  const [selected, setSelected] = useState<number>(0)
  const handleClick = (id:number)=>{
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
    <div className="w-full h-12 flex px-3 relative top-6 justify-center">
      {
        error && <MercurialSnackbar message={error.message} state={true} type="error"/>
      }

      {
      selected !== 0 && <IconButton size="small" color="secondary" onClick={()=> handleClick(0)}><ClearIcon/></IconButton>
      }
      
      <ul className="carousel flex w-full gap-16 px-6 scrollbar-hide justify-center">
      {
        data && data?.length > 0 ? (
          data.map((subject:Subject)=>{ // Con map se recorre el array de materias, y se renderiza cada materia según el componente subjectContainer
            const isSelected = selected === subject.id
            return(
              <li className="w-44 rounded-lg flex-shrink-0 dark:border border-zinc-200 dark:border-zinc-700 shadow-sm" key={subject.id} style={isSelected ? { backgroundColor: '#f5075e' } : undefined}>
                <button className="w-full h-full flex items-center justify-center" onClick={() => handleClick(subject.id)}> {/** en este boton mas adelante colocaremos un evento para poder filtrar por la materia */}
                  <h1 className="w-40 truncate">{subject.title}</h1>
                </button>
              </li>
            )
          })
        ):
        (
          <h2>Created subjects will appear here</h2>
        )
      }
      </ul>
    </div>
    
  )
}