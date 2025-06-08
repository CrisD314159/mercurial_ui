'use client'
import {  Button, Dialog, DialogActions, DialogContent, Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { startTransition, useActionState, useState } from "react";
import { CreateTopic } from "@/app/lib/RequestIntermediaries/TopicInter";
import { useMercurialStore } from "@/app/store/useMercurialStore";
import MercurialSnackbar from "../Snackbars/MercurialSnackbar";

interface TopicCreationProps{
    mutate:()=> void
}
export default function TopicCreation({mutate}:TopicCreationProps) {
    const [open, setOpen] = useState(false);
    const [state, action, pending] = useActionState(CreateTopic, undefined)
    const {isAuthenticated} = useMercurialStore()
    const [alert, setAlert] = useState(state?.errors ? true : false);

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
        console.log(state);
    }


    return (
        <div>
            {
                state?.errors && <MercurialSnackbar message={state.errors.toString()} state={alert} type="error" closeMethod={setAlert}/>
            }
            <Fab size="small" color="info" onClick={handleClickOpen}><AddIcon /></Fab>
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            >
                    <DialogContent  sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px'
                    }}>
                        <form onSubmit={handleCreate}>
                            {
                                state?.errors && <div>Error</div>

                            }
                            <TextField placeholder="New Topic" name="title" variant="standard"
                            required inputProps={{ maxLength: 70 }}
                            ></TextField>
                            <div className="py-3 my-4 flex items-center gap-2">
                                <label>
                                    Topic color:
                                </label>
                                <input type="color" name="color" className="w-12 h-12" required></input>
                            </div>
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