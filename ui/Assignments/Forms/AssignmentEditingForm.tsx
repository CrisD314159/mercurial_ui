'use client'
import { GetSubjects } from "@/lib/RequestIntermediaries/SubjectInter";
import { GetTopics } from "@/lib/RequestIntermediaries/TopicInter";
import { Assignment } from "@/lib/types/entityTypes";
import { Button, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {startTransition, useActionState, useEffect, useState } from "react";
import { UpdateAssignment } from "@/lib/RequestIntermediaries/AssignmentInter";
import MercurialSnackbar from "../../Snackbars/MercurialSnackbar";
import SelectMenu from "../../Creation/SelectMenu";
import { useMercurialStore } from "@/store/useMercurialStore";

interface AssignmentEditingFormProps{
  handleClose : ()=> void
  mutate: () => void
  assignment?: Assignment
}


export default function AssignmentEditingForm({assignment, handleClose, mutate}:AssignmentEditingFormProps) {
  const [subjectSelected, setSubjectSelected] = useState(assignment?.subjectId ?? 0)
  const [topicSelected, setTopicSelected] = useState(assignment?.topicId ?? 0)
  const [state, action, pending] = useActionState(UpdateAssignment, undefined)
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const {isAuthenticated} =  useMercurialStore()

  useEffect(()=>{
    if (state && !state.success) {
      setAlertText(typeof state.message === "string" ? state.message : JSON.stringify(state.message))
    setAlert(true)
    }
  }, [state])


  const handleSubjectSelection = (event: SelectChangeEvent) =>{
      setSubjectSelected(Number.parseInt(event.target.value))
  }
  const handleTopicSelection = (event: SelectChangeEvent) =>{
     setTopicSelected(Number.parseInt(event.target.value))
  }

  function toLocalDateTimeInputValue(date: Date) {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  }


  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formdata = new FormData(event.currentTarget)

    formdata.append('id', assignment?.id ?? "")
    formdata.append('subjectId', subjectSelected.toString())
    formdata.append('topicId', topicSelected.toString())
    formdata.append('auth', isAuthenticated ? 'true' : 'false')

    startTransition(()=>{
      action(formdata)
    })
    mutate()
    handleClose()

  };
  
  return (
    <form className="w-full h-full flex flex-col items-center gap-7 relative" onSubmit={handleUpdate} >
      <MercurialSnackbar message={alertText} state={alert} type="error" closeMethod={setAlert}/>
      <div className="w-full flex flex-col items-center">
        <TextField label={"Title"} name="title" defaultValue={assignment?.title ?? ""} required sx={{width:'80%'}} />
      </div>
      <div className="flex w-full justify-center items-center flex-wrap">
        <SelectMenu FetchMethod={GetSubjects} fetchKey="subjects" option={subjectSelected} title="Subjects" handleSelect={handleSubjectSelection}/>
        <SelectMenu FetchMethod={GetTopics} fetchKey="topics" option={topicSelected} title="Topics" handleSelect={handleTopicSelection}/>
      </div>
      <div className="flex flex-col w-full justify-center items-center flex-wrap">
        <Typography variant="h6" sx={{marginBottom:'7px'}}>
          Assignment Due date
        </Typography>
        <TextField
          type="datetime-local"
          defaultValue={
            assignment?.dueDate
              ? toLocalDateTimeInputValue(new Date(assignment.dueDate))
              : toLocalDateTimeInputValue(new Date())
          }
          name="dueDate"
          required
          sx={{ width: '80%' }}
        />
      </div>
      <div className="w-full flex flex-col items-center">
      <Typography variant="h5" sx={{marginBottom:'7px'}}>
          Add a note if you want
        </Typography>
        <TextField multiline maxRows={7} label="Add a note" defaultValue={assignment?.noteContent ?? ""} name="noteContent" sx={{width:'80%', height:'250px'}} />
      </div>

        <div className="absolute bottom-5">
          <Button variant="contained" color="secondary" disabled={pending} type="submit">Update Assignment</Button>
        </div>
    </form>
  )

  
}