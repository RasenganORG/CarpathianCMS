import { Navigate, useRoutes } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import ApplicationLayout from '../layouts/application/ApplicationLayout';
import SiteEdit from '../components/site-edit/SiteEdit';
import SettingsLayout from '../layouts/settings/SettingsLayout';
import SocialMedia from '../components/settings/SocialMedia';
import SiteSettings from '../components/settings/SiteSettings';
import EditRoles from '../components/settings/EditRoles';
import UserList from '../components/settings/UserList';
import Account from '../components/account/Account';


const Router = () => {

  return useRoutes([
    {
      path: '',
      element: <SiteEdit />,
    },
    {
      path: 'auth',
      children: [
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
    {
      path: 'application',
      element: <ApplicationLayout />,
      children: [
        {
          path: 'settings',
          element: <SettingsLayout />,
          children: [
            {
              path: 'social-media',
              element: <SocialMedia/>
            },
            {
              path: 'site-settings',
              element: <SiteSettings/>
            },
            {
              path: 'edit-roles',
              element: <EditRoles/>
            },
            {
              path: 'user-list',
              element: <UserList/>
            },

          ],
        },
        {
          path:'siteEdit',
          element: <SiteEdit/>
        },
        {
          path:'account',
          element: <Account/>
        }
      ],
    },

  ]);
};

export default Router;