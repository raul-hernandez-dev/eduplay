import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../features/home/views/Home';
import Login from '../features/auth/views/Login';
import Register from '../features/auth/views/Register';
import Dashboard from '../features/dashboard/views/Dashboard';
import AuthGuard from '../features/auth/components/AuthGuard';
import Profile from '../features/users/views/Profile'
import ForgotPassword from '../features/auth/views/ForgotPassword';
import ResetPassword from '../features/auth/views/ResetPassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        )
      },
      {
        path: 'profile',
        element: (
          <AuthGuard>
            <Profile />
          </AuthGuard>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  }
]);