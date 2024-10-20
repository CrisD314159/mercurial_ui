import { useEffect } from 'react'
import './index.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import SignUp from './pages/signUp/SignUp.tsx'
import Subjects from './pages/subjects/Subjects.tsx'
import Topics from './pages/topics/Topics.tsx'
import UserSettings from './pages/userSettings/userSettings.tsx'
import NotFound from './pages/notFound/NotFound.tsx'
import VerificationPage from './pages/verification/VerificationPage.tsx'
import SendRecoverEmail from './pages/passwordEmailSender/SendRecoverEmail.tsx'
import PasswordRecover from './pages/passwordRecover/PasswordRecover.tsx'
import { useGuardianStore } from './store/guardianStore.ts'
import { CircularProgress } from '@mui/material'

const ProtectedRoutes = ({children}:{children:JSX.Element})=>{
  const isAuthenticated = useGuardianStore(state=>state.authStatus)
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }
  return children
}
const RedirectRoutes = ({children}:{children:JSX.Element})=>{
  const isAuthenticated = useGuardianStore(state=>state.authStatus)
  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} replace />
  }
  return children
}


export default function Guardian(){
  const isLoading = useGuardianStore(state=>state.isLoading)
  const checkAuthStatus = useGuardianStore((state)=> state.checkAuthStatus)
  useEffect(()=>{
    checkAuthStatus()
  },[checkAuthStatus])

  if(isLoading){
    return <div className='loadingContainer'>
      <CircularProgress/>
    </div>
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <RedirectRoutes>
            <Login />
          </RedirectRoutes>
        }>
        </Route>
        <Route path='/signUp' element={
          <RedirectRoutes>
            <SignUp />
          </RedirectRoutes>
        }>
        </Route>
        
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }>
        </Route>
      
        <Route path='/dashboard/subjects' element={
          <ProtectedRoutes>
            <Subjects />
          </ProtectedRoutes>
        }>
        </Route>
        <Route path='/dashboard/topics' element={
          <ProtectedRoutes>
            <Topics />
          </ProtectedRoutes>
        }>
        </Route>
        <Route path='/userSettings' element={
          <ProtectedRoutes>
            <UserSettings />
          </ProtectedRoutes>
        }>
        </Route>

        <Route path='/users/verify/user/:id' element={<VerificationPage/>}/>
        <Route path='/users/recover/password/email' element={<SendRecoverEmail/>}/>
        <Route path='/users/reset/password/:id' element={<PasswordRecover/>}/>
        <Route path='*' element={<NotFound/>}/>

   
        










      </Routes>
    </div>
  )

}