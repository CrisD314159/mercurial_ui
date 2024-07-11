import { NavLink } from 'react-router-dom';
import './header.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
interface HeaderProps {
  picture: string

}

/*
props: {
  nombre: 'Allison',
  email: 'allis@gmail.com'
  }
**/

export default function Header(props: HeaderProps) {
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
  return (
    <header className='headerContainer'>
      <div className='imageContainerHeader'>
        <NavLink to='/dashboard'>
          <img src="https://res.cloudinary.com/dw43hgf5p/image/upload/v1719193860/xllkumrdq702etruhxfq.png" alt="" className='image' />
        </NavLink>
      </div>
      <nav className='nav'>
        <ul className='navList'>
          <li className='listItem'><button className='logoutButton'><ExitToAppIcon /></button></li>
          <li className='listItem'>
            <NavLink to={'/userSettings'}>
              <div className='profileImageContainer'><img src={props.picture} alt="" className='profileImage' /></div>
            </NavLink>

          </li>
        </ul>
      </nav>
    </header>
  )
}