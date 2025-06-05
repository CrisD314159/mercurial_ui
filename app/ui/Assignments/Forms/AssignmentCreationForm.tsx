'use client'
import useSWR from "swr";
import { GetSubjects } from "@/app/lib/RequestIntermediaries/SubjectInter";
import { GetTopics } from "@/app/lib/RequestIntermediaries/TopicInter";
import { Subject, Topic } from "@/app/lib/types/entityTypes";
import { GenericError } from "@/app/lib/types/definitions";
import { Button, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {startTransition, useActionState, useState } from "react";
import { CreateAssignment } from "@/app/lib/RequestIntermediaries/AssignmentInter";
import MercurialSnackbar from "../../Snackbars/MercurialSnackbar";
import SelectMenu from "../../Creation/SelectMenu";
import { useMercurialStore } from "@/app/store/useMercurialStore";


interface AssignmentCreationForm{
  handleClose : ()=> void
  mutate: () => void
}

export default function AssignmentCreationForm({mutate, handleClose}: AssignmentCreationForm) {
  const {data:subjects, error:subjectError, isLoading:isLoadingSubjects } = useSWR<Subject[], GenericError>('subjects', ()=> GetSubjects())
  const {data:topics, error:topicError, isLoading:isLoadingTopics } = useSWR<Topic[], GenericError>('topics', ()=> GetTopics())
  const [subjectSelected, setSubjectSelected] = useState(0)
  const [topicSelected, setTopicSelected] = useState(0)
  const [state, action, pending] = useActionState(CreateAssignment, undefined)
  const {isAuthenticated} = useMercurialStore()
  const handleSubjectSelection = (event: SelectChangeEvent) =>{
      setSubjectSelected(Number.parseInt(event.target.value))
  }
  const handleTopicSelection = (event: SelectChangeEvent) =>{
     setTopicSelected(Number.parseInt(event.target.value))
  }


  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formdata = new FormData(event.currentTarget)

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
    <form className="w-full h-full flex flex-col items-center gap-7 relative" onSubmit={handleCreate} >
      {
        subjectError && <MercurialSnackbar message={subjectError.message} state={true} type="error"/>
      }
      {
        topicError && <MercurialSnackbar message={topicError.message} state={true} type="error"/>
      }
      {
        state?.errors && <MercurialSnackbar message={state.errors} state={true} type="error"/>
      }
      <div className="w-full flex flex-col items-center">
        <Typography variant="h5" sx={{marginBottom:'7px'}}>
          Put a title to your assignment
        </Typography>
        <TextField label={"Title"} name="title" required sx={{width:'80%'}} />
      </div>
      <div className="flex w-full justify-center items-center flex-wrap">
        <SelectMenu options={subjects} disabled={isLoadingSubjects} option={subjectSelected} title="Subjects" handleSelect={handleSubjectSelection}/>
        <SelectMenu options={topics} option={topicSelected} disabled={isLoadingTopics} title="Topics" handleSelect={handleTopicSelection}/>
      </div>
      <div className="flex w-full justify-center items-center flex-wrap">
        <TextField type="datetime-local"  name="dueDate" required sx={{width:'80%'}} />
      </div>
      <div className="w-full flex flex-col items-center">
      <Typography variant="h5" sx={{marginBottom:'7px'}}>
          Add a note if you want
        </Typography>
        <TextField multiline maxRows={7} label="Add a note" name="noteContent" sx={{width:'80%', height:'250px'}} />
      </div>

        <div className="absolute bottom-5">
          <Button variant="contained" color="secondary" disabled={pending} type="submit">Create Assignment</Button>
        </div>
    </form>
  )


}