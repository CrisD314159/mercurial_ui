import { APIURL, FormState, isNullOrEmpty } from "../types/definitions";




export async function Login(formstate:FormState, formdata: FormData) {
  const email = formdata.get('email')?.toString()
  const password = formdata.get('password')?.toString()

  if(isNullOrEmpty(email) || isNullOrEmpty(password)) {
    return {
      message: "Invalid email or password"
    }
  }


  const response = await fetch(`${APIURL}/login`, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })

  if (response.status === 200){
    const data = await response.json()
    return {
      data,
      success:true
    }
  }

  return {
    message:'Error fetching the data',
    success: false
  }
  
}
export async function SignUp(formstate:FormState, formdata: FormData) {
  const email = formdata.get('email')?.toString()
  const password = formdata.get('password')?.toString()
  const fullname = formdata.get("name")?.toString()

  if(isNullOrEmpty(email) || isNullOrEmpty(password) || isNullOrEmpty(fullname)) {
    return {
      message: "Invalid Fields"
    }
  }


  const response = await fetch(`${APIURL}/user`, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })

  if (response.status === 200){
    const data = await response.json()
    return {
      data,
      success:true
    }
  }

  return {
    message:'Error fetching the data',
    success: false
  }
  
}


