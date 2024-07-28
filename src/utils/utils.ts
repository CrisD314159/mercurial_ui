import { DeleteSubjectFields, DeleteTaskFields, DeleteTopicFields, GeneralResponse, GetUserResponse, ImageFields, ImageResponse, LoginCredentials, LoginResponse, LogOutResponse, MarkAsDoneFields, ResetPasswordFileds, ResetPasswordToken, RollbackFields, SignUpFields, SubjectCreationFileds, SubjectCreationResponse, SubjectUpdateFileds, TaskCreationFileds, TaskCreationResponse, TaskDoneList, TaskList, TaskUpdateFileds, TaskUpdateResponse, TopicCreationFileds, TopicCreationResponse, TopicUpdateFileds, UserEditFields} from "../components/types/types"

export function getImageFromLocalStorage() {
  if (localStorage.getItem('userImage')) {
    return localStorage.getItem('userImage')
  }
  return ''
}


// Api Queries

export async function login(credentials: LoginCredentials) : Promise<LoginResponse> {
  try {
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/login',{
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

export async function getTasks(token:string) : Promise<TaskList>{

  try {
    const response = await fetch('http://localhost:8000/tasks/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    console.log(error);
    throw new Error('There was a error with the API')
  }

}
export async function getDoneTasks(token:string) : Promise<TaskDoneList>{

  try {
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/tasks/done/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
     
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

export async function getSubjects(token:string) {

  try {
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/subjects/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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

export async function getTopics(token:string) {

  try {
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/topics/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/users', {
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
  const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/logout',{
    method:'POST',
    credentials:'include',
  })

  return response.json()

}


export async function createTask(fields: TaskCreationFileds) : Promise<TaskCreationResponse>{
  try {
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/tasks',{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${fields.token}`
      },
      body: JSON.stringify(fields),

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

export async function deleteTask(fields: DeleteTaskFields) : Promise<GeneralResponse>{
  try {
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/tasks/${fields.taskId}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${fields.token}`
      }
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

export async function markAsDoneTask(fields: MarkAsDoneFields): Promise<GeneralResponse> {
  try {
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/tasks/mark/done/${fields.taskId}`,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${fields.token}`
      }
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
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/subjects',{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${subject.token}`
      },
      body: JSON.stringify(subject),

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
  const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/topics',{
    method:'POST',
    headers:{
      'content-type':'application/json',
        'Authorization': `Bearer ${topic.token}`
    },
    body: JSON.stringify(topic),

  })
  if(response.status === 401){
    throw new Error('Unauthorized')
  }
  return response.json()
} catch (error) {
  throw new Error('There was a error with the API')
  } 
}

export async function markAsRollBackTask(fields: RollbackFields): Promise<GeneralResponse>{
  try {
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/tasks/roll/back/${fields.taskId}`,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${fields.token}`
      }
   
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }
}

export async function deleteSubject(fields: DeleteSubjectFields) : Promise<GeneralResponse>{
  try {
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/subjects/${fields.subjectId}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${fields.token}`
      }
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }
  
}
export async function deleteTopic(fields: DeleteTopicFields) : Promise<GeneralResponse>{
  try {
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/topics/${fields.topicId}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${fields.token}`
      }
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
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/subjects/${subject.id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${subject.token}`
      },
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
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/topics/${topic.id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${topic.token}`
      },
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
    const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/tasks/${task.id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${task.token}`
      },
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

export async function getUser(token:string) : Promise<GetUserResponse>{
  try {
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/users',{
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}
export async function deleteUser(token:string) : Promise<GeneralResponse>{
  try {
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/users',{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`
      }
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
    const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/users',{
      method:'PUT',
      credentials:'include',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${user.token}`
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

export async function uploadImage(fields: ImageFields) : Promise<ImageResponse>{

  try{
      const formData = new FormData();
      formData.append('image', fields.image);
      const response = await fetch('https://star-api-production.up.railway.app/images/upload',{
          method:'POST',
          body:formData,
          headers:{
            'Authorization': `Bearer ${fields.token}`
          }
      })
      if(response.status === 401){
          throw new Error('Unauthorized')
      }
      return response.json()

  }catch(error){
      throw new Error("There was an error with the API")
  }
}

export async function verifyUser(id:string) : Promise<GeneralResponse>{
  try{
      const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/users/account/verify/${id}`,{
          method:'PUT',
      })
    
      return response.json()

  }catch(error){
      throw new Error("There was an error with the API")
  }
}
export async function sendPasswordEmail(email:string) : Promise<GeneralResponse>{
  try{
      const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/users/password/change/email',{
          method:'POST',
          headers:{
              'content-type':'application/json'
          },
          body:JSON.stringify({email})
      })
    
      return response.json()

  }catch(error){
      throw new Error("There was an error with the API")
  }
}

export async function resetPassword(fields:ResetPasswordFileds) : Promise<GeneralResponse>{
  try{
      const response = await fetch('https://stupid-galina-mercurial-80e3a007.koyeb.app/users/password/change',{
          method:'PUT',
          headers:{
              'content-type':'application/json'
          },
          body:JSON.stringify(fields)
      })
    
      return response.json()

  }catch(error){
      throw new Error("There was an error with the API")
  }
}
export async function getResetToken(token:string) : Promise<ResetPasswordToken>{
  try{
      const response = await fetch(`https://stupid-galina-mercurial-80e3a007.koyeb.app/users/password/change/${token}`,{
          method:'GET'
      })
      return response.json()

  }catch(error){
      throw new Error("There was an error with the API")
  }
}