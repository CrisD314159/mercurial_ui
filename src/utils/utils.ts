import { GeneralResponse, GetUserResponse, ImageResponse, LoginCredentials, LoginResponse, LogOutResponse, SignUpFields, SubjectCreationFileds, SubjectCreationResponse, SubjectUpdateFileds, TaskCreationFileds, TaskCreationResponse, TaskUpdateFileds, TaskUpdateResponse, TopicCreationFileds, TopicCreationResponse, TopicUpdateFileds, UserEditFields} from "../components/types/types"

export function getImageFromLocalStorage() {
  if (localStorage.getItem('userImage')) {
    return localStorage.getItem('userImage')
  }
  return ''
}


// Api Queries

export async function login(credentials: LoginCredentials) : Promise<LoginResponse> {
  try {
    const response = await fetch('http://localhost:8080/login',{
      method:'POST', // método de la petición
      headers: {
        'Content-Type': 'application/json' // cabecera de la petición
      },
      credentials:'include', // incluir cookies en la petición, para poder recibir la cookie de sesión desde la API
      body: JSON.stringify(credentials) // cuerpo de la petición, convertimos el objeto a JSON usando JSON.stringify()
    })
    return response.json() // retornamos la respuesta en formato JSON
    
  } catch (error) {
    throw new Error('There was a error with the API') // lanzamos un error si la respuesta de la API no es correcta
    
  }
  


}

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
    const response = await fetch(`http://localhost:8080/tasks/roll/back/${taskId}`,{
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

export async function deleteSubject(id:string) : Promise<GeneralResponse>{
  try {
    const response = await fetch(`http://localhost:8080/subjects/${id}`,{
      method:'DELETE',
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
export async function deleteTopic(id:string) : Promise<GeneralResponse>{
  try {
    const response = await fetch(`http://localhost:8080/topics/${id}`,{
      method:'DELETE',
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

export async function updateSubject(subject: SubjectUpdateFileds) : Promise<SubjectCreationResponse>{
  try {
    const response = await fetch(`http://localhost:8080/subjects/${subject.id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify(subject)
    })

    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function updateTopic(topic: TopicUpdateFileds) : Promise<TopicCreationResponse>{
  try {
    const response = await fetch(`http://localhost:8080/topics/${topic.id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify(topic)
    })

    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}
export async function updateTask(task: TaskUpdateFileds) : Promise<TaskUpdateResponse>{
  try {
    const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify(task)
    })

    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function getUser() : Promise<GetUserResponse>{
  try {
    const response = await fetch('http://localhost:8080/users',{
      method:'GET',
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
export async function deleteUser() : Promise<GeneralResponse>{
  try {
    const response = await fetch('http://localhost:8080/users',{
      method:'DELETE',
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
export async function updateUser(user:UserEditFields ) : Promise<GeneralResponse>{
  try {
    const response = await fetch('http://localhost:8080/users',{
      method:'PUT',
      credentials:'include',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(user),
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function uploadImage(image:File) : Promise<ImageResponse>{

  try{
      const formData = new FormData();
      formData.append('image', image);
      const response = await fetch('https://star-api-production.up.railway.app/images/upload',{
          method:'POST',
          body:formData,
      })
      if(response.status === 401){
          throw new Error('Unauthorized')
      }
      return response.json()

  }catch(error){
      throw new Error("There was an error with the API")
  }
 
 
}