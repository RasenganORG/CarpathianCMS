import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import React, {Suspense, lazy } from 'react';
import PageView from '../components/PageView';
import PageEdit from '../components/PageEdit';
import RoleBasedGuard from '../components/guards/RoleBasedGuard';
import AuthGuard from '../components/guards/AuthGuard';
import LoadingScreen from '../components/loading/LoadingScreen';

const Loadable = (Component) => (props) => {
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen/>}>
      <Component {...props} />
    </Suspense>
  );
};

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
          <AuthGuard>
            <RoleBasedGuard accessibleRoles={['admin']} >
              <SettingsLayout />
            </RoleBasedGuard>
          </AuthGuard>,
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

const Login = Loadable(lazy(() => import('../components/auth/Login')))
const Signup = Loadable(lazy(() => import('../components/auth/Signup')))
const Home = Loadable(lazy(() => import('../components/home/Home')))
const SettingsLayout = Loadable(lazy(() => import('../components/layouts/SettingsLayout')))
const ApplicationLayout = Loadable(lazy(() => import('../components/layouts/ApplicationLayout')))

export default Router;