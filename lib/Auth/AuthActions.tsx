'use server'
import { redirect } from "next/navigation";
import { createSession } from "./authChecks";
import { APIURL, FormState, GeneralFormState, isNullOrEmpty } from "../types/definitions";
import { cookies } from "next/headers";
import { SignUpSchema } from "../ZodValidations/User/UserValidations";


export async function Login(formstate: FormState, formdata: FormData) {
  const email = formdata.get('email')?.toString()
  const password = formdata.get('password')?.toString()

  if (isNullOrEmpty(email) || isNullOrEmpty(password)) {
    return {
      message: 'Invalid email or password',
    }
  }

  let response: Response

  try {
    response = await fetch(`${APIURL}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
  } catch (error) {
    return {
      message: 'Could not connect to the server',
      success: false,
    }
  }

  if (response.status === 401) {
    redirect('/verifyAccount')
  }

  if (response.status === 200) {
    const { token, refreshToken } = await response.json()
    await createSession(token, refreshToken)
    redirect('/dashboard')
  }else{
    const {message} = await response.json()
    return {
      message: message,
      success:false
    }
  }

}


export async function SignUp(formstate:GeneralFormState, formdata: FormData) {  
    const validations = SignUpSchema.safeParse({
      name: formdata.get("name"),
      email: formdata.get('email'),
      password: formdata.get('password')
    })

    if(!validations.success){
      return {
        message: "Check your fields and try again",
        success: false
      }
    }

    const {email, name, password} = validations.data
  
  
    let response: Response

    try {
      response = await fetch(`${APIURL}/user`, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, name, password})
      })
      
    } catch (error) {
      return {
        success: false,
        message: "An error occured while trying to connect to server"
      }
    }
  
    if (response.status === 201){
      return {
        message: "Thanks for sing up to Mercurial, check your email and spam folder :)",
        success:true
      }
    }else{
      const {message} = await response.json()
      return {
        message : message ?? "An unexpected error occurred",
        success: false
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
  }else{
    const {message} = await response.json()
    throw new Error(message ?? "An unexpected error occurred")
  }
  
}


