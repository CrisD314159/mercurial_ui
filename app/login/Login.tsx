import { Alert, TextField } from "@mui/material";
import './login.css'
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginCredentials, LoginResponse } from "../ui/types/types";
import { login } from "../lib/utils";
import { useGuardianStore } from "../store/guardianStore";


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [alertCont, setAlertCont] = useState('')
  const checkAuth = useGuardianStore(state=>state.checkAuthStatus)
  const navigate = useNavigate() // hook de react-router-dom para redirigir al usuario a otra ruta


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
      if(data.success === false) throw new Error(data.message) // si la petición es exitosa pero el servidor retorna un mensaje de error, entonces lanzamos un error
      checkAuth() // llamamos a la función checkAuth para verificar si el usuario está autenticado
      navigate('/dashboard') // redirigimos al usuario al dashboard
    },
    onError: (error: Error)=>{
      setAlertCont(error.message) // mensaje que se mostrará en la alerta
      setAlert(true) // función que se ejecutará si la petición falla
      
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
            <button className="loginButton" disabled={mutation.isPending}>Log In</button>
            <NavLink to="/SignUp" className="signUp">Sign Up</NavLink>
            <NavLink to="/users/recover/password/email" className="signUp">Forgot your password?</NavLink>
            {
        alert && <Alert  severity="warning" onClose={()=>{setAlert(false)}} sx={{m:2}} >{alertCont}</Alert>
      }

          </form>

        </div>
      </div>
      <footer className="loginFooter">Created by 
        <a href="https://www.linkedin.com/in/allison-hincapie-ab7a76313/" className="loginLink"> Allison Hincapié   </a>  | <a href="https://www.linkedin.com/in/cristian-david-vargas-loaiza-982314271/" className="loginLink"> Cristian David Vargas </a></footer>
    </div>
  )

}