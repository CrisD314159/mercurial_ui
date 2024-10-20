import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Guardian from './Guardian.tsx'


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3798FB',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#FF1212'
    },
    success:{
      main: '#32a852'
    },
    info:{
      main: '#2A629A'
    },
    warning:{
      main: '#FFC107'
    },
    text:{
      primary: '#d5d5d5',
      secondary: '#f5f5f5'
    }

  }
});

const queryClient = new QueryClient() // Creamos una instancia de la clase QueryClient para poder usarla en toda la aplicación

// const router = createBrowserRouter([
//   { path: '/', element: <Login /> },
//   { path: '/dashboard', element: <Dashboard /> },
//   { path: '/signUp', element: <SignUp /> },
//   { path: '/dashboard/subjects', element: <Subjects /> },
//   { path: '/dashboard/topics', element: <Topics /> },
//   { path: '/userSettings', element: <UserSettings /> },
//   { path:'/users/verify/user/:id', element: <VerificationPage /> },
//   { path:'/users/recover/password/email', element: <SendRecoverEmail /> },
//   { path:'/users/reset/password/:id', element: <PasswordRecover /> },
//   { path: '*', element: <NotFound /> }
// ]);

// Envolvemos toda la aplicación en el componente QueryClientProvider para que todas las páginas de la app tengan acceso a la instancia de QueryClient

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Guardian/>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    
  </React.StrictMode>,
)
