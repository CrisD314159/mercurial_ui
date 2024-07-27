import { NavLink, useNavigate } from 'react-router-dom';
import './header.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import { getImageFromLocalStorage, logout } from '../utils/utils';
import { useMutation } from '@tanstack/react-query';
import { LogOutResponse } from './types/types';


/*
props: {
  nombre: 'Allison',
  email: 'allis@gmail.com'
  }
**/



export default function Header() {
  const [image] = useState<string>(getImageFromLocalStorage() || '')
  const navigate = useNavigate()


  const mutate = useMutation<LogOutResponse, Error>({
    // En este caso no se le pasa ningun argumento a la función logout, por lo tanto solo ponemos dos valores
    // LogOutResponse es el tipo de dato que retornará la función logout
    // Error es el tipo de dato que retornará la función en caso de error
    mutationFn: logout, // Función que se ejecutará al llamar a mutate.mutate()
    onSuccess: ()=>{
      localStorage.removeItem('userImage') // Eliminamos la imagen de usuario del localStorage si la petición es exitosa
      navigate('/') // Redirigimos al usuario a la ruta raíz, que es el login

    }
  })

  /*
  Listas en html

  lista no ordenada
    <ul>
          <li>Elemento</li> elemento de lista, todas usan esta etiqueta
          <li>Elemento2</li> dentro de esta etiqueta va el texto que se va a mostrar, puede ser texto, imagen, etc
          <li>Elemento3</li>
          <li>Elemento4</li>
          <li>Elemento5</li>
        </ul>
  lista ordenada
    <ol>
          <li>Element 1</li>
          <li>Element 2</li>
          <li>Element 3</li>
          <li>Element 4</li>
          <li>Element 5</li>
    </ol>
     

  */
  function handleLogout(){
    mutate.mutate() // Como no se le pasa ningun argumento, se ejecuta la función logout
  }

  return (
    <header className='headerContainer'>
      <div className='imageContainerHeader'>
        <NavLink to='/dashboard'>
          <img src="https://res.cloudinary.com/dw43hgf5p/image/upload/v1719193860/xllkumrdq702etruhxfq.png" alt="" className='image' />
        </NavLink>
      </div>
      <nav className='nav'>
        <ul className='navList'>
          <li className='listItem'><Button variant='outlined' color='secondary' className='logoutButton' onClick={handleLogout}><ExitToAppIcon /></Button></li>
          <li className='listItem'>
            <NavLink to={'/userSettings'}>
              <Avatar src={image} alt='userImage' className='avatar' />
            </NavLink>

          </li>
        </ul>
      </nav>
    </header>
  )
}