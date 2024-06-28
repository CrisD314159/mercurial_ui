import { TextField } from "@mui/material";
import './login.css'
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    console.log(email, password)
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