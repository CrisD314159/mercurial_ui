'use client'

import { Assignment } from "@/app/lib/types/entityTypes"
import { IconButton } from "@mui/material";
import { useState } from "react";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AssignmentMoreDialog from "../Dialogs/AssignmentMoreDialog";
import AssignmentCompleteButton from "../Buttons/AssignmentCompleteButton";


interface AssignmentCardProps{
  assignment: Assignment
  mutate : () => void
}

export default function AssignmentCard({assignment, mutate}:AssignmentCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div className="w-[90%] flex flex-col transition-all ">
      <div className="w-full flex items-center justify-between dark:border dark:border-stone-700 h-[100px] rounded-lg relative">
      <div className="flex items-center">
        <IconButton onClick={handleExpansion}>
            {
              expanded ? 
              <ExpandLessIcon/>:
              <ExpandMoreRoundedIcon/>
            }
          </IconButton>
          <div>
            <h1 className="text-xl font-bold">{assignment.title}</h1>
            <h3 className="text-lg">{assignment.subjectTitle}</h3>
          </div>
      </div>

        <p className={`text-lg`} style={{color:`${assignment.topicColor}`}}>{assignment.topicTitle}</p>

        <AssignmentMoreDialog/>

        <AssignmentCompleteButton id={assignment.id ?? "0"} mutate={mutate} />
      </div>

      

        <div
          className={`transition-all duration-300 ease-in-out overflow-scroll p-3 shadow-lg rounded-lg transform
            ${expanded ? 'h-36 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}
          `}
        >
          <p>
            {assignment.noteContent === '' ? "This assignment does not have any note" : assignment.noteContent}
          </p>
        </div>
        
      


    </div>

  )
  
}