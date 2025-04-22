import { Assignment, Subject, Topic } from './entityTypes';


export interface User{
  id?: number,
  name: string,
  email: string,
  profilePicture: string
}


export interface LoginResponse{
  success: boolean,
  message: string,
  data : LoginData,
  accessToken: string,
  refreshToken: string

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

export interface GeneralResponse{
  success: boolean,
  message: string,
}

export interface SignUpFields{
  name:string,
  email:string,
  username: string,
  password: string
}


export interface TaskCreationFileds{
  title: string,
  description: string,
  subjectId: string,
  topicId: string,
  token: string
}

export interface TaskCreationResponse{
  success: boolean,
  message: string,
  assignment : Assignment

}
export interface SubjectCreationFileds{
  name: string,
  color: string,
  token: string
}

export interface SubjectCreationResponse{
  success: boolean,
  message: string,
  subject: Subject

}

export interface TopicCreationFileds{
  tittle: string,
  color: string,
  token: string
  
}

export interface TopicCreationResponse{
  success: boolean,
  message: string,
  topic: Topic
}

export interface SubjectUpdateFileds{
  id: string,
  name: string,
  color: string,
  token: string
}

export interface TopicUpdateFileds{
  id: string,
  tittle: string,
  color: string,
  token: string
}
export interface TaskUpdateFileds{
  id: string,
  tittle: string,
  description: string,
  token: string
}
export interface TaskUpdateResponse{
  success: boolean,
  message: string,
}

export interface GetUserResponse{
  user: User
}
export interface UserEditFields{
  name: string,
  username:string,
  password?:string ,
  image?: string ,
  token: string
}
export interface ImageResponse{
  success: boolean,
  message:string,
  url:string
}
export interface ResetPasswordFileds{
  token: string,
  email:string,
  password:string
}
export interface ResetPasswordToken{
  success: boolean,
  message: string,
  response: {
    id:string,
    user_id: string,
    user_email: string,
  }
}

export interface RollbackFields {
  taskId: string,
  token: string
}

export interface DeleteTaskFields {
  taskId: string,
  token: string
}
export interface MarkAsDoneFields {
  taskId: string,
  token: string
}
export interface DeleteSubjectFields {
  subjectId: string,
  token: string
}
export interface DeleteTopicFields {
  topicId: string,
  token: string
}
export interface ImageFields {
  image: File,
  token: string
}