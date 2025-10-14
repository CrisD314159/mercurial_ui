import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Logout } from '@/lib/Auth/AuthActions';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import toast from 'react-hot-toast';



export default function LogOutAlert() { 
  const [open, setOpen] = useState(false);


  const handleDelete = async () =>{
    try {
      await Logout()
    } catch (error) {
      if(error instanceof Error)
        toast.error(error.message)
    }
  }


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(true);
  };

  return (
    <>
    <ListItemButton sx={{background:'#db040c', borderRadius:'15px'}} onClick={handleOpen}>
      <ListItemIcon>
        <LogoutRoundedIcon/>
      </ListItemIcon>
      <ListItemText primary={"Logout"} />
    </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backdropFilter: 'blur(2px)'}}
      >
        <div style={{border:'1px solid #666', overflow:'hidden', borderRadius:'7px'}}>
        <DialogTitle id="alert-dialog-title">
          {"You're about to log out"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color='secondary'>
            Close
          </Button>
          <Button onClick={handleDelete} color='error'>
            Logout
          </Button>
        </DialogActions>

        </div>
        
      </Dialog>
    </>
  );
}
