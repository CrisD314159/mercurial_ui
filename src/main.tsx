import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login.tsx'
import SingUp from './pages/singUp/SingUp.tsx'
import Dashboard from './pages/Dashboard.tsx'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
<<<<<<< dev
    mode: 'dark',
    primary: {
      main: '#d5d5d5',
    },
    secondary: {
      main: '#f50057',
    },
=======
    text: {
      primary: '#d5d5d5',
      secondary: '#d5d5d5',
      disabled: '#d5d5d5',

    },
    background: {
      default: '#0F0F0F'
    },
    primary: {
      main: '#666666'
    },
    secondary: {
      main: '#FFD700'
    },
    common: {
      white: '#d5d5d5'
    },
    action: {
      active: '#FFD700'
    },

>>>>>>> main
  },
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
    path: '/singUp',
    element: <SingUp />
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
