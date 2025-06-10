import { GeneralFormState } from "../types/definitions";
import { CreateSubjectServer, DeleteUserSubjectsServer, GetUserSubjectsServer, UpdateSubjectServer } from "../ServerActions/SubjectActions";
import { CreateSubjectOffline, DeleteUserSubjectsOffline, GetUserSubjectsOffline, UpdateSubjectOffline } from "../OfflineActions/SubjectOfflineActions";
import { checkIsloggedIn } from "../Auth/authChecks";



export async function CreateSubject(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormIntermediary(CreateSubjectServer, CreateSubjectOffline, formdata, isAuthenticated === 'true')

}
export async function UpdateSubject(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormIntermediary(UpdateSubjectServer, UpdateSubjectOffline, formdata, isAuthenticated === 'true')

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