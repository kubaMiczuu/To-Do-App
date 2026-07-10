import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LandingPage from "./pages/LandingPage.tsx";
import Dashboard from './pages/Dashboard.tsx'
import AuthPage from "./pages/AuthPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/login',
                element: <AuthPage mode={'login'} />
            },
            {
                path: '/register',
                element: <AuthPage mode={'register'} />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
