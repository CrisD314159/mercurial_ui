import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertProps{
  title: string,
  message: string,
}

export default function AlertDialog(props: AlertProps) {
  const {title, message} = props
  const [open, setOpen] = React.useState(true);



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backdropFilter: 'blur(2px)'}}
      >
        <div style={{border:'1px solid #666', overflow:'hidden', borderRadius:'7px'}}>
        <DialogTitle id="alert-dialog-title" sx={{background:'#0d0d0d'}}>
          {title}
        </DialogTitle>
        <DialogContent sx={{background:'#0d0d0d'}}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{background:'#0d0d0d'}}>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>

        </div>
        
      </Dialog>
    </React.Fragment>
  );
}
