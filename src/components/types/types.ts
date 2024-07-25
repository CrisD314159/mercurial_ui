import { Topic } from '@mui/icons-material';
export interface Subject{
  id: string,
  name: string,
  color: string,
  state_id: string,
  state_name:string,
  user_id: string,
  user_name: string,
}

export interface Task{
  id: string,
  tittle: string,
  description: string,
  stateid: string,
  statename: string,
  subjectid: string,
  subjectname:string,
  topicid: string,
  topictittle: string,
  topiccolor: string,
}

export interface Topic{
  id: string,
  tittle: string,
  usuario_id: string,
  state:string,
  color: string
}

export interface User{
  id: number,
  name: string,
  email: string,
  username: string,
  password: string
  image: string
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

export interface TaskList{
  success: boolean,
  message: string,
  tasksUser: Task[]

}
export interface TaskDoneList{
  tasks: Task[]

}
export interface SubjectList{
  success: boolean,
  subjects: Subject[]

}
export interface TopicList{
  success: boolean,
  topic: Topic[]

}

export interface TaskCreationFileds{
  "tittle": string,
  "description": string,
  "subjectId": string,
  "topicId": string
}

export interface TaskCreationResponse{
  success: boolean,
  message: string,
  task: Task

}
export interface SubjectCreationFileds{
  "name": string,
  "color": string
}

export interface SubjectCreationResponse{
  success: boolean,
  message: string,
  subject: Subject

}

export interface TopicCreationFileds{
  "tittle": string,
  "color": string
  
}

export interface TopicCreationResponse{
  success: boolean,
  message: string,
  topic: Topic
}

export interface SubjectUpdateFileds{
  id: string,
  name: string,
  color: string
}

export interface TopicUpdateFileds{
  id: string,
  tittle: string,
  color: string
}
export interface TaskUpdateFileds{
  id: string,
  tittle: string,
  description: string
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
  password:string
}