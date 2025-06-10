'use server'
import { cookies } from "next/headers";

import { APIURL } from "../types/definitions";


export async function checkIsloggedIn() {
  try {
    const token = (await cookies()).get('token')?.value
    const refresh = (await cookies()).get('refresh')?.value
    if(!token && refresh){
      return await refreshToken()
    }
  const response = await fetch(`${APIURL}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if(response.status === 401){
    return await refreshToken()
  }

  return true
  } catch {
    return false
  }

}

async function refreshToken(){
  try {
    const currentRefreshToken = (await cookies()).get('refresh')?.value
    if(!currentRefreshToken) return false

    const response = await fetch(`${APIURL}/account/refreshToken`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"refreshToken":currentRefreshToken})
    })


    const {token, refreshToken} = await response.json()

    
    if(!token){
      return false
    }
    if(refreshToken){
      await createSession(token, refreshToken)
    }

    await createSession(token, currentRefreshToken)

    return true
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }  
  }
  
}

export async function createSession(token: string, refreshToken: string) {
  try {
   const cookieStore = await cookies()
  
   cookieStore.set('token', token, {
     httpOnly: true,
     secure: false,
     expires:  new Date(Date.now() + 1 * 60 * 60 * 1000),// Outputs the date and time exactly 1 hour from now,
     sameSite: 'lax',
     path: '/',
   })

   console.log("token establecido");
   cookieStore.set('refresh', refreshToken, {
     httpOnly: true,
     secure: false,
     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
     sameSite: 'lax',
     path: '/',
   })
  } catch (error) {
   if (error instanceof Error) {
     throw new Error("An error occurred while trying to login you in. Please try again later.")
   }
  }
 }
  
 export async function deleteSession() {
   const cookieStore = await cookies()
   cookieStore.delete('token')
   cookieStore.delete('refresh')
 }