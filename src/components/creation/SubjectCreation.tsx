import { Alert, Button, Dialog, DialogActions, DialogContent, Fab, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useMutation } from "@tanstack/react-query";
import { Subject, SubjectCreationFileds, SubjectCreationResponse } from "../types/types";
import { createSubject } from "../../utils/utils";


interface SubjectCreationProps {
    handleCreation: (subject:Subject) => void

}
export default function SubjectCreation(props:SubjectCreationProps) {
    const token = localStorage.getItem('accessToken') // Obtenemos el token del usuario
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página

    const createSubjectMutation = useMutation<SubjectCreationResponse, Error, SubjectCreationFileds>({ // Mutación para crear una materia
        mutationFn: createSubject, // Función que se encarga de hacer la petición
        onSuccess:(data:SubjectCreationResponse)=>{
            props.handleCreation(data.subject) // Se envía la materia al componente padre para que la añada a la lista de materias
            resetValues() // Se resetean los valores de los inputs
            handleClose() // Se cierra el modal
        },
        onError:()=>{
            setAlert(true) // Si hay un error en la petición, se muestra una alerta
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
        if(token){
            createSubjectMutation.mutate({name:title, color:"#fff", token:token}) // Se hace la petición para crear una materia
        }
       
        
    };
    const resetValues = () => {
        setTitle('')
    }

    return (
        <div>
            <Fab size="small" onClick={handleClickOpen}
            ><AddIcon /></Fab>
            
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
                            <Button onClick={handleCreate} variant="outlined" color="success" disabled={createSubjectMutation.isPending}>Create</Button>
                        </DialogActions>
                    </DialogContent>


                </div>
                
            </Dialog>
        </div>
    )
}