import { createBrowserRouter, redirect } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Category from '../pages/Category';
import Dashboard from '../pages/Dashboard';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

const router = createBrowserRouter([
  {
    element: <Homepage />,
    loader: () => {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) throw redirect('/login');

      return null;
    },
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/categories',
        element: <Category />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/login',
    loader: () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) throw redirect('/');

      return null;
    },
    element: <LoginPage />,
  },
]);

export default router;
