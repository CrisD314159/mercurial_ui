import { GeneralFormState } from "../types/definitions";
import { checkIsloggedIn } from "../Auth/authChecks";
import { CreateAssignmentServer, DeleteUserAssignmentsServer, GetUserDoneAssignmentsServer, GetUserTodoAssignmentsServer, MarkAssignmentAsDoneServer, MarkAssignmentAsTodoServer, UpdateAssignmentServer } from "../ServerActions/AssignmentActions";
import { CreateAssignmentOffline, DeleteUserAssignmentsOffline, GetUserDoneAssignmentsOffline, GetUserTodoAssignmentsOffline, MarkAssignmentAsDoneOffline, MarkAssignmentAsTodoOffline, UpdateAssignmentOffline } from "../OfflineActions/AssignmentOfflineActions";



export async function CreateAssignment(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormIntermediary(CreateAssignmentServer, CreateAssignmentOffline, formdata, isAuthenticated === 'true')

}
export async function UpdateAssignment(state:GeneralFormState, formdata:FormData) {
  const isAuthenticated = formdata.get('auth')?.toString()
  return await FormIntermediary(UpdateAssignmentServer, UpdateAssignmentOffline, formdata, isAuthenticated === 'true')

}
 

export async function GetDoneAssignments(offset:number = 0, limit:number = 15) {
  const logged = await checkIsloggedIn()
  if(logged){

    return await GetUserDoneAssignmentsServer(offset, limit)

  }else{

    return await GetUserDoneAssignmentsOffline()

  }
  
}
export async function GetTodoAssignments(offset:number = 0, limit:number = 15) {
  const logged = await checkIsloggedIn()
  if(logged){

    return await GetUserTodoAssignmentsServer(offset, limit)

  }else{

    return await GetUserTodoAssignmentsOffline()

  }
  
}

export async function MarkAsDoneAssignment(id:string) {
  const logged = await checkIsloggedIn()
  if(logged){

    return await MarkAssignmentAsDoneServer(id)

  }else{

    return await MarkAssignmentAsDoneOffline(id)

  }
}

export async function MarkAsTodoAssignment(id:string) {
  const logged = await checkIsloggedIn()
  if(logged){

    return await MarkAssignmentAsTodoServer(id)

  }else{

    return await MarkAssignmentAsTodoOffline(id)

  }
  
}

export async function DeleteAssignment(isAuthenticated: boolean, id:string) {

  if(isAuthenticated){
    await DeleteUserAssignmentsServer(id)
  }else{
    await DeleteUserAssignmentsOffline(id)
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
      console.log(error);
      return {
        success:false,
        errors: "An unexpected error happend"
      }  
    }
  }
  
}