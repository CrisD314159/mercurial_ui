import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { useState } from "react";
import {  TaskUpdateFileds, TaskUpdateResponse,} from "../types/types";

import { useMutation } from "@tanstack/react-query";
import { logout, updateTask } from "../../utils/utils";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";



interface TaskCreationProps {
  topicId: string,
  subjectId: string
  topicName: string,
  subjectName: string
  title: string,
  description: string,
  taskId: string
,}


export default function EditTask(props: TaskCreationProps) {
  const token = useSelector((state: RootState) => state.auth.token) // Token del usuario
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página

 
  const [open, setOpen] = useState(false);
  // Estos dos son los valores de los select
  const [title, setTitle] = useState<string>(props.title)
  const [description, setDescription] = useState<string>(props.description)

  // La lista de las materias y el de los temas se convierten en un array objeto con id y name esto para poder hacer mejor la peticion


  const taskEditMutation = useMutation<TaskUpdateResponse, Error, TaskUpdateFileds>({
    mutationFn: updateTask,
    onSuccess: ()=>{
      window.location.reload()
      //props.handleTaskCreation(data.task) // Aquí se envía la tarea al componente padre para que la añada a la lista de tareas
      resetValues() // Reseteamos los valores de los inputs
      handleClose() // Cerramos el modal
    },
    onError:(error:Error)=>{
      if(error.message === 'Unauthorized'){
        logout()
        localStorage.clear()
        navigate('/')

      }else{
        setAlert(true)
      }
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    if(title === ''){
      setError(true)
    }else{
    if(token)  taskEditMutation.mutate({ id:props.taskId, tittle:title, description , token})
    }
  };

  const resetValues = () => {
    setTitle('')
    setDescription('')
  }
  return (
    <div>
      <Fab color="info"  size="small" onClick={handleClickOpen}><ModeEditRoundedIcon/></Fab>
      <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)'  }} aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
          <div style={{border:'1px solid #666', borderRadius:'6px', overflow:'hidden'}}>
            <DialogTitle sx={{ backgroundColor: '#0F0F0F', padding: '20px'  }} id="alert-dialog-title">
            <TextField placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard" required size="medium" error={error} inputProps={{maxLength: 18}}></TextField>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#0F0F0F', height: '300px' }} id="alert-dialog-description" >
          {
                    alert && <Alert severity="error" onClose={()=> setAlert(false)}>There was an error, try again later</Alert>
                    }
            <form action="">
              <div style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ margin: '30px' }}>
               <TextField sx={{ m: 1, width: '100%' }} value={props.subjectName} label='Subject' type='text' variant='outlined' disabled/>
               <TextField sx={{ m: 1, width: '100%' }} value={props.topicName}  label='Topic' type='text' variant='outlined' disabled/>
                </div>
                <TextField sx={{ m: 1, width: '100%' }} value={description} onChange={(e) => setDescription(e.target.value)} label='Description' type='text' variant='outlined' multiline maxRows={4} error={error}  inputProps={{maxLength: 50}}/>

              </div>
            </form>


          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#0F0F0F', display: 'flex', justifyContent: 'space-around', paddingBottom: '50px' }}>
            <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
            <Button onClick={handleCreate} variant="outlined" color="success">Update</Button>

          </DialogActions>
          </div>

      </Dialog>


    </div>
  )


}