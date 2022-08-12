import { useDispatch, useSelector } from 'react-redux';
import useAuth from './components/hooks/use-auth';
import React, { useEffect, useRef, useState } from 'react';
import { refreshToken } from './services/auth/AuthService';
import { pagesActions } from './redux/pagesSlice';
import { getNavBar, getPages } from './services/pages/PagesService';
import { Link } from 'react-router-dom';
import { DesktopOutlined } from '@ant-design/icons';
import { createNavBar } from './utils/createNavBar';

const navBarBasicSettings = [
  {
    key: 'settings',
    label: <Link to={{ pathname: 'settings' }}>Settings</Link>,
    icon: <DesktopOutlined />,

  },
  {
    key: 'account',
    label: <Link to={'account'}>My account</Link>,
    icon: <DesktopOutlined />,
  },
];

const AppServices = ({children}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const timer = useRef(null);
  const hasPermission = useSelector(state => state.pages.hasPermission)
  const [navBar, setNavBar] = useState([])


  useEffect( () => {
    timer.current = setInterval(() => refreshToken(user.refreshToken, dispatch), 3500000 )

    return () => {
      clearInterval(timer.current)
    }
  },[])

  useEffect(() => {
    async function fetchPages(){
      const pages = await getPages()
      const navbar = await getNavBar()
      const navBarLayout = createNavBar(navbar)
      navBarLayout.push(navBar)
      if(hasPermission)
        navBarLayout.push(...navBarBasicSettings)
      console.log("services",navBarLayout)
      setNavBar(navBarLayout)
      dispatch(pagesActions.setPages(pages))
    }
    fetchPages()

  },[hasPermission])

  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { navBar, setNavBar });
    }
    return child;
  });



  return(
    childrenWithProps
  )
}

export default AppServices
