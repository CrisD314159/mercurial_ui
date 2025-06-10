import { GeneralFormState } from "../types/definitions";
import { CreateSubjectServer, DeleteUserSubjectsServer, GetUserSubjectsServer, UpdateSubjectServer } from "../ServerActions/SubjectActions";
import { CreateSubjectOffline, DeleteUserSubjectsOffline, GetUserSubjectsOffline, UpdateSubjectOffline } from "../OfflineActions/SubjectOfflineActions";
import { checkIsloggedIn } from "../Auth/authChecks";
import { FormRequestInter } from "./FormRequestInter";



export async function CreateSubject(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormRequestInter(CreateSubjectServer, CreateSubjectOffline, formdata, isAuthenticated === 'true')

}
export async function UpdateSubject(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormRequestInter(UpdateSubjectServer, UpdateSubjectOffline, formdata, isAuthenticated === 'true')

}


export async function GetSubjects() {
  const logged = await checkIsloggedIn()

  if(logged){

    return await GetUserSubjectsServer()
    
  }else{
 
    return await GetUserSubjectsOffline()
 
  }
  
}

export async function DeleteSubject(isAuthenticated: boolean, id:string) {

  if(isAuthenticated){
    await DeleteUserSubjectsServer(id)
  }else{
    await DeleteUserSubjectsOffline(id)
  }
  
}
