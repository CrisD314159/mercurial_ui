import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@tanstack/react-query';
import { GeneralResponse } from '../types/types';
import { deleteUser, logout } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Alert } from '@mui/material';


export default function DeleteAlert() {
  const token = useSelector((state: RootState) => state.auth.token) // Token del usuario
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  const deleteUserMutation= useMutation<GeneralResponse, Error, string>({
    mutationFn: deleteUser,
    onSuccess:()=>{
      logout()
      localStorage.clear()
      navigate('/')
    },
    onError:(error:Error)=>{
      if(error.message === 'Unauthorized'){
        logout()
        localStorage.clear()
        navigate('/')
      }else{
        setAlert(true)
      }
    }


  })

  const handleDelete = () =>{
   if(token) deleteUserMutation.mutate(token)
  }


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <button className="deleteButton userButton" onClick={handleOpen}>
        <p className="deleteButtonText">Delete </p>
        <DeleteIcon />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backdropFilter: 'blur(2px)'}}
      >
        <div style={{border:'1px solid #666', overflow:'hidden', borderRadius:'7px'}}>
          {alert && <Alert severity="error" onClose={() => setAlert(false)}>There was an error deleting your account</Alert>}
        <DialogTitle id="alert-dialog-title" sx={{background:'#0d0d0d'}}>
          Warning!!
        </DialogTitle>
        <DialogContent sx={{background:'#0d0d0d'}}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account at Mercurial?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{background:'#0d0d0d'}}>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button onClick={handleDelete} color='error'>
            Delete
          </Button>
        </DialogActions>

        </div>
        
      </Dialog>
    </React.Fragment>
  );
}
