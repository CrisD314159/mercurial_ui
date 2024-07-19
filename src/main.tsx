import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import SignUp from './pages/signUp/SignUp.tsx'
import Subjects from './pages/subjects/Subjects.tsx'
import Topics from './pages/topics/Topics.tsx'
import UserSettings from './pages/userSettings/userSettings.tsx'
import EditUser from './pages/editUser/EditUser.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d5d5d5',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#FF1212'
    }

  }
});

const queryClient = new QueryClient() // Creamos una instancia de la clase QueryClient para poder usarla en toda la aplicación

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/signUp',
    element: <SignUp />
  },
  {
    path: '/dashboard/subjects',
    element: <Subjects />
  },
  {
    path: '/dashboard/topics',
    element: <Topics />
  },
  {
    path: '/userSettings',
    element: <UserSettings />
  },
  {
    path: '/userSettings/editUser',
    element:<EditUser/>
  }

])

// Envolvemos toda la aplicación en el componente QueryClientProvider para que todas las páginas de la app tengan acceso a la instancia de QueryClient

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
