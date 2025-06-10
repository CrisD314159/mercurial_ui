import { useMutation } from "@tanstack/react-query"
import { NavLink, useParams } from "react-router-dom"
import { GeneralResponse } from "../../lib/types/types"
import { verifyUser } from "../../lib/utils"
import { useEffect, useState } from "react"
import './verificationPage.css'
import { Button } from "@mui/material"

export default function VerificationPage() {
  const { id } = useParams()
  const [dialogCont,setDialogCont] = useState('')
  const [verified, setVerified] = useState(false)
  const verificationMutation = useMutation<GeneralResponse, Error, string>({
    mutationFn: verifyUser,
    onSuccess:(data:GeneralResponse)=>{
      if(data.success === false) {
        setDialogCont("There was an error with the API, please try again later")

      }else{
        setVerified(true)
      }
    },
    onError:(error:Error)=>{
      setDialogCont(error.message)
    }
  })
  useEffect(()=>{
    if(id){
      verificationMutation.mutate(id)
    }
  }, [])

  if(verified){
    return (
      <div className="verificationContMain">
      <div className="verificationCont">
        <h1 className="verificationTitle">VerificationPage</h1>
        <p className="verificationText">User succesfully verified!!</p>
        <NavLink to="/" className="verificationLink"><Button variant="contained" color="primary">Log In</Button></NavLink>
      </div>
    </div>
    )
    
  }
 return (
    <div className="verificationContMain">
      <div className="verificationCont">
        <h1 className="verificationTitle">VerificationPage</h1>
        <p className="verificationText">{dialogCont}</p>
      </div>
    </div>
 )
}