import './styles.css'
interface HeaderProps{
  nombre:string,
  email:string
  color:string

}

/*
props: {
  nombre: 'Allison',
  email: 'allis@gmail.com'
  }
**/

export default function Header(props:HeaderProps){
  return (
    <header>
      <h1 style={{color:`${props.color}`}} className="title" >Bienvenida de nuevo, {props.nombre}</h1>
      <p>Tu email es {props.email}</p>
    </header>
  )
}