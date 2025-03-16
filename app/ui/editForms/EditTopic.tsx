import { Alert, Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useState } from "react";
import './topicCreation.css'
import { TopicCreationResponse, TopicUpdateFileds } from "../../lib/types/types";
import { useMutation } from "@tanstack/react-query";
import { updateTopic } from "@/app/lib/utils";
import { useGuardianStore } from "../../store/guardianStore";



interface TopicCreationProps {
    topicId: string,
    topicName: string,
    topicColor: string
}

export default function EditTopic(props: TopicCreationProps) {
    const token = localStorage.getItem('accessToken')
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>(props.topicName)
    const [color, setColor] = useState<string>(props.topicColor)
    const [alert, setAlert] = useState(false)
    const checkAuth = useGuardianStore(state=>state.checkAuthStatus)    

    const errorFunc = (error:Error)=>{
        if(error.message === 'Unauthorized'){
            checkAuth()
        }else{
          setAlert(true)
        }

    }

    const updateTopicMutation = useMutation<TopicCreationResponse, Error, TopicUpdateFileds>({
        mutationFn: updateTopic,
        onSuccess: () => {
            window.location.reload()
            //props.handleEdit(data.topic)
            resetValues()
            handleClose()
        },
        onError: errorFunc
    })

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        if (title.length === 0) return
        if(token){
            updateTopicMutation.mutate({
            id: props.topicId, tittle: title, color, token
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
             <Button size='small' onClick={handleClickOpen}><ModeEditRoundedIcon sx={{color:'#fff'}}></ModeEditRoundedIcon></Button>
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
                        <Button onClick={handleCreate} variant="outlined" color="success" disabled={updateTopicMutation.isPending}>Update</Button>
                    </DialogActions>

                </div>

            </Dialog>
        </div>
    )
}