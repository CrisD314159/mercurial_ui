import { GeneralResponse, LogOutResponse, SignUpFields, SubjectCreationFileds, SubjectCreationResponse, TaskCreationFileds, TaskCreationResponse, TopicCreationFileds, TopicCreationResponse } from "../components/types/types"

export function getImageFromLocalStorage() {
  if (localStorage.getItem('userImage')) {
    return localStorage.getItem('userImage')
  }
  return ''
}


// Api Queries

export async function getTasks() {

  try {
    const response = await fetch('http://localhost:8080/tasks/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}
export async function getDoneTasks() {

  try {
    const response = await fetch('http://localhost:8080/tasks/done/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}

export async function getSubjects() {

  try {
    const response = await fetch('http://localhost:8080/subjects/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}

export async function getTopics() {

  try {
    const response = await fetch('http://localhost:8080/topics/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}


export async function signUp(fields: SignUpFields){
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(fields)

    })


    return response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }

}

export async function logout() : Promise <LogOutResponse>{
  const response = await fetch('http://localhost:8080/logout',{
    method:'POST',
    credentials:'include',
  })

  return response.json()

}


export async function createTask(fields: TaskCreationFileds) : Promise<TaskCreationResponse>{
  try {
    const response = await fetch('http://localhost:8080/tasks',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(fields),
      credentials:'include'

    })
    if(response.status === 401){ 
      // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function deleteTask(taskId:string){
  try {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}`,{
      method:'DELETE',
      credentials:'include'
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function markAsDoneTask(taskId:string): Promise<GeneralResponse> {
  try {
    const response = await fetch(`http://localhost:8080/tasks/mark/done/${taskId}`,{
      method:'PUT',
      credentials:'include'
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }

    return response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
  
}

export async function createSubject(subject:SubjectCreationFileds) : Promise<SubjectCreationResponse> {
  try {
    const response = await fetch('http://localhost:8080/subjects',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(subject),
      credentials:'include'

    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
  
}

export async function createTopic
(topic:TopicCreationFileds) : Promise<TopicCreationResponse>{
try{
  const response = await fetch('http://localhost:8080/topics',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(topic),
    credentials:'include'

  })
  if(response.status === 401){
    throw new Error('Unauthorized')
  }
  return response.json()
} catch (error) {
  throw new Error('There was a error with the API')
  } 
}

export async function markAsRollBackTask(taskId:string): Promise<GeneralResponse>{
  try {
    const response = await fetch(`http://localhost:8080/tasks/mark/rollback/${taskId}`,{
      method:'PUT',
      credentials:'include'
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }
}
