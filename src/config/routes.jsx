import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Dashboard from '../pages/private/Dashboard';
import AuthGuard from '../components/Auth/AuthGuard';
import Profile from '../pages/private/Profile'
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
  }
]);