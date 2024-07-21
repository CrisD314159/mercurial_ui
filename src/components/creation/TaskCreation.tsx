import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Subject, Task, Topic } from "../types/types";
import SelectMenu from "./SelectMenu";


interface TaskCreationProps {
  subjects: Subject[],
  topics: Topic[],
  handleTaskCreation: (task:Task) => void
}
interface selectMenuProps {
  id:string,
  name:string
}


export default function TaskCreation(props: TaskCreationProps) {
  const [error, setError] = useState(false)

  // mas adelante aqui hacemos la peticion de crear tarea
  
 
  const [open, setOpen] = useState(false);
  // Estos dos son los valores de los select
  const [subject, setSubject] = useState<string>(props.subjects[0].id ?? '')
  const [topic, setTopic] = useState<string>(props.topics[0].id ?? '')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  // La lista de las materias y el de los temas se convierten en un array objeto con id y name esto para poder hacer mejor la peticion
  const [subjects] = useState<selectMenuProps[]>(props.subjects.map((subject: Subject) => ({id:subject.id, name:subject.name})))
  const [topics] = useState<selectMenuProps[]>(props.topics.map((topic: Topic) => ({id:topic.id, name:topic.tittle}) ))


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
    if(title === '' || subject === '' || topic === ''){
      setError(true)
    }else{
      const task : Task = {
        id: '9896gjshva',
        tittle:title,
        description,
        subjectid:subject,
        topicid:topic,
        stateid:'1',
        statename:'To do',
        subjectname: 'PRUEBA',
        topictittle: 'Prueba'
        
      }
      
      props.handleTaskCreation(task) // Aquí se envía la tarea al componente padre para que la añada a la lista de tareas
      resetValues() // Reseteamos los valores de los inputs
      handleClose() // Cerramos el modal
    }
    
  };
  const resetValues = () => {
    setTitle('')
    setDescription('')
    setSubject(props.subjects[0].id ?? '')
    setTopic(props.topics[0].id)
  }
  return (
    <div>
      <Fab size="small" onClick={handleClickOpen}><AddIcon /></Fab>
      <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)'  }} aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
          <div style={{border:'1px solid #666', borderRadius:'6px', overflow:'hidden'}}>
            <DialogTitle sx={{ backgroundColor: '#0F0F0F', padding: '20px'  }} id="alert-dialog-title">
            <TextField placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard" required size="medium" error={error}></TextField>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#0F0F0F', height: '300px' }} id="alert-dialog-description" >
            <form action="">
              <div style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ margin: '30px' }}>
                  <SelectMenu handleSelect={handleSelectSubject} option={subject} options={subjects} title="Subjects" />
                  <SelectMenu handleSelect={handleSelectTopic} option={topic} options={topics} title="Topics" />
                </div>
                <TextField sx={{ m: 1, width: '100%' }} value={description} onChange={(e) => setDescription(e.target.value)} label='Description' type='text' variant='outlined' multiline maxRows={4} error={error}/>

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