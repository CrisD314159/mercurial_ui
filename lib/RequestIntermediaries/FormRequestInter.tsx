
export async function FormRequestInter(onlineMethod: (formdata:FormData) => Promise<{success:boolean ; message:string}>, 
offlineMethod: (formdata:FormData) => Promise<boolean>, formdata: FormData, isAuthenticated:boolean) {
  if(isAuthenticated){
    try {
      await onlineMethod(formdata)
    } catch (error) {
      if (error instanceof Error){
        return {
          success:false,
          message: error.message
        }  
      }
    }
  }else{
    try { 
      await offlineMethod(formdata)
    } catch (error) {
      return {
        success:false,
        message: "An unexpected error happend"
      }  
    }
  }
  
}