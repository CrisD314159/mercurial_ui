export interface Subject{
  id:number
  title:string
}

export interface Topic{
  id:number
  title:string
  color:string
}

export interface Assignment{
  id?:string
  title: string
  noteId?:number
  noteContent:string
  subjectId:number
  subjectTitle?:string
  topicId:number
  topicTitle?:string
  dueDate?:Date
  taskState?:number
  lastUpdatedAt?:Date
}

export interface Checklist{
  id?:number
  assignmentId:string
  checlistNodes?: ChecklistNode[]
}

export interface ChecklistNode{
  id?:number
  checklistId:number
  content:string
}

