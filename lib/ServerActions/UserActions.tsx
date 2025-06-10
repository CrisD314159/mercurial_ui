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
  }else{
    const {message} = await response.json()
    return{
      success: false,
      message: message ?? "An unexpected error occurred"
    }
  }
}


export async function UpdateUserAction(state:GeneralFormState, formdata: FormData) {

    const token = (await cookies()).get('token')?.value
    const validations = UpdateUserSchema.safeParse({
      name: formdata.get('name'),
      id: formdata.get('id')
    })
  
    if(!validations.success){
      return {
        message: "Check your inputs and try again",
        success: false
      }
    }
  
    const {name} = validations.data

    let response : Response
    try {
      response = await fetch(`${APIURL}/user`, {
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({name})
    })
    } catch (error) {
      return {
        message: "An error occured while trying to connect server",
        success: false
      }
      
    }
    if(response.status === 200){
      return {
        success:true,
        message:'User updated'
      }
    }

    const {message} = await response.json()
    return{
      success: false,
      message: message ?? "An unexpected error occurred"
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
  }else{
    const {message} = await response.json()
    return{
      success: false,
      message: message ?? "An unexpected error occurred"
    }
  }
}