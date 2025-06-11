'use client'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface SnackbarProps{
  state:boolean
  message:string
  type: 'error' | 'info' | 'success' | 'warning'
  closeMethod: (state:boolean) => void

}
export default function MercurialSnackbar({message, state, type, closeMethod}:SnackbarProps) {
  const handleClose = () =>{
    closeMethod(false)
  };

  return (
    <div>
      <Snackbar open={state} autoHideDuration={5000} onClose={handleClose}
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
