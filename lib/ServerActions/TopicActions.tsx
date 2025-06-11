'use server'
import { cookies } from "next/headers";
import { APIURL } from "../types/definitions";
import { TopicSchema, TopicUpdateSchema } from "../ZodValidations/Topic/TopicValidations";




export async function CreateTopicServer(formdata: FormData) {
  
    const token = (await cookies()).get('token')?.value
    const validation = TopicSchema.safeParse({
      title:formdata.get('title'),
      color: formdata.get('color')
    })
  
    if(!validation.success){
      throw new Error(validation.error.toString())
    }
  
    const {title, color} = validation.data
  
    const response = await fetch(`${APIURL}/topic`, {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({title, color})
    })

    if(response.status === 201){
      return {
        success: true,
        message:"Topic created"
      }
    }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}

export async function UpdateTopicServer(formdata: FormData) {
  const token = (await cookies()).get('token')?.value

  const validation = TopicUpdateSchema.safeParse({
    id:Number.parseInt(formdata.get('id')?.toString() || '-1'),
    title:formdata.get('title'),
    color: formdata.get('color')
  })

  if(!validation.success){
    throw new Error(validation.error.toString())
  }

  const {id, title, color} = validation.data


  const response = await fetch(`${APIURL}/topic`, {
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"topicId":id, title, color})
  })

  if(response.status == 200){
    return {
      success: true,
      message:"Topic updated"
    }
  }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}

export async function GetUserTopicsServer() {

    const token = (await cookies()).get('token')?.value
    
    const response = await fetch(`${APIURL}/topic?offset=0&limit=10`, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })

    if(response.status == 200){
      const {topics} = await response.json()
      return topics
    }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}

export async function DeleteUserTopicsServer(id:string) {

    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${APIURL}/topic/${id}`, {
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })
    if(response.status == 200){
      return {
        success: true,
        message:"Topic deleted"
      }
    }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}



