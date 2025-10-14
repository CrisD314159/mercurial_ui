'use client'
import { startTransition, useActionState, useEffect } from "react"
import './verificationPage.css'
import { Button, TextField } from "@mui/material"
import { VerifyAccountAction } from "@/lib/ServerActions/UserActions"
import Link from "next/link"
import toast from "react-hot-toast"

export default function VerifyAccountPage() {
  const [state, action, pending] = useActionState(VerifyAccountAction, undefined)


  useEffect(()=>{
    if(state && !state.success){
      toast.error(state.message)
    } else if(state && state.success){
      toast.success(state.message)
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