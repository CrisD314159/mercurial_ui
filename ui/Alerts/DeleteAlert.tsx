import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import {IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import toast from 'react-hot-toast';


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


  const handleDelete = async () =>{
    try {
      await deleteMethod(isAuthenticated, typeof id === "string" ? id : id.toString())
      toast.success("Done!")
      mutate()
    } catch (error) {
      if(error instanceof Error)
        toast.error(error.message)
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
      <IconButton onClick={handleOpen}>
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
