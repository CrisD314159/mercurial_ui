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

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d5d5d5',
    },
    secondary: {
      main: '#f50057',
    },
  }
});
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
    path:'/dashboard/subjects',
    element:<Subjects/>
  },
  {
    path:'/dashboard/topics',
    element:<Topics/>
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
