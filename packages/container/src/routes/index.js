import { Navigate, useRoutes } from 'react-router-dom';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import Home from '../components/home/Home';
import React from 'react';
import PageView from '../components/PageView';
import PageEdit from '../components/PageEdit';
import SettingsLayout from '../components/layouts/SettingsLayout';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import RoleBasedGuard from '../components/guards/RoleBasedGuard';

const Router = () => {

  return useRoutes([
    {
      path: '/',
      element: <ApplicationLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'settings',
          element:
            <RoleBasedGuard accessibleRoles={['admin']} >
              <SettingsLayout />
            </RoleBasedGuard>,
        },
        {
          path: '/:pageid',
          element: <PageView />,
        },
        {
          path: '/:pageid/edit',
          element: <PageEdit />,
        },
      ],
    },
    {
      path: 'auth',
      children: [
        {
          path: '',
          element: <Navigate to='login' />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Signup />,
        },
      ],
    },
  ]);
};

export default Router;