'use server'
import { redirect } from "next/navigation";
import { createSession } from "./authChecks";
import { APIURL, FormState, GeneralFormState, isNullOrEmpty } from "../types/definitions";
import { cookies } from "next/headers";
import { SignUpSchema } from "../ZodValidations/User/UserValidations";




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
export async function SignUp(formstate:GeneralFormState, formdata: FormData) {
  try {
  
    const validations = SignUpSchema.safeParse({
      name: formdata.get("name"),
      email: formdata.get('email'),
      password: formdata.get('password')
    })

    if(!validations.success){
      throw new Error("Check your fields and try again")
    }

    const {email, name, password} = validations.data
  
  
    const response = await fetch(`${APIURL}/user`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, name, password})
    })
  
    if (response.status === 200){
      return {
        success:true
      }
    }
  
    if( response.status === 500){
      throw new Error("An unexpected error occured")
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
    
  } catch (error) {
    if( error instanceof Error){
      return {
        success: false,
        errors: error.message
      }
    }
    
  }

  
}

export async function Logout() {
  const refreshToken = (await cookies()).get('refresh')?.value

  const response = await fetch(`${APIURL}/account/logout`, {
    method:'DELETE',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({'refreshToken':refreshToken})
  })

  console.log(response.status);
  if(response.status === 200 || response.status === 404){
    (await cookies()).delete('refresh')
    ;(await cookies()).delete('token')
    redirect('/')
  }

  if(response.status === 500){
    throw new Error('An unexpected error happened')
  }else{
    const {message} = await response.json()
    console.log(message);
    throw new Error(message)
  }
  
}


