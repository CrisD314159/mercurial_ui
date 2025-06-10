'use client'
import { startTransition, useActionState, useEffect, useState } from "react"
import PasswordInput from "../../ui/Creation/PasswordInput"
import {Button, TextField } from "@mui/material"
import './passwordRecover.css'
import { ChangePasswordAction } from "@/lib/ServerActions/RecoverAccountActions"
import MercurialSnackbar from "@/ui/Snackbars/MercurialSnackbar"
import { useSearchParams } from "next/navigation"

export default function ChangePassword() {
  const searchParams = useSearchParams()
  const changeToken = searchParams.get('changeToken')
  const [alert, setAlert] = useState(false)
  const [password, setPassword] = useState('')
  const [state, action, pending] = useActionState(ChangePasswordAction, undefined)
  const [alertType, setAlertType] = useState<'error'| 'success'>('error')



  useEffect(()=>{
    if(state && state.success === false){
      setAlert(true)
    }else if(state  && state.success){
      setAlertType("success")
      setAlert(true)
    }
  }, [state])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    formdata.append('password', password)
    formdata.append('code', changeToken ?? "No token provided")

    startTransition(()=>{
      action(formdata)
    })
  }


  return(
    <div className="w-full h-full flex items-center justify-center">
      <MercurialSnackbar closeMethod={setAlert} message={state?.message ?? "An unexpected error occurred"} state={alert} type={alertType}/>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl">Reset Password</h1>
          <TextField name="email" variant="outlined" required label="Email" sx={{m:1, width: '25ch'}}/>
          <PasswordInput password={password} setPassword={setPassword} required/>
          <Button type="submit" color="primary" variant="contained" disabled={pending}>Reset</Button>
        </form>
    </div>
  )
  
}