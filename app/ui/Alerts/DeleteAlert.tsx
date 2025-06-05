import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import {IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MercurialSnackbar from '../Snackbars/MercurialSnackbar';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


interface DeleteDialogProps{
  title:string
  body:string
  id:number | string
  isAuthenticated:boolean
  assignmentAlert?:boolean
  mutate:()=> void
  deleteMethod: (isAuthenticated:boolean, id:string) => Promise<void>

}

export default function DeleteAlert({body, mutate, title, id, isAuthenticated, deleteMethod, assignmentAlert}: DeleteDialogProps) { 
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);


  const handleDelete = async () =>{
    try {
      await deleteMethod(isAuthenticated, typeof id === "string" ? id : id.toString())
      mutate()
    } catch (error) {
      setAlert(true)
    }
  }


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
    {
      alert && <MercurialSnackbar message='An unexpected error occured while trying to delete the topic' state={true} type='error'/>
    }
    {
      assignmentAlert ?
      <ListItem disablePadding>
        <ListItemButton autoFocus onClick={handleOpen}>
          <ListItemIcon>
              <DeleteRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Delete Assignment" />
        </ListItemButton>
      </ListItem>
      :
      <IconButton >
        <DeleteIcon />
      </IconButton>
    }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backdropFilter: 'blur(2px)'}}
      >
        <div style={{border:'1px solid #666', overflow:'hidden', borderRadius:'7px'}}>
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color='secondary'>
            Close
          </Button>
          <Button onClick={handleDelete} color='error'>
            Delete
          </Button>
        </DialogActions>

        </div>
        
      </Dialog>
    </>
  );
}
