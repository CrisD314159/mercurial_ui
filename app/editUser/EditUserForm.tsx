import './editUser.css'
import { Alert, Avatar, Button,  styled, TextField } from '@mui/material';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


import PasswordInput from '../ui/creation/PasswordInput';
import { ImageFields, ImageResponse, User, UserEditFields } from '../lib/types/types';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../lib/utils';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


interface EditUserFormProps {
  user:User
  handleEdit : (editFields: UserEditFields) => void,
  handleClose: () => void
}

export default function EditUserForm(props:EditUserFormProps) {

  const token = 'hola'
  const [name, setName] = useState(props.user.name)
  const [email, setEmail] = useState(props.user.email)
  const [username, setUsername] = useState(props.user.username)
  const [password, setPassword] = useState<string>('')
  const [image, setImage] = useState(props.user.image)
  const [imageObject, setImageObject] = useState<File>()
  const [alert, setAlert] = useState(false)
  const [alertCont, setAlertCont] = useState('There was an error with the API')

  const uploadImageMutation = useMutation<ImageResponse, Error, ImageFields>({
    mutationFn: uploadImage,
    onSuccess:(data:ImageResponse)=>{
      if(data.success === false) throw new Error(data.message)
      setImage(data.url)
      if(password === ''){
       if(token) props.handleEdit({name, username, image: data.url, token})
      
      }else{
      if(token)  props.handleEdit({name, username, password, image: data.url, token})
      }
      
    },
    onError:(error:Error)=>{
      if(error.message === 'Unauthorized'){
        setAlertCont('Unauthorized')
        setAlert(true)  
      }else{
        setAlert(true)
      }
    }
  })
 


  // Lo que hace es que cuando se presiona el botón de save, se imprimen los valores de los campos en la consola
  // Cuando hagamos la integración con la API, aquí se hará la petición PUT
  const handleSubmit = () => {
    if(imageObject){
     if (token) uploadImageMutation.mutate({image:imageObject, token})
    }else{
      if(password === ''){
       if(token) props.handleEdit({name, username, token})
      }else{
      if(token)  props.handleEdit({name, username, password, token})
      }
    }
    
      
    
  }

  return (
    <div>
      {
        alert && <Alert severity='error' onClose={()=>setAlert(false)}>{alertCont}</Alert>
      }
         <form className='editUserForm' onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()
         }}>
                <div className='editProfileImageContainer'>
                  <Avatar className='avatarUser' src={image} alt={name} sx={{ width: 150, height: 150 }} style={{ margin: '20px' }} />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    size='small'
                  >
                    Edit Photo
                    <VisuallyHiddenInput  
                    onChange={(e)=>{
                      if(e.target.files){
                        const file = e.target.files[0]
                        setImageObject(file)
                      }

                    }}
                    type="file" />
                  </Button>

                </div>
                <TextField sx={{ m: 1, width: '25ch' }} label='Name' type='text' variant='outlined' defaultValue={name} required
                  onChange={(e) => {
                    setName(e.target.value)
                  }} />
                <TextField sx={{ m: 1, width: '25ch' }} label='Email' type='email' variant='outlined' defaultValue={email} disabled
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
                <TextField sx={{ m: 1, width: '25ch' }} label='Username' type='text' variant='outlined' defaultValue={username} required
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
                <PasswordInput password={password || ''} setPassword={setPassword} required={false}></PasswordInput>
                <div className='editUserbuttonContainer'>
                  <Button variant='contained' onClick={props.handleClose} color='error'>Cancel</Button>
                  <Button variant='contained' type='submit'>Save</Button>
                </div>
              </form>
     
        
            
              

           
          

 


      

    </div>
  );

}