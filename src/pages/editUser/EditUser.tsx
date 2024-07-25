import './editUser.css'
import Header from '../../components/Header';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/creation/PasswordInput';
import { getUser, logout, updateUser } from '../../utils/utils';
import { GeneralResponse, GetUserResponse, UserEditFields } from '../../components/types/types';
import { useMutation } from '@tanstack/react-query';


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
export default function EditUser() {
  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')

  const userMutation = useMutation<GetUserResponse, Error>({
      mutationFn: getUser,
      onSuccess(data:GetUserResponse){
          setName(data.user.name)
          setEmail(data.user.email)
          setUsername(data.user.username)
          setPassword(data.user.password)
          setImage(data.user.image)

      }
  })

  const userEditMutation = useMutation<GeneralResponse, Error, UserEditFields>({
    mutationFn: updateUser,
    onSuccess:(data:GeneralResponse)=>{
      console.log(data);
    },
    onError:(error:Error)=>{
      if(error.message === 'Unauthorized'){
        logout()
        localStorage.clear()
        navigate('/')
      }else{
        console.log('Error updating the user')
      
      }
    }
  })

  useEffect(()=>{
      userMutation.mutate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Lo que hace es que cuando se presiona el botón de save, se imprimen los valores de los campos en la consola
  // Cuando hagamos la integración con la API, aquí se hará la petición PUT
  const handleSubmit = () => {
    userEditMutation.mutate({name, username, password})
  }

  return (
    <div>
      < Header/>
      {
        name ?
          <div className='mainUserCardContainer'>
            <div className='editUserCard'>
              <div className='editProfileImageContainer'>
                <div className='profileImageContainerUser' style={{ backgroundImage: `url("${image}")` }}></div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  size='small'
                >
                  Edit Photo
                  <VisuallyHiddenInput type="file" />
                </Button>

              </div>

              <form action="" className='editUserForm'>
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
                <PasswordInput password={password} setPassword={setPassword}></PasswordInput>
              </form>
              <div className='editUserbuttonContainer'>
                <NavLink to={'/userSettings'}><Button variant='contained' color='error'>Cancel</Button></NavLink>
                <Button variant='contained' onClick={handleSubmit}>Save</Button>
              </div>
            </div>

          </div>
          : <></>

      }

    </div>
  );

}