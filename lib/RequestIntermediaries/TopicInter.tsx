
import { CreateTopicServer, DeleteUserTopicsServer, GetUserTopicsServer, UpdateTopicServer } from "../ServerActions/TopicActions";
import { CreateTopicOffline, DeleteUserTopicsOffline, GetUserTopicsOffline, UpdateTopicOffline } from "../OfflineActions/TopicOfflineActions";
import { GeneralFormState } from "../types/definitions";
import { checkIsloggedIn } from "../Auth/authChecks";
import { FormRequestInter } from "./FormRequestInter";



export async function CreateTopic(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormRequestInter(CreateTopicServer, CreateTopicOffline, formdata, isAuthenticated === 'true')

}
export async function UpdateTopic(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormRequestInter(UpdateTopicServer, UpdateTopicOffline, formdata, isAuthenticated === 'true')

}


export async function GetTopics() {
  const logged = await checkIsloggedIn()
  if(logged){

    return await GetUserTopicsServer()

  }else{

    return await GetUserTopicsOffline()

  }
  
}

export async function DeleteTopic(isAuthenticated: boolean, id:string) {

  if(isAuthenticated){
    await DeleteUserTopicsServer(id)
  }else{
    await DeleteUserTopicsOffline(id)
  }
  
}
