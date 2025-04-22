'use client'
import {  Button, Dialog, DialogActions, DialogContent, IconButton, TextField } from "@mui/material";
import { startTransition, useActionState, useState } from "react";
import { useMercurialStore } from "@/app/store/useMercurialStore";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MercurialSnackbar from "../Snackbars/MercurialSnackbar";
import { UpdateUserAction } from "@/app/lib/ServerActions/UserActions";


interface UserEditProps{
    mutate:()=> void
    name:string
}
export default function EditUser({mutate, name}:UserEditProps) {
    const [open, setOpen] = useState(false);
    const [state, action, pending] = useActionState(UpdateUserAction, undefined)
    const {isAuthenticated} = useMercurialStore()

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


        startTransition(()=>{
            action(formdata)
        })
        mutate()
        handleClose()
    }


    return (
        <div>
            {
                state?.errors && <MercurialSnackbar message={state.errors} state={true} type="error"/>
            }
            <IconButton size="small"  onClick={handleClickOpen}><EditRoundedIcon /></IconButton>
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            >
                    <DialogContent  sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px'
                    }}>
                        <form onSubmit={handleUpdate}>

                            <TextField placeholder="Update Your Name" name="name" variant="standard"
                            required inputProps={{ maxLength: 100 }} defaultValue={name} sx={{marginBottom:'15px'}}
                            ></TextField>
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