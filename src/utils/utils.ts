import { LogOutResponse, SignUpFields } from "../components/types/types"

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