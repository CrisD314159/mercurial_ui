
import { CreateTopicServer, DeleteUserTopicsServer, GetUserTopicsServer, UpdateTopicServer } from "../ServerActions/TopicActions";
import { CreateTopicOffline, DeleteUserTopicsOffline, GetUserTopicsOffline, UpdateTopicOffline } from "../OfflineActions/TopicOfflineActions";
import { GeneralFormState } from "../types/definitions";



export async function CreateTopic(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormIntermediary(CreateTopicServer, CreateTopicOffline, formdata, isAuthenticated === 'true')

}
export async function UpdateTopic(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormIntermediary(UpdateTopicServer, UpdateTopicOffline, formdata, isAuthenticated === 'true')

}


export async function GetTopics(isAuthenticated: boolean) {

  if(isAuthenticated){

    return await GetUserTopicsServer()
    
  }else{
 
    return await GetUserTopicsOffline()
 
  }
  
}

export async function DeleteTopic(isAuthenticated: boolean, id:number) {

  if(isAuthenticated){
    await DeleteUserTopicsServer(id)
  }else{
    await DeleteUserTopicsOffline(id)
  }
  
}

async function FormIntermediary(onlineMethod: (formdata:FormData) => Promise<{success:boolean ; message:string}>, 
offlineMethod: (formdata:FormData) => Promise<boolean>, formdata: FormData, isAuthenticated:boolean) {
  if(isAuthenticated){
    try {
      await onlineMethod(formdata)
    } catch (error) {
      if (error instanceof Error){
        return {
          success:false,
          errors: error.message
        }  
      }
    }
  }else{
    try { 
      await offlineMethod(formdata)
    } catch (error) {
      return {
        success:false,
        errors: "An unexpected error happend"
      }  
    }
  }
  
}