'use client'
import { startTransition, useActionState, useEffect, useState } from "react"
import './verificationPage.css'
import { Button, TextField } from "@mui/material"
import { VerifyAccountAction } from "@/lib/ServerActions/UserActions"
import Link from "next/link"
import MercurialSnackbar from "@/ui/Snackbars/MercurialSnackbar"

export default function VerifyAccountPage() {
  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState<'error' | 'success'>('error')
  const [state, action, pending] = useActionState(VerifyAccountAction, undefined)


  useEffect(()=>{
    if(state && !state.success){
      setAlert(true)
    } else if(state && state.success){
      setAlertType('success')
      setAlert(true)
    }
  }, [state])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)

    startTransition(()=>{
      action(formdata)
    })
  } 
  useEffect(()=>{

  }, [])

 return (
    <div className="w-full h-full flex items-center justify-center">
    <MercurialSnackbar closeMethod={setAlert} message={state?.message ?? "An unexpected error occurred"} state={alert} type={alertType} /> 
      
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5">
      <h1 className="verificationTitle">VerificationPage</h1>
      <TextField name="email" variant="outlined" required label="Email" sx={{m:1, width: '25ch'}}/>
      <TextField name="code" variant="outlined" required label="Code" sx={{m:1, width: '25ch'}}/>

      <Button type="submit" color="primary" variant="contained" disabled={pending}>Verify Account</Button>
      <Button LinkComponent={Link} href="/" color="secondary" variant="contained" disabled={pending}>Go back</Button>
      </form>
      
    </div>
 )
}