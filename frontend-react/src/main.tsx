import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LandingPage from "./pages/LandingPage.tsx";
import Dashboard from './pages/Dashboard.tsx'
import AuthPage from "./pages/AuthPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import GuestRoute from "./components/GuestRoute.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element:
                    <GuestRoute>
                        <LandingPage />
                    </GuestRoute>
            },
            {
                path: '/dashboard',
                element:
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
            },
            {
                path: '/login',
                element:
                    <GuestRoute>
                        <AuthPage mode={'login'} />
                    </GuestRoute>
            },
            {
                path: '/register',
                element:
                    <GuestRoute>
                        <AuthPage mode={'register'} />
                    </GuestRoute>
            },
            {
                path: '/profile',
                element:
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>,
)
