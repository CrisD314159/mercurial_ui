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