import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import PageView from '../components/pages/PageView';
import PageEdit from '../components/pages/PageEdit';
import RoleBasedGuard from '../components/guards/RoleBasedGuard';
import AuthGuard from '../components/guards/AuthGuard';
import LoadingScreen from '../components/loading/LoadingScreen';
import PageLayout from '../components/layouts/PageLayout';
import { useSelector } from 'react-redux';
import { getNavBar } from '../services/pages/PagesService';
import { createNavBar } from '../utils/createNavBar';
import ContentManager from '../components/content/ContentManager';
import RoleWithSpecialPermissionsGuard from '../components/guards/RoleWithSpecialPermissionsGuard';
import Page404 from '../components/pages/Page404';
import PageEmptySite from '../components/pages/PageEmptySite';
import Account from '../components/account/Account';


const Loadable = (Component) => (props) => {
  const { pathname } = useLocation();


  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};


const Router = ({ navBar, setNavBar }) => {

  return useRoutes([
    {
      path: '/',
      element: <ApplicationLayout navBar={navBar} setNavBar={setNavBar} />,
      children: [
        {
          path: 'settings',
          element:
            <AuthGuard>
              <RoleBasedGuard accessibleRoles={['admin']}>
                <SettingsLayout />
              </RoleBasedGuard>
            </AuthGuard>,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'account',
          element: <Account/>,
        },
        {
          path: '404',
          element: <Page404 />,
        },
        {
          path: 'get-started',
          element:
            <AuthGuard>
              <RoleBasedGuard
                accessibleRoles={['admin']}>
                <PageEmptySite />
              </RoleBasedGuard>
            </AuthGuard>,
        },
        {
          path: '',
          element: <PageLayout />,
          children: [
            {
              path: '',
              element: <Navigate to={'home'} />,
            },
            {
              path: '/:pageid',
              element:
                <RoleWithSpecialPermissionsGuard
                  defaultAccessibleRoles={['admin', 'editor', 'user']}
                  onlyForEditors={false}>
                  <PageView />
                </RoleWithSpecialPermissionsGuard>
              ,
            },
            {
              path: '/:pageid/edit',
              element:
                <AuthGuard>
                  <RoleWithSpecialPermissionsGuard
                    defaultAccessibleRoles={['admin', 'editor']}
                    onlyForEditors={true}>
                    <PageEdit />
                  </RoleWithSpecialPermissionsGuard>
                </AuthGuard>,
            },
            {
              path: '/:pageid/content',
              element: <ContentManager />,
            },
          ],
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

const Login = Loadable(lazy(() => import('../components/auth/Login')));
const Signup = Loadable(lazy(() => import('../components/auth/Signup')));
const Home = Loadable(lazy(() => import('../components/home/Home')));
const SettingsLayout = Loadable(lazy(() => import('../components/layouts/SettingsLayout')));
const ApplicationLayout = Loadable(lazy(() => import('../components/layouts/ApplicationLayout/ApplicationLayout')));

export default Router;

