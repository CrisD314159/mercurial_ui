'use server'
import { cookies } from "next/headers";
import { APIURL } from "../types/definitions";
import { AssignmentSchema, AssignmentUpdateSchema } from "../ZodValidations/Assignment/AssingmentValidations";


export async function CreateAssignmentServer(formdata: FormData) {
  
    const token = (await cookies()).get('token')?.value
    const validation = AssignmentSchema.safeParse({
      title:formdata.get('title'),
      subjectId : Number.parseInt(formdata.get('subjectId')?.toString() || '-1'),
      topicId : Number.parseInt(formdata.get('topicId')?.toString() || '-1'),
      noteContent : formdata.get('noteContent')?.toString(),
      dueDate : new Date(formdata.get('dueDate')?.toString() || '0000-00-00T00:00:00Z'),
    })
  
    if(!validation.success){
      console.log(validation.error.toString());
      throw new Error(validation.error.toString())
    }
  
    const {title, subjectId, topicId, noteContent, dueDate} = validation.data
  
    const response = await fetch(`${APIURL}/assignment`, {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({title, subjectId, topicId, noteContent, dueDate})
    })

    if(response.status === 201){
      return {
        success: true,
        message:"Assignment created"
      }
    }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}

export async function UpdateAssignmentServer(formdata: FormData) {
  const token = (await cookies()).get('token')?.value

  const validation = AssignmentUpdateSchema.safeParse({
    id: formdata.get('id'),
    title:formdata.get('title'),
    subjectId : Number.parseInt(formdata.get('subjectId')?.toString() || '-1'),
    topicId : Number.parseInt(formdata.get('topicId')?.toString() || '-1'),
    noteContent : formdata.get('noteContent')?.toString(),
    dueDate : new Date(formdata.get('dueDate')?.toString() || '0000-00-00T00:00:00Z'),
  })
  if(!validation.success){
    throw new Error(validation.error.toString())
  }

  const {id, title, subjectId, topicId, noteContent, dueDate} = validation.data


  const response = await fetch(`${APIURL}/assignment`, {
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({"assignmentId":id, title, subjectId, topicId, noteContent, dueDate})
  })

  if(response.status == 200){
    return {
      success: true,
      message:"Assignment updated"
    }
  }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
  }
}

export async function GetUserTodoAssignmentsServer(offset:number, limit:number) {

    const token = (await cookies()).get('token')?.value
    
    const response = await fetch(`${APIURL}/assignment/todoAssignments?offset=${offset}&limit=${limit}`, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })

    if(response.status == 200){
      const {assignments} = await response.json()
      return assignments
    }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}

export async function GetUserDoneAssignmentsServer(offset:number, limit:number) {

    const token = (await cookies()).get('token')?.value
    
    const response = await fetch(`${APIURL}/assignment/doneAssignments?offset=${offset}&limit=${limit}`, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })

    if(response.status == 200){
      const {assignments} = await response.json()
      return assignments
    }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}

export async function DeleteUserAssignmentsServer(id:string) {

    const token = (await cookies()).get('token')?.value

    const response = await fetch(`${APIURL}/assignment/${id}`, {
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
      },

    })
    if(response.status == 200){
      return {
        success: true,
        message:"Assignment deleted"
      }
    }else{
      const {message} = await response.json()
      throw new Error(message ?? "An unexpected error occurred")
    }
}

export async function MarkAssignmentAsDoneServer(id:string) {

  const token = (await cookies()).get('token')?.value

  const response = await fetch(`${APIURL}/assignment/markAsDone/${id}`, {
    method:'PATCH',
    headers:{
      'Authorization': `Bearer ${token}`,
    },

  })
  if(response.status == 200){
    return {
      success: false,
      message:"Assignment marked as done"
    }
  }else{
    const {message} = await response.json()
    throw new Error(message ?? "An unexpected error occurred")
  }
}

export async function MarkAssignmentAsTodoServer(id:string) {

  const token = (await cookies()).get('token')?.value

  const response = await fetch(`${APIURL}/assignment/markAsTodo/${id}`, {
    method:'PATCH',
    headers:{
      'Authorization': `Bearer ${token}`,
    },

  })
  if(response.status == 200){
    return {
      success: true,
      message:"Assignment marked as done"
    }
  }else{
    const {message} = await response.json()
    throw new Error(message ?? "An unexpected error occurred")
  }
}