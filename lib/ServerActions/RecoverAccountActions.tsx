import { APIURL, GeneralFormState } from "../types/definitions";
import { ChangePasswordSchema } from "../ZodValidations/User/UserValidations";


export async function RecoverAccountAction(formstate:GeneralFormState, formdata:FormData) {
  const email = formdata.get('email')?.toString()

  let response : Response

  try {
    response = await fetch(`${APIURL}/user/recoverAccount`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
  }catch (error) {
    console.log(error);
    return {
      message: "An error occurred while trying to connect server",
      success: false
    }
  }

  if (response.status === 200){
    return {
      message: "Email sent",
      success:true
    }
  }else{
    const {message} = await response.json()
    return {
      success:false,
      message: message ?? "An unexpected error occurred"
    }
  }

}

export async function ChangePasswordAction(formstate:GeneralFormState, formdata:FormData) {
    
    const validation = ChangePasswordSchema.safeParse({
      email: formdata.get('email'),
      code: formdata.get('code'),
      password: formdata.get('password')
    })

    if(!validation.success){
      return {
        message: "Check your inputs and try again",
        success:false
      }
    }

    const {code, email, password} = validation.data
    console.log(code, email, password);

    let response : Response
    try {
      response = await fetch(`${APIURL}/user/changePassword`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code, email, password})
    })

    } catch (error) {
      return{
        message: "An error occurred while trying to connect server",
        success: false
      }
    }

   if (response.status === 200){
    return {
      message: "Password updated successfully",
      success:true
    }
  }else{
    const {message} = await response.json()
    return {
      success:false,
      message: message ?? "An unexpected error occurred"
    }
  }

}