'use server'

import { cookies } from "next/headers"
import { APIURL, GeneralFormState } from "../types/definitions"
import { UpdateUserSchema } from "../ZodValidations/User/UserValidations"
import { Logout } from "../Auth/AuthActions"


export async function GetUserOverview() {
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${APIURL}/user`, {
    method:'GET',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })

  if(response.status === 200){
    const user = await response.json()
    return user
  }
  if(response.status === 500){
    throw new Error("An unexpected error happened")
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}


export async function UpdateUserAction(state:GeneralFormState, formdata: FormData) {

  try {
    const token = (await cookies()).get('token')?.value
    const validations = UpdateUserSchema.safeParse({
      name: formdata.get('name'),
      id: formdata.get('id')
    })
  
    if(!validations.success){
      throw new Error(validations.error.message)
    }
  
    const {name} = validations.data

    const response = await fetch(`${APIURL}/user`, {
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({name})
    })

    if(response.status === 200){
      return {
        success:true,
        message:'User updated'
      }
    }
    if(response.status === 500) throw new Error("An unexpected error happened")

    const {message} = await response.json()
    throw new Error (message)
    
  } catch (error) {

    if(error instanceof Error){
      return{
        success: false,
        errors: error.message
      }
    }
 
  }
}

export async function DeleteUserAction() {
  const token = (await cookies()).get('token')?.value
  const response = await fetch(`${APIURL}/user`, {
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })

  if(response.status === 200){
    await Logout()
  }
  if(response.status === 500){
    throw new Error("An unexpected error happened")
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }
}