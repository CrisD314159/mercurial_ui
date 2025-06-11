import { TopicSchema, TopicUpdateSchema } from "../ZodValidations/Topic/TopicValidations"
import { db } from "./Db/db"



export async function CreateTopicOffline(formdata: FormData) {  
    const validation = TopicSchema.safeParse({
      title:formdata.get('title'),
      color: formdata.get('color')
    })
  
    if(!validation.success){
      throw new Error( validation.error.toString())
    }
  
    const {title, color} = validation.data
  
   db.topics.add({title, color})
    return true
  
}

export async function UpdateTopicOffline(formdata: FormData) {

  const validation = TopicUpdateSchema.safeParse({
    id:Number.parseInt(formdata.get('id')?.toString() || '-1'),
    title:formdata.get('title'),
    color: formdata.get('color')
  })

  if(!validation.success){
    throw new Error( validation.error.toString())
  }

  const {id, title, color} = validation.data

  if(id == -1){
    throw new Error ("Cannot update topic, invalid id")
  }

   db.topics.update(id, { title, color })
  return true
  
  
}

export async function GetUserTopicsOffline() {
  const topics = db.topics.toArray()
  return topics
}

export async function DeleteUserTopicsOffline(id:string) {
  const topicId = Number.parseInt(id)
  if(!IsTopicWithoutAssignments(topicId)) throw new Error("Topic has assigments alredy")
  db.topics.delete(topicId)
  return true 
}

async function IsTopicWithoutAssignments(id:number) {
  const tasks = await db.assignments.where('topicId').equals(id).toArray()
  if(tasks.length > 0){
    return false
  }
  return true
  
}