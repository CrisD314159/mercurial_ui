'use client'
import { startTransition, useActionState, useState } from "react";
import AlertDialog from "../ui/alertCompnent/AlertDialog";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import PasswordInput from "../ui/creation/PasswordInput";
import { SignUp } from "../lib/serverActions/PostActions";
import Link from "next/link";

export default function SignUpPage() {
  const [password, setPassword] = useState('');
  const [state, action, pending] = useActionState(SignUp, undefined)


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.append('password', password)

    startTransition(()=>{
        action(formData)
    })
  }
  return (
      <div className="h-full w-full flex items-center justify-center">
          {state?.success && <AlertDialog title="Thank you for sign up to Mercurial!!" message="Check your email to verify your account on Mercurial"/> }
          {state?.success == false && <AlertDialog title="There was an error with our app!" message={"hola"}/>}
              <div className="w-[60%] h-[80%] flex flex-col gap-5 items-center">
                <Image src="/mercurialLogo.png" alt="" className="imageLogo" width={80} height={80} />
                <h1 className="text-slate-50 text-2xl">{"Just a few more steps"}</h1>
                <form
                      className="flex flex-col gap-4 items-center"
                      onSubmit={handleSubmit}
                  >
                          <TextField
                              required
                              label="Full Name"
                              variant="outlined"
                              name="name"
                              inputProps={{  minLength: 3, maxLength: 40 }}
                          />
                          <TextField
                              required
                              label="E-mail"
                              type="email"
                              variant="outlined"
                              name="email"
                          />

                          <PasswordInput password={password} setPassword={setPassword} required></PasswordInput>


                      <Button type="submit" variant="contained" disabled={pending} className="signUpButton">Sign Up</Button>
                      <Link href={'/'} className="text-slate-50 mt-4">Back to login</Link>
                  </form>
              </div>
      </div>
  )
}