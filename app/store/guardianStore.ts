import { create } from 'zustand'

const apiUrl = 'https://brainy-sena-mercurial-app-169ad86c.koyeb.app'
//'https://brainy-sena-mercurial-app-169ad86c.koyeb.app'

interface authState {
  authStatus: boolean,
  isLoading: boolean,
  error: Error | string ,
  authToken: string
  checkAuthStatus: ()=>Promise<void>
  setIsLoggedIn: ()=>void
  login: ()=>Promise<boolean>,
  refreshToken: ()=>Promise<boolean>
}

// The store is created using the create function from zustand, this function receives a function that will be used to set the state of the store
export const useGuardianStore = create<authState>((set)=>({
  authStatus: false,
  isLoading:false,
  error:"No errors",
  authToken:"",

  checkAuthStatus: async ()=>{ // This function is used to check if the user is authenticated
    set({isLoading:true})
    
    try {
      const response = await fetch(`${apiUrl}/check-auth`,{
        
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      if (response.status === 200) {
        set({authStatus:true, isLoading:false})
      } else {
        if(response.status === 401 && localStorage.getItem('refreshToken')){
          const refresh = localStorage.getItem('refreshToken')
          const response = await fetch(`${apiUrl}/refresh-token`, {
            headers:{'content-type':'application/json'},
            method: 'POST',
            body: JSON.stringify({refreshToken: refresh})
          })
          const cont = await response.json()
          if (response.status === 201) {
            set({authStatus:true, isLoading:false})
            localStorage.setItem('accessToken', cont.accessToken)
          } else {
            set({authStatus:false, isLoading:false})
          }

        }else{
          set({authStatus:false, isLoading:false})
        }
      }
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({authStatus:false, isLoading:false})
      
    }
    
  },
  setIsLoggedIn: ()=>{ // This function is used to set the authStatus to true
    set({authStatus:true})
  },
  login: async ()=>{
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 'root',
          password: 'admin'
        })
      })
      const cont = await response.json()
    
      if (response.status === 201) {
        localStorage.setItem('access', cont.accessToken)
        localStorage.setItem('refresh', cont.refreshToken)
        return true
      } else {
        throw new Error('Error')
      }
      
    } catch (error) {
      if (error instanceof Error) {
        set({error:error.message})
        return false
      } else {
        set({error:"An unknown error occurred"})
        return false
      }
      
    }

  },
  refreshToken: async ()=>{ // This function is used to refresh the token
    const refresh = localStorage.getItem('refresh')
    try {
      if (!refresh) {
        set({authStatus:false})
        throw new Error('No refresh token')
      }
      const response = await fetch(`${apiUrl}/refresh`, {
        method: 'POST',
        body: JSON.stringify({refreshToken: refresh})
      })
      const cont = await response.json()
      if (response.status === 201) {
        set({authStatus:true})
        localStorage.setItem('access', cont.accessToken)
        return true
      } else {
        set({authStatus:false})
        throw new Error('Error')
      }
      
    } catch (error) {
      if (error instanceof Error) {
        set({error:error.message})
        return false
      } else {
        set({error:"An unknown error occurred"})
        return false
      
    }
  }
  }

}))