'use server'
import { cookies } from "next/headers";
import { APIURL, isNullOrEmpty } from "../types/definitions";




export async function CreateSubjectServer(formdata: FormData) {
    const title = formdata.get('title')?.toString()
    const token = (await cookies()).get('token')?.value
    if(isNullOrEmpty(title)){
      return {
        success: false,
        error :'Check your input and try again'
      }
    }

    const response = await fetch(`${APIURL}/subject`, {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({title})
    })

    if(response.status == 201){
      return {
        success: true,
        message:"Subject created"
      }
    }else{
      return {
        success: false,
        message:"An error occured"
      }
    }
}

export async function UpdateSubjectServer(formdata: FormData) {
    const title = formdata.get('title')?.toString()
    const token = (await cookies()).get('token')?.value
    if(isNullOrEmpty(title)){
      return {
        success: false,
        error :'Check your input and try again'
      }
    }

    const response = await fetch(`${APIURL}/subject`, {
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({title})
    })

    console.log(response.status);
    if(response.status == 200){
      return {
        success: true,
        message:"Subject created"
      }
    }else{
      return {
        success: false,
        message:"An error occured"
      }
    }
}

export async function GetUserSubjectsServer() {

    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${APIURL}/subject?offset=0&limit=10`, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })

    if(response.status == 200){
      const {topics} = await response.json()
      return topics
    }else{
      return {
        success: false,
        message:"An error occured"
      }
    }
}

export async function DeleteUserSubjectsServer(id:number) {

    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${APIURL}/subject/${id}`, {
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })
    if(response.status == 200){
      return {
        success: true,
        message:"Subject eliminated"
      }
    }else{
      return {
        success: false,
        message:"An error occured"
      }
    }
}



