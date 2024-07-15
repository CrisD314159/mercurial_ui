import { Button, Dialog, DialogActions, DialogContent, Fab, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

export default function SubjectCreation() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>('')

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        console.log({
            title
        });
        resetValues()
        handleClose()
    };
    const resetValues = () => {
        setTitle('')
    }

    return (
        <div>
            <Fab size="small" onClick={handleClickOpen}
            ><AddIcon /></Fab>
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            ><DialogContent sx={{
                backgroundColor: '#0F0F0F',
                display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px', height: '150px', justifyContent: 'center', borderRadius: '6px', border: '1px solid #666'
            }}>
                    <TextField placeholder="New Subject" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard"
                    ></TextField>
                    <DialogActions sx={{ backgroundColor: '#0F0F0F', display: "flex", justifyContent: 'space-around', paddingTop: '30px' }}>
                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                        <Button onClick={handleCreate} variant="outlined" color="success">Create</Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </div>
    )
}