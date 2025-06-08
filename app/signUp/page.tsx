'use client'
import { startTransition, useActionState, useState } from "react";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import PasswordInput from "../ui/Creation/PasswordInput";
import Link from "next/link";
import MercurialSnackbar from "../ui/Snackbars/MercurialSnackbar";
import { SignUp } from "../lib/Auth/AuthActions";

export default function SignUpPage() {
  const [password, setPassword] = useState('');
  const [state, action, pending] = useActionState(SignUp, undefined)
  const [alert, setAlert] = useState(state?.errors ? true : false);


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
                {
                    state?.errors && <MercurialSnackbar message={state.errors} state={alert} type="error" closeMethod={setAlert} />
                }
                {
                    state?.success && <MercurialSnackbar message={"Thanks for signed up in Mercurial, please proceed to log in"} state={alert} type="success" closeMethod={setAlert} />
                }
              <div className="w-[60%] h-[80%] flex flex-col gap-5 items-center">
                <Image src="/mercurialLogo.png" alt="" className="imageLogo" width={80} height={80} />
                <h1 className="text-2xl">{"Just a few more steps"}</h1>
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
                      <Link href={'/'} className=" mt-4">Back to login</Link>
                  </form>
              </div>
      </div>
  )
}