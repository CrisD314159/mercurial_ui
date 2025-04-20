'use client'
import { Login } from "@/app/lib/ServerActions/AuthActions"
import { Alert, Button, TextField } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { startTransition, useActionState, useState } from "react"




export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, action, pending ] = useActionState(Login, undefined)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)

    startTransition(()=>{
      action(formdata)
    })

  }
  return (
    <div className="h-full w-full flex justify-center items-center relative">
      <div className="w-[60%] h-[80%]">
        <div className="flex flex-col items-center gap-10 pt-6" > 
            <Image src="/mercurialLogo.png" alt=""width={80} height={80} />
        
          <h1 className="text-2xl">Welcome to Mercurial</h1>
          <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
            <TextField required label="E-mail" variant="outlined" type="email" name="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
            <TextField required label="Password" type="password" variant="outlined" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button className="loginButton" variant="contained" type="submit" disabled={pending}>Log In</Button>
            <Link href="/signUp">Sign Up</Link>
            <Link href="/users/recover/password/email">Forgot your password?</Link>
            <Button LinkComponent={Link} color="info" sx={{marginTop:'20px'}} href="/dashboard">Continue without an account</Button>
            {state?.success == false && <Alert  severity="warning" sx={{m:2}} >{state.message}</Alert>}

          </form>
        </div>
      </div>
      <footer className="absolute bottom-0">Created with ❤️ by 
        <a href="https://www.linkedin.com/in/cristian-david-vargas-loaiza-982314271/" className="loginLink"> Cristian David Vargas </a></footer>
    </div>
  )

}