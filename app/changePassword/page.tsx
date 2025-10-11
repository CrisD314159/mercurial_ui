'use client'
import { startTransition, Suspense, useActionState, useEffect, useState } from "react"
import PasswordInput from "../../ui/Creation/PasswordInput"
import {Button, CircularProgress, TextField } from "@mui/material"
import { ChangePasswordAction } from "@/lib/ServerActions/RecoverAccountActions"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"

 function ChangePasswordPage() {
  const searchParams = useSearchParams()
  const changeToken = searchParams.get('changeToken')
  const [password, setPassword] = useState('')
  const [state, action, pending] = useActionState(ChangePasswordAction, undefined)

  useEffect(()=>{
    if(state && state.success === false){
      toast.error(state.message)
    }else if(state  && state.success){
      toast.success(state.message)
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
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl">Reset Password</h1>
          <TextField name="email" variant="outlined" type="email" required label="Email" sx={{m:1, width: '25ch'}}/>
          <PasswordInput password={password} setPassword={setPassword} required/>
          <Button type="submit" color="primary" variant="contained" disabled={pending}>Reset</Button>
          <Button LinkComponent={Link} href="/" color="secondary" variant="contained" disabled={pending}>Go Back</Button>
        </form>
    </div>
  )
  
}

export default function Wrapper() {
  return (
    <Suspense fallback={<CircularProgress color="primary"/>}>
      <ChangePasswordPage />
    </Suspense>
  )
}