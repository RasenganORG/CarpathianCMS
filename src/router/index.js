import {useRoutes} from 'react-router-dom'
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Settings from '../components/settings/Settings';
import Overview from '../components/site-overview/Overview';



const Router = () => {

  return useRoutes([
    {
      path:'',
      element:<Overview/>
    },
    {
      path:'auth',
      children: [
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'register',
          element: <Signup/>
        }
      ]
    },
    {
      path:'settings',
      element:<Settings/>
    },

  ]);
}

export default Router;