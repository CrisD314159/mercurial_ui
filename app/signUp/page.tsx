'use client'
import { useState } from "react";
import AlertDialog from "../ui/alertCompnent/AlertDialog";
import Image from "next/image";
import { TextField } from "@mui/material";
import PasswordInput from "../ui/creation/PasswordInput";



export default function SignSupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit() {
  }
  return (
      <div className="mainSignUpContainer">
          {<AlertDialog title="Thank you for sign up to Mercurial!!" message="Check your email to verify your account on Mercurial"/> }
          {<AlertDialog title="There was an error with our app!" message={"hola"}/>}
          <div className="backgroundContainer">
              <div className="formContainer">
                  <div className="imageContainer">
                      <Image src="/mercurialLogo.png" alt="" className="imageLogo" width={80} height={80} />
                  </div>
                  <h1 className="formTitle">Sign up to Mercurial</h1>
                  <form
                      action=""
                      className="signUpForm"
                      onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit();
                      }}
                  >
                      <div className="inputsContainers border">
                          <TextField
                              required
                              label="Full Name"
                              variant="outlined"
                              value={name}
                              onChange={(e) => {
                                  setName(e.target.value);
                              }}
                              inputProps={{  minLength: 3, maxLength: 40 }}
                          />
                          <TextField
                              required
                              label="E-mail"
                              type="email"
                              variant="outlined"
                              value={email}
                              onChange={(e) => {
                                  setEmail(e.target.value);
                              }}
                          />
                      </div>

                      <div className="inputsContainers">
                          <TextField
                              required
                              label="Username"
                              variant="outlined"
                              value={username}
                              onChange={(e) => {
                                  setUsername(e.target.value);
                              }}
                              inputProps={{  minLength: 5, maxLength: 30 }}
                          />
                          <PasswordInput password={password} setPassword={setPassword} required></PasswordInput>
                      </div>

                      <button className="signUpButton">Sign Up</button>
                  </form>
              </div>
          </div>
      </div>
  )
}