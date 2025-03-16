import { useMutation } from "@tanstack/react-query"
import { NavLink, useParams } from "react-router-dom"
import { GeneralResponse, ResetPasswordFileds, ResetPasswordToken } from "../lib/types/types"
import { useEffect, useState } from "react"
import { getResetToken, resetPassword } from "../lib/utils"
import PasswordInput from "../ui/creation/PasswordInput"
import { Alert, Button, TextField } from "@mui/material"
import './passwordRecover.css'

export default function PasswordRecover() {
  const { id } = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [succes, setSuccess] = useState(false)

  const getTokenMutation = useMutation<ResetPasswordToken, Error, string> ({
    mutationFn:getResetToken,
    onSuccess(data:ResetPasswordToken){
      if(data.success){
        setEmail(data.response.user_email)
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
  const resetPasswordMutation = useMutation<GeneralResponse, Error, ResetPasswordFileds> ({
    mutationFn: resetPassword,
    onSuccess(data:GeneralResponse){
      if(data.success){
        setSuccess(true)
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

  useEffect(()=>{
    if(id){
      getTokenMutation.mutate(id)
    }
  }, [])

  const handleSubmit = ()=>{
    if(password && id && email){
      resetPasswordMutation.mutate({token:id, email:email, password:password})
    }
  }

  if(succes){
    return(
      <div className="passwordRecoverMainContainer">
      <div className="passwordRecoverContainer">
      {alert && <Alert severity="info" color="warning" onClose={()=> setAlert(false)}>{alertMessage}</Alert>}
        <h1 className="passwordRecoverTitle">Reset Password</h1>
        <p>Your password was successfully changed</p>
        <NavLink to="/">
          <Button color="secondary" variant="contained">Log In</Button>
        </NavLink>
        
      </div>
    </div>
    )
  }


  return(
    <div className="passwordRecoverMainContainer">
      <div className="passwordRecoverContainer">
      {alert && <Alert severity="info" color="warning" onClose={()=> setAlert(false)}>{alertMessage}</Alert>}
        <h1 className="passwordRecoverTitle">Reset Password</h1>
        <form onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }} className="passwordRecoverForm">
          <TextField value={email} variant="outlined" label="Email" disabled sx={{m:1, width: '25ch'}}/>
          <PasswordInput password={password} setPassword={setPassword} required/>
          <div className="resetButtonContainer">
            <Button type="submit" color="secondary" variant="contained">Reset</Button>
          </div>
        </form>
        
      </div>
    </div>
  )
  
}