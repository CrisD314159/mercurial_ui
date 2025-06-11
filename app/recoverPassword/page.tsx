"use client"
import { startTransition, useActionState, useEffect, useState } from "react"
import { Button, TextField } from "@mui/material"
import {RecoverAccountAction} from "@/lib/ServerActions/RecoverAccountActions"
import MercurialSnackbar from "@/ui/Snackbars/MercurialSnackbar"
import Link from "next/link"

export default function RecoverPasswordPage() {
  const [state, action, pending] = useActionState(RecoverAccountAction, undefined)
  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState<'error' | 'success'>('error')


  useEffect(() => {
    if (state && state.success === false) {
      setAlert(true)
    } else if (state && state.success){
      setAlertType('success')
      setAlert(true)
    }
  }, [state])

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)

    startTransition(()=>{
      action(formdata)
    })
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
        <MercurialSnackbar closeMethod={setAlert} message={state?.message ?? "An unexpected error occurred"} state={alert} type={alertType}/>
        <form className="flex flex-col items-center justify-center gap-5" onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-4">Password Recovery</h1>
          <p >Enter your email to recover your password</p>
          <TextField  variant="outlined" name="email" type="email" required label="Email"/>
          <Button type="submit" variant="contained" color="primary" disabled={pending}>Send</Button>
          <Button LinkComponent={Link} href="/" color="secondary" variant="contained" disabled={pending}>Go Back</Button>
        </form>
    </div>
  )
  
}