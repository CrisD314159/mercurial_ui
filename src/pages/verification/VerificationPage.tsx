import { useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { GeneralResponse } from "../../components/types/types"
import { verifyUser } from "../../utils/utils"
import { useEffect, useState } from "react"
import './verificationPage.css'

export default function VerificationPage() {
  const { id } = useParams()
  const [dialogCont,setDialogCont] = useState('')
  const verificationMutation = useMutation<GeneralResponse, Error, string>({
    mutationFn: verifyUser,
    onSuccess:(data:GeneralResponse)=>{
      if(data.success === false) {
        setDialogCont("There was an error with the API, please try again later")

      }else{
        setDialogCont("User succesfully verified")
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
 return (
    <div className="verificationContMain">
      <div className="verificationCont">
        <h1 className="verificationTitle">VerificationPage</h1>
        <p className="verificationText">{dialogCont}</p>
      </div>
    </div>
 )
}