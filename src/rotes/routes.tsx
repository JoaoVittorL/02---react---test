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

const isAuthenticated = true;
const typeAcess = 'almoxarife';

const accessRoutes = {
  almoxarife: [
    { path: '/', element: <Movimentation /> },
    { path: '/budget', element: <Budget /> },
    { path: '/historic', element: <Historic /> },
    { path: '/physical', element: <Physical /> },
  ],
  admin: [
    { path: '/manage/accounts', element: <Accounts /> },
    { path: '/manage/constructions', element: <Constructions /> },
    { path: '/manage/materials', element: <Materials /> },
  ],
};

const DeniedAccess = () => <h1>Acesso Negado</h1>;

const userRoutes = accessRoutes[typeAcess] || [];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      ...userRoutes.map(route => ({
        path: route.path,
        element: <PrivateRoute element={route.element} isAuthenticated={isAuthenticated} />,
      })),
      {
        path: '*',
        element: <DeniedAccess />,
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
