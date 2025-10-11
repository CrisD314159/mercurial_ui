"use client"
import { startTransition, useActionState, useEffect } from "react"
import { Button, TextField } from "@mui/material"
import {RecoverAccountAction} from "@/lib/ServerActions/RecoverAccountActions"
import Link from "next/link"
import toast from "react-hot-toast"

export default function RecoverPasswordPage() {
  const [state, action, pending] = useActionState(RecoverAccountAction, undefined)



  useEffect(()=>{
    if(state && !state.success){
      toast.error(state.message)
    } else if(state && state.success){
      toast.success(state.message)
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