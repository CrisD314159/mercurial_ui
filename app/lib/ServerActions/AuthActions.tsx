'use server'
import { redirect } from "next/navigation";
import { createSession } from "../Auth/authChecks";
import { APIURL, FormState, isNullOrEmpty } from "../types/definitions";




export async function Login(formstate:FormState, formdata: FormData) {
  const email = formdata.get('email')?.toString()
  const password = formdata.get('password')?.toString()

  if(isNullOrEmpty(email) || isNullOrEmpty(password)) {
    return {
      message: "Invalid email or password"
    }
  }


  const response = await fetch(`${APIURL}/account/login`, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  console.log(response.status);

  if(response.status === 401){
    redirect('/verifyAccount')
  }

  if (response.status === 200){
    const {token, refreshToken} = await response.json()
    await createSession(token, refreshToken)
    redirect('/dashboard')
  }else{
    return {
      message:'Error fetching the data',
      success: false
    }
  }

  
}
export async function SignUp(formstate:FormState, formdata: FormData) {
  const email = formdata.get('email')?.toString()
  const password = formdata.get('password')?.toString()
  const fullname = formdata.get("name")?.toString()

  if(isNullOrEmpty(email) || isNullOrEmpty(password) || isNullOrEmpty(fullname)) {
    return {
      message: "Invalid Fields"
    }
  }


  const response = await fetch(`${APIURL}/user`, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })

  if (response.status === 200){
    const data = await response.json()
    return {
      data,
      success:true
    }
  }

  return {
    message:'Error fetching the data',
    success: false
  }
  
}


