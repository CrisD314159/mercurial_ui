import { Alert, Button, Dialog, DialogActions, DialogContent, Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import './topicCreation.css'
import { Topic, TopicCreationFileds, TopicCreationResponse } from "../../lib/types/types";
import { useMutation } from "@tanstack/react-query";
import { createTopic } from "@/app/lib/utils";



interface TopicCreationProps {
    handleCreation: (topic: Topic) => void
}

export default function TopicCreation(props: TopicCreationProps) {
    const token = localStorage.getItem('accessToken')
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [color, setColor] = useState<string>('#FB2576')
    const [alert, setAlert] = useState(false)

    const createTopicMutation = useMutation<TopicCreationResponse, Error, TopicCreationFileds>({
        mutationFn: createTopic,
        onSuccess: (data: TopicCreationResponse) => {
            props.handleCreation(data.topic)
            resetValues()
            handleClose()
        },
        onError: () => {
            setAlert(true)
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        if (title.length === 0) return
        if (token){
        createTopicMutation.mutate({
            tittle: title, color, token
        });
        resetValues()
        handleClose()
    }
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
                <div style={{ border: '1px solid #666', borderRadius: '6px', overflow: 'hidden' }}>
                    <DialogContent sx={{
                        backgroundColor: '#0F0F0F',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', height: '150px'
                    }}>
                        {
                            alert && <Alert severity="error" onClose={() => setAlert(false)}>There was an error, try again later</Alert>

                        }
                        <TextField placeholder="New Topic" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard"
                        required inputProps={{ maxLength: 15 }}
                        ></TextField>
                        <div className="colorContainer">
                            <label>
                                Topic color:
                            </label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} required></input>
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#0F0F0F', display: "flex", justifyContent: 'space-around', paddingBottom: '50px' }}>
                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                        <Button onClick={handleCreate} variant="outlined" color="success" disabled={createTopicMutation.isPending}>Create</Button>
                    </DialogActions>

                </div>

            </Dialog>
        </div>
    )
}