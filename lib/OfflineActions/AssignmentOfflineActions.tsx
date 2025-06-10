import { AssignmentSchema, AssignmentUpdateSchema } from "../ZodValidations/Assignment/AssingmentValidations";
import { db } from "./Db/db";
import { v4 as uuidv4 } from 'uuid';


export async function CreateAssignmentOffline(formdata: FormData) {
  
    const validation = AssignmentSchema.safeParse({
      title:formdata.get('title'),
      subjectId : Number.parseInt(formdata.get('subjectId')?.toString() || '-1'),
      topicId : Number.parseInt(formdata.get('topicId')?.toString() || '-1'),
      noteContent : formdata.get('noteContent')?.toString() || '',
      dueDate : new Date(formdata.get('dueDate')?.toString() || '0000-00-00T00:00:00Z'),
    })
  
    if(!validation.success){
      throw new Error(validation.error.toString())
    }
  
    const {title, subjectId, topicId, noteContent, dueDate} = validation.data

    const subject = await db.subjects.get(subjectId)
    const topic = await db.topics.get(topicId)
    
    const id = uuidv4()
  
    db.assignments.add({id, title, subjectId, subjectTitle: subject?.title, topicId, topicTitle: topic?.title, topicColor: topic?.color ?? '', noteContent, dueDate, "taskState": 0}) // 0 represents 'todo'
    return true
} 


export async function UpdateAssignmentOffline(formdata: FormData) {
  
  const validation = AssignmentUpdateSchema.safeParse({
    id: formdata.get('id'),
    title:formdata.get('title'),
    subjectId : Number.parseInt(formdata.get('subjectId')?.toString() || '-1'),
    topicId : Number.parseInt(formdata.get('topicId')?.toString() || '-1'),
    noteContent : formdata.get('noteContent')?.toString() || '',
    dueDate : new Date(formdata.get('dueDate')?.toString() || '0000-00-00T00:00:00Z'),
  })
  if(!validation.success){
    throw new Error(validation.error.toString())
  }

  const {id, title, subjectId, topicId, noteContent, dueDate} = validation.data

  const subject = await db.subjects.get(subjectId)
  const topic = await db.topics.get(topicId)



  await db.assignments.update(id.toString(), {title, subjectId, subjectTitle: subject?.title, topicId, topicTitle: topic?.title, topicColor: topic?.color, noteContent, dueDate}) // Assuming 0 represents 'todo'
  return true

}

export async function GetUserTodoAssignmentsOffline() {

  const assignments = await db.assignments.where('taskState').equals(0).toArray()
  return assignments
}

export async function GetUserDoneAssignmentsOffline() {
  const assignments = db.assignments.where('taskState').equals(1).toArray()
  return assignments
}

export async function DeleteUserAssignmentsOffline(id:string) {
  const assignments = db.assignments.delete(id)
  return assignments
}

export async function MarkAssignmentAsDoneOffline(id:string) {
  db.assignments.update(id, {"taskState":1})
  return true
}
export async function MarkAssignmentAsTodoOffline(id:string) {
  db.assignments.update(id, {"taskState":0})
  return true
}