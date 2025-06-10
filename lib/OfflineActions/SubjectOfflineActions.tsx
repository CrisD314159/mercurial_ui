import { SubjectSchema, SubjectUpdateSchema } from "../ZodValidations/Subject/SubjectValidations"
import { db } from "./Db/db"



export async function CreateSubjectOffline(formdata: FormData) {  
    const validation = SubjectSchema.safeParse({
      title:formdata.get('title')
    })
  
    if(!validation.success){
      throw new Error( validation.error.toString())
    }
  
    const {title} = validation.data
  
   db.subjects.add({title})
    return true
  
}

export async function UpdateSubjectOffline(formdata: FormData) {

  const validation = SubjectUpdateSchema.safeParse({
    id:Number.parseInt(formdata.get('id')?.toString() || '-1'),
    title:formdata.get('title')
  })

  if(!validation.success){
    throw new Error( validation.error.toString())
  }

  const {id, title} = validation.data

  if(id == -1){
    throw new Error ("Cannot update Subject, invalid id")
  }

   db.subjects.update(id, { title })
  return true
  
  
}

export async function GetUserSubjectsOffline() {
  const subjects = db.subjects.toArray()
  return subjects
}

export async function DeleteUserSubjectsOffline(id:string) {
  const subjectId = Number.parseInt(id)
  if(!IsSubjectWithoutAssignments(subjectId)) throw new Error("Subject has assigments already")
  db.subjects.delete(subjectId)
  return true 
}

async function IsSubjectWithoutAssignments(id:number) {
  const tasks = await db.assignments.where('subjectId').equals(id).toArray()
  if(tasks.length > 0){
    return false
  }
  return true
  
}