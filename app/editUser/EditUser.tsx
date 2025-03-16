import './editUser.css'

import { Alert, Dialog, DialogContent} from "@mui/material";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useState } from 'react';
import { updateUser } from '../lib/utils';
import { GeneralResponse,User, UserEditFields } from '../lib/types/types';
import { useMutation } from '@tanstack/react-query';
import EditUserForm from './EditUserForm';
import { useGuardianStore } from '../store/guardianStore';

interface EditUserProps {
  user:User
}

export default function EditUser(props: EditUserProps) {
  const checkAuth = useGuardianStore(state=>state.checkAuthStatus)
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const userEditMutation = useMutation<GeneralResponse, Error, UserEditFields>({
    mutationFn: updateUser,
    onSuccess:(data:GeneralResponse)=>{
      if(data.success === false) throw new Error(data.message)
      handleClose()
      window.location.reload()
    },
    onError:(error:Error)=>{
      if(error.message === 'Unauthorized'){
        checkAuth()
      }else{
        setAlert(true)
        
      
      }
    }
  })

  const handleEdit = (user:UserEditFields)=>{
    if(user && user.image){
      localStorage.setItem('userImage', user.image)
      userEditMutation.mutate(user)
    }else{
      userEditMutation.mutate(user)
    }
    
  }


  return (
    <div>
      
      <button className="editButton userButton" onClick={handleClickOpen}>
        <p className="editButtonText">Edit profile </p>
        <ModeEditRoundedIcon></ModeEditRoundedIcon>
      </button>
     <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)'  }} aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description">
        {
          alert&& <Alert severity="error" onClose={()=>setAlert(false)}>There was an error updating the user</Alert>
        }
         <div style={{border:'1px solid #666', borderRadius:'6px', overflow:'hidden'}}>
         <DialogContent sx={{ backgroundColor: '#0F0F0F'}} id="alert-dialog-description" >
         <EditUserForm user={props.user} handleEdit={handleEdit} handleClose={handleClose}/>
         </DialogContent>
         </div>

     </Dialog>

      

    </div>
  );

}


