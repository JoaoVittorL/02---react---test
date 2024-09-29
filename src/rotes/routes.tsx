import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../pages/_layouts/app';
import { AuthLayout } from '../pages/_layouts/auth';
import { Movimentation } from '../pages/app/movimentation';
import { SignIn } from '../pages/auth/sign-in';
import { Historic } from '../pages/app/historic';
import { Budget } from '../pages/app/budget';
import { Physical } from '../pages/app/physical';
import { Accounts } from '../pages/app/manage/accounts';
import { Constructions } from '../pages/app/manage/constructions';
import { Materials } from '../pages/app/manage/materials';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';

const isAuthenticated = false

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <PrivateRoute element={<Movimentation />} isAuthenticated={isAuthenticated} />,
      },
      {
        path: '/budget',
        element: <PrivateRoute element={<Budget />} isAuthenticated={isAuthenticated} />,
      },
      {
        path: '/historic',
        element: <PrivateRoute element={<Historic />} isAuthenticated={isAuthenticated} />,
      },
      {
        path: '/physical',
        element: <PrivateRoute element={<Physical />} isAuthenticated={isAuthenticated} />,
      },
      {
        path: '/transfer',
        element: <PrivateRoute element={<Physical />} isAuthenticated={isAuthenticated} />,
      },
      {
        path: '/manage/accounts',
        element: <PrivateRoute element={<Accounts />} isAuthenticated={isAuthenticated} />,
      },
      {
        path: '/manage/constructions',
        element: <PrivateRoute element={<Constructions />} isAuthenticated={isAuthenticated} />,
      },
      {
        path: '/manage/materials',
        element: <PrivateRoute element={<Materials />} isAuthenticated={isAuthenticated} />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <PublicRoute element={<SignIn />} isAuthenticated={isAuthenticated} />,
      },
    ],
  },
]);
