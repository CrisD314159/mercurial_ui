'use client'
import {  Button, Dialog, DialogActions, DialogContent, Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { startTransition, useActionState, useEffect, useState } from "react";
import { useMercurialStore } from "@/store/useMercurialStore";
import MercurialSnackbar from "../Snackbars/MercurialSnackbar";
import { CreateSubject } from "@/lib/RequestIntermediaries/SubjectInter";

interface SubjectCreationProps{
    mutate:()=> void
}
export default function SubjectCreation({mutate}:SubjectCreationProps) {
    const [open, setOpen] = useState(false);
    const [state, action, pending] = useActionState(CreateSubject, undefined)
    const {isAuthenticated} = useMercurialStore()
    const [alert, setAlert] = useState(false);

    useEffect(()=>{
        if(state && !state.success){
          setAlert(true)
        }
    }, [state])
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata = new FormData(event.currentTarget)
        formdata.append('auth', isAuthenticated ? 'true' : 'false')

        startTransition(()=>{
            action(formdata)
        })
        mutate()
        handleClose()
    }


    return (
        <div>
            
            <MercurialSnackbar message={state?.message ?? "An unexpected error occurred"} state={alert} type="error" closeMethod={setAlert}/>
            
            <Fab size="small" color="info" onClick={handleClickOpen}><AddIcon /></Fab>
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            >
                    <DialogContent  sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px'
                    }}>
                        <form onSubmit={handleCreate}>
                            <TextField placeholder="New Subject" name="title" variant="standard"
                            sx={{marginBottom:'15px'}}
                            required inputProps={{ maxLength: 70 }}
                            ></TextField>
                            <DialogActions>
                                <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                                <Button variant="outlined" type="submit" disabled={pending} color="success">Create</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>

            </Dialog>
        </div>
    )
}