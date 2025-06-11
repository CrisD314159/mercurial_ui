'use client'

import { Assignment } from "@/lib/types/entityTypes"
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AssignmentCompleteButton from "../Buttons/AssignmentCompleteButton";
import AssignmentSettingsDialog from "../Dialogs/AssignmentSettingsDialog";


interface AssignmentCardProps{
  assignment: Assignment
  doneCard:boolean;
  mutate : () => void
}

export default function AssignmentCard({assignment, mutate, doneCard}:AssignmentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [expired, setExpired] = useState(false);


  
  useEffect(()=>{
    function toLocalDateTimeInputValue(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return new Date(`${year}-${month}-${day}T${hours}:${minutes}`)
  }
    const calculateExpired = () =>{
      const date = toLocalDateTimeInputValue(new Date(assignment.dueDate ?? Date.now()))
      return date.getTime() < Date.now()
    }

    calculateExpired() ? setExpired(true) : setExpired(false)

  },[assignment.dueDate])

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div className={`w-[90%] flex flex-col transition-all `}>
      <div className={`w-full flex items-center justify-between border ${expired ? 'shadow-lg shadow-red-700' : ''} border-neutral-500  h-[100px] rounded-lg relative`}>
      <div className="flex items-center w-[55%]">
        <IconButton onClick={handleExpansion}>
            {
              expanded ? 
              <ExpandLessIcon/>:
              <ExpandMoreRoundedIcon/>
            }
          </IconButton>
          <div className="w-full h-full">
            <h1 className="text-base font-bold w-[95%] md:text-xl truncate">{assignment.title}</h1>
            <h3 className="text-base truncate w-[95%] md:text-lg">{assignment.subjectTitle}</h3>
          </div>
      </div>

      <div className="w-[20%] flex flex-col md:flex-row md:right-[20%] items-center justify-center absolute right-[15%] gap-5">
        <p className={`text-base md:text-lg w-[98%] text-center truncate`} style={{color:`${assignment.topicColor}`}}>{assignment.topicTitle}</p>

        <AssignmentSettingsDialog assignment={assignment} mutate={mutate}/>
      </div>

        {
          !doneCard &&
          <AssignmentCompleteButton id={assignment.id ?? "0"} mutate={mutate} />
        }
      </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-scroll p-3 shadow-lg rounded-lg transform
            ${expanded ? 'h-36 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}
          `}
        >
          <p className="whitespace-pre-line">
            {assignment.noteContent === '' ? "This assignment does not have any note" : assignment.noteContent}
          </p>
        </div>
    </div>

  )
}