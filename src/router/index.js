import { Navigate, useRoutes } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import ApplicationLayout from '../layouts/application/ApplicationLayout';
import Overview from '../components/site-overview/Overview';
import SettingsLayout from '../layouts/settings/SettingsLayout';
import SocialMedia from '../layouts/settings/SocialMedia';
import SiteSettings from '../layouts/settings/SiteSettings';
import EditRoles from '../layouts/settings/EditRoles';
import UserList from '../layouts/settings/UserList';


const Router = () => {

  return useRoutes([
    {
      path: '',
      element: <Overview />,
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
      ],
    },

  ]);
};

export default Router;