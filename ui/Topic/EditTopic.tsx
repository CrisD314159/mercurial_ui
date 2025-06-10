'use client'
import {  Button, Dialog, DialogActions, DialogContent, IconButton, TextField } from "@mui/material";
import { startTransition, useActionState, useState } from "react";
import { UpdateTopic } from "@/lib/RequestIntermediaries/TopicInter";
import { useMercurialStore } from "@/store/useMercurialStore";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MercurialSnackbar from "../Snackbars/MercurialSnackbar";


interface TopicCreationProps{
    mutate:()=> void
    title:string
    color:string
    id:number
}
export default function EditTopic({mutate, color, title, id}:TopicCreationProps) {
    const [open, setOpen] = useState(false);
    const [state, action, pending] = useActionState(UpdateTopic, undefined)
    const {isAuthenticated} = useMercurialStore()
    const [alert, setAlert] = useState(state?.errors ? true : false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata = new FormData(event.currentTarget)
        formdata.append('auth', isAuthenticated ? 'true' : 'false')
        formdata.append('id', id.toString())

        startTransition(()=>{
            action(formdata)
        })
        mutate()
        handleClose()
    }


    return (
        <div>
            {
                state?.errors && <MercurialSnackbar message={state.errors} state={alert} type="error" closeMethod={setAlert}/>
            }
            <IconButton size="small"  onClick={handleClickOpen}><EditRoundedIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            >
                    <DialogContent  sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px'
                    }}>
                        <form onSubmit={handleUpdate}>

                            <TextField placeholder="Update Topic" name="title" variant="standard"
                            required inputProps={{ maxLength: 70 }} defaultValue={title}
                            ></TextField>
                            <div className="py-3 my-4 flex items-center gap-2">
                                <label>
                                    Topic color:
                                </label>
                                <input type="color" defaultValue={color} name="color" className="w-12 h-12" required></input>
                            </div>
                            <DialogActions>
                                <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                                <Button variant="outlined" type="submit" disabled={pending} color="success">Update</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>

            </Dialog>
        </div>
    )
}