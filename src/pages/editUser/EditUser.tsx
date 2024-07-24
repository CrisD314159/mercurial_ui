import './editUser.css'
import Header from '../../components/Header';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import PasswordInput from '../../components/creation/PasswordInput';
import { getImageFromLocalStorage } from '../../utils/utils';


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
  
  const [name, setName] = useState('Pedro')
  const [email, setEmail] = useState('Pedro')
  const [username, setUsername] = useState('pedro123')
  const [password, setPassword] = useState('123456')


  // Lo que hace es que cuando se presiona el botón de save, se imprimen los valores de los campos en la consola
  // Cuando hagamos la integración con la API, aquí se hará la petición PUT
  const handleSubmit = () => {
    console.log({
      name, email, username, password
    });
  }

  return (
    <div>
      < Header/>
      {
        name ?
          <div className='mainUserCardContainer'>
            <div className='editUserCard'>
              <div className='editProfileImageContainer'>
                <div className='profileImageContainerUser' style={{ backgroundImage: `url("${getImageFromLocalStorage()}")` }}></div>
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