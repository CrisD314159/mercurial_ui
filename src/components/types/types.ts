export interface Subject{
  id: number,
  name: string,
  state: string,
  user_id: number
  
}

export interface Task{
  id: number,
  title: string,
  description: string,
  state: string,
  subject_id: number,
  topic_id: number
}

export interface Topic{
  id: number,
  title: string
  color: string
}

export interface User{
  id: number,
  name: string,
  email: string,
  password: string
  picture: string
}


export interface LoginResponse{
  success: boolean,
  message: string,
  data : LoginData

}

export interface LoginData{
  userEmail: string,
  userImage: string
}

export interface LoginCredentials{
  email: string,
  password: string
}

export interface LogOutResponse{
  success: boolean,
  message: string,
}