import { Alert, Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useMutation } from "@tanstack/react-query";
import { Subject, SubjectCreationResponse, SubjectUpdateFileds } from "../types/types";
import { logout, updateSubject } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface SubjectCreationProps {
    handleEdit: (subject:Subject) => void,
    subjectId:string,
    subjectName : string

}
export default function EditSubject(props:SubjectCreationProps) {
    const token = useSelector((state: RootState) => state.auth.token) // Token del usuario
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>(props.subjectName)
    const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página

    const updateSubjectMutation = useMutation<SubjectCreationResponse, Error, SubjectUpdateFileds>({ // Mutación para crear una materia
        mutationFn: updateSubject, // Función que se encarga de hacer la petición
        onSuccess:()=>{
            window.location.reload()
           // props.handleEdit(data.subject) // Se envía la materia al componente padre para que la añada a la lista de materias
            resetValues() // Se resetean los valores de los inputs
            handleClose() // Se cierra el modal
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
        if(title.length === 0) return
      if(token) updateSubjectMutation.mutate({name:title, id:props.subjectId, color:"#fff", token})
        
    };
    const resetValues = () => {
        setTitle('')
    }

    return (
        <div>
            <Button size='small' onClick={handleClickOpen}><ModeEditRoundedIcon></ModeEditRoundedIcon></Button>
            
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            >
                <div>
                    <DialogContent sx={{
                    backgroundColor: '#0F0F0F',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', height: '150px', justifyContent: 'center', borderRadius: '6px', border: '1px solid #666'
                }}>
                    {
                    alert && <Alert severity="error" onClose={()=> setAlert(false)}>There was an error, try again later</Alert>
                    // Si alert es true, entonces se muestra una alerta de error
                    }
                        <TextField placeholder="New Subject" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard"
                         inputProps={{maxLength: 20}} required
                        ></TextField>
                        <DialogActions sx={{ backgroundColor: '#0F0F0F', display: "flex", justifyContent: 'space-around', paddingTop: '30px' }}>
                            <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                            <Button onClick={handleCreate} variant="outlined" color="success">Update</Button>
                        </DialogActions>
                    </DialogContent>


                </div>
                
            </Dialog>
        </div>
    )
}