'use client'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

interface SnackbarProps{
  state:boolean
  message:string
  type: 'error' | 'info' | 'success' | 'warning'

}
export default function MercurialSnackbar({message, state, type}:SnackbarProps) {
  const [open, setOpen] = useState(state);



  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}
      anchorOrigin={{'horizontal':'center', 'vertical':'top'}}
      >
        <Alert
          onClose={handleClose}
          severity={type as 'error' | 'info' | 'success' | 'warning'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
