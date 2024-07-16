import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Subject, Topic } from "../types/types";
import SelectMenu from "./SelectMenu";

interface TaskCreationProps {
  subjects: Subject[],
  topics: Topic[]
}


export default function TaskCreation(props: TaskCreationProps) {
  const [open, setOpen] = useState(false);
  // Estos dos son los valores de los select
  const [subject, setSubject] = useState<string>(props.subjects[0].name)
  const [topic, setTopic] = useState<string>(props.topics[0].title)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  // La lista de las materias y el de los temas se convierten en un array de strings
  const [subjects] = useState<string[]>(props.subjects.map((subject: Subject) => subject.name))
  const [topics] = useState<string[]>(props.topics.map((topic: Topic) => topic.title))

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSelectSubject = (event: SelectChangeEvent) => {
    setSubject(event.target.value);
  }
  const handleSelectTopic = (event: SelectChangeEvent) => {
    setTopic(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    console.log({
      title, subject, topic, description
    });
    resetValues()
    handleClose()
  };
  const resetValues = () => {
    setTitle('')
    setDescription('')
    setSubject(props.subjects[0].name)
    setTopic(props.topics[0].title)
  }
  return (
    <div>
      <Fab size="small" onClick={handleClickOpen}><AddIcon /></Fab>
      <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)'  }} aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
          <div style={{border:'1px solid #666', borderRadius:'6px', overflow:'hidden'}}>
            <DialogTitle sx={{ backgroundColor: '#0F0F0F', padding: '20px'  }} id="alert-dialog-title">
            <TextField placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard" required size="medium"></TextField>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#0F0F0F', height: '300px' }} id="alert-dialog-description" >
            <form action="">
              <div style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ margin: '30px' }}>
                  <SelectMenu handleSelect={handleSelectSubject} option={subject} options={subjects} title="Subjects" />
                  <SelectMenu handleSelect={handleSelectTopic} option={topic} options={topics} title="Topics" />
                </div>
                <TextField sx={{ m: 1, width: '100%' }} value={description} onChange={(e) => setDescription(e.target.value)} label='Description' type='text' variant='outlined' multiline maxRows={4} />

              </div>




            </form>


          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#0F0F0F', display: 'flex', justifyContent: 'space-around', paddingBottom: '50px' }}>
            <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
            <Button onClick={handleCreate} variant="outlined" color="success">Create</Button>

          </DialogActions>
          </div>

      </Dialog>


    </div>
  )


}