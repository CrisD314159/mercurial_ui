import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { DeleteUserAction } from '@/lib/ServerActions/UserActions';
import toast from 'react-hot-toast';



export default function DeleteUserAlert() { 
  const [open, setOpen] = useState(false);


  const handleDelete = async () =>{
    try {
      await DeleteUserAction()
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
      <Button onClick={handleOpen} variant='outlined' color='error'>
        Delete your account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backdropFilter: 'blur(2px)'}}
      >
        <div style={{border:'1px solid #666', overflow:'hidden', borderRadius:'7px'}}>
        <DialogTitle id="alert-dialog-title">
          {'Delete your account'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to delete permanently your account?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color='secondary'>
            Close
          </Button>
          <Button onClick={handleDelete} color='error'>
            Delete Account
          </Button>
        </DialogActions>

        </div>
        
      </Dialog>
    </>
  );
}
