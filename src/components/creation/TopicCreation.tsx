import { Button, Dialog, DialogActions, DialogContent, Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import './topicCreation.css'

export default function TopicCreation() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [color, setColor] = useState<string>('#F88114')
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        console.log({
            title, color
        });
        resetValues()
        handleClose()
    };
    const resetValues = () => {
        setTitle('')
        setColor('#F88114')
    }
    return (
        <div>
            <Fab size="small" onClick={handleClickOpen}><AddIcon /></Fab>
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            >
                <div style={{border:'1px solid #666', borderRadius:'6px', overflow:'hidden'}}>
                    <DialogContent sx={{
                    backgroundColor: '#0F0F0F',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', padding:'30px', height: '150px'
                }}>
                        <TextField placeholder="New Topic" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard"
                        ></TextField>
                        <div className="colorContainer">
                            <label>
                                Topic color:
                            </label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}></input>
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#0F0F0F', display: "flex", justifyContent: 'space-around', paddingBottom: '50px' }}>
                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                        <Button onClick={handleCreate} variant="outlined" color="success">Create</Button>
                    </DialogActions>

                </div>
                
            </Dialog>
        </div>
    )
}