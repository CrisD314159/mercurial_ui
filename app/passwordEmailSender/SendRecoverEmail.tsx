import { useMutation } from "@tanstack/react-query"
import { GeneralResponse } from "../lib/types/types"
import { sendPasswordEmail } from "../lib/utils"
import { useState } from "react"
import { Alert, Button, TextField } from "@mui/material"
import './sendRecoverEmail.css'

export default function SendRecoverEmail() {
  const [email, setEmail]= useState('')
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('There was an error with the email')

  const sendEmailMutation = useMutation<GeneralResponse, Error, string>({
    mutationFn:sendPasswordEmail,
    onSuccess(data:GeneralResponse){
      if(data.success){
        setAlertMessage('Check your email to reset your password')
        setAlert(true)
        setEmail('')
      }else{
        setAlertMessage(data.message)
        setAlert(true)
      }
    },
    onError(error:Error){
      setAlertMessage(error.message)
      setAlert(true)
    }
  })

  const handleSubmit = () =>{
    if(email){
      sendEmailMutation.mutate(email)
    }
  }


  return (
    <div className="mailRecoverMainContainer">
      <div className="mailRecoverContainer">
        {alert && <Alert color="warning"  onClose={()=> setAlert(false)} severity="info">{alertMessage}</Alert>}
        <form className="mailRecoverForm" onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }}>
          <h1 className="mailRecoverTitle">Password Recovery</h1>
          <p className="mailRecovertext">Enter your email to recover your password</p>
          <TextField value={email} variant="outlined" onChange={(e)=> setEmail(e.target.value)} required label="Email"/>
          <div className="recoverButtonContainer">
            <Button type="submit" variant="contained" color="secondary">Send</Button>
          </div>
          
        </form>
      </div>
    </div>
  )
  
}