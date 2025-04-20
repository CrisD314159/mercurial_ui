'use server'
import { cookies } from "next/headers";
import { APIURL } from "../types/definitions";
import { SubjectSchema, SubjectUpdateSchema } from "../ZodValidations/Subject/SubjectValidations";




export async function CreateSubjectServer(formdata: FormData) {
  
    const token = (await cookies()).get('token')?.value
    const validation = SubjectSchema.safeParse({
      title:formdata.get('title')
    })
  
    if(!validation.success){
      throw new Error(validation.error.toString())
    }
  
    const {title} = validation.data
  
    const response = await fetch(`${APIURL}/subject`, {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({title})
    })

    if(response.status === 201){
      return {
        success: true,
        message:"Subject created"
      }
    }

    if(response.status === 500){
        throw new Error("An unexpected error happend")
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
}

export async function UpdateSubjectServer(formdata: FormData) {
  const token = (await cookies()).get('token')?.value

  const validation = SubjectUpdateSchema.safeParse({
    id:Number.parseInt(formdata.get('id')?.toString() || '-1'),
    title:formdata.get('title')
  })

  if(!validation.success){
    throw new Error(validation.error.toString())
  }

  const {id, title} = validation.data


  const response = await fetch(`${APIURL}/subject`, {
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"subjectId":id, title})
  })

  if(response.status == 200){
    return {
      success: true,
      message:"Subject updated"
    }
  }    
  if(response.status === 500){
    throw new Error("An unexpected error happened")
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
}

export async function GetUserSubjectsServer() {

    const token = (await cookies()).get('token')?.value
    
    const response = await fetch(`${APIURL}/subject?offset=0&limit=15`, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })

    if(response.status == 200){
      const {subjects} = await response.json()
      return subjects
    }
    if(response.status === 500){
      throw new Error("An unexpected error happened")
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
}

export async function DeleteUserSubjectsServer(id:string) {

    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${APIURL}/subject/${id}`, {
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })
    if(response.status == 200){
      return {
        success: false,
        message:"Topic deleted"
      }
    }
    if(response.status === 500){
      throw new Error("An unexpected error happened")
    }else{
      const {message} = await response.json()
      throw new Error(message)
    }
}



