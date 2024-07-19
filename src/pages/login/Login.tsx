import { TextField } from "@mui/material";
import './login.css'
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginCredentials, LoginResponse } from "../../components/types/types";



async function login(credentials: LoginCredentials) : Promise<LoginResponse> {
  try {
    const response = await fetch('http://localhost:8080/login',{
      method:'POST', // método de la petición
      headers: {
        'Content-Type': 'application/json' // cabecera de la petición
      },
      credentials:'include', // incluir cookies en la petición, para poder recibir la cookie de sesión desde la API
      body: JSON.stringify(credentials) // cuerpo de la petición, convertimos el objeto a JSON usando JSON.stringify()
    })
    return response.json() // retornamos la respuesta en formato JSON
    
  } catch (error) {
    throw new Error('There was a erro with the API') // lanzamos un error si la respuesta de la API no es correcta
    
  }
  


}



export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate() // hook de react-router-dom para redirigir al usuario a otra ruta

  useEffect(()=>{
    if(localStorage.getItem('userImage')){ // verificamos si existe la imagen de usuario en el localStorage
      navigate('/dashboard') // si existe una imagen, es porque el usuario ya ha iniciado sesión, por lo que lo redirigimos al dashboard
    }
  })


// uso básico de useQuery

  // const { isLoading, error, data} = useQuery({ // uso básico de useQuery
        // isLoading: boolean, // indica si la petición está en curso
        // error: Error | null, // contiene el error si la petición falla
        // data: any, // contiene los datos de la petición
  //   queryKey: ['users'], // clave de la query, permite identificar la query
  //   queryFn: async ()=>{ // función que se ejecutará al llamar a useQuery
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos')  // petición a la API
  //     if(!response.ok){
  //       throw new Error('Network response was not ok')
  //     }
  //     return response.json() // retornamos la respuesta en formato JSON
  //   }
  // })

  const mutation = useMutation<LoginResponse, Error, LoginCredentials> ({ // uso básico de useMutation
    // LoginResponse es el tipo de dato que retornará la función login
    // Error es el tipo de dato que retornará la función en caso de error
    // LoginCredentials es el tipo de dato que recibirá la función login
    mutationFn: login, // función que se ejecutará al llamar a mutation.mutate()
    onSuccess: (data: LoginResponse)=>{ // función que se ejecutará si la petición es exitosa
      localStorage.setItem('userImage', data.data.userImage ) // guardamos la imagen de usuario en el localStorage
      navigate('/dashboard') // redirigimos al usuario al dashboard
    },
    onError: (error: Error)=>{ // función que se ejecutará si la petición falla
      alert(error.message) // mostramos un mensaje de error
    }
  })

 
  function handleSubmit() {
    mutation.mutate({email, password}) // llamamos a mutation.mutate() con las credenciales del usuario si el formulario es enviado
  }
  return (
    <div className="mainLoginContainer">
      <div className="backgroundContainerLogin">
        <div className="formContainerLogin">
          <div className="imageContainer">
            <img src="/mercurialLogo.png" alt="" className="imageLogo" />
          </div>
          <h1 className="formTitle">Welcome to Mercurial</h1>
          <form action="" className="loginForm" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()}}>
            <TextField required label="E-mail" variant="outlined" type="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
            <TextField required label="Password" type="password" variant="outlined" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className="loginButton">Log In</button>
            <NavLink to="/SignUp" className="signUp">Sign Up</NavLink>

          </form>

        </div>
      </div>
    </div>
  )

}