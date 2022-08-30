import { useDispatch, useSelector } from 'react-redux';
import useAuth from './components/hooks/use-auth';
import React, { useEffect, useRef, useState } from 'react';
import { refreshToken } from './services/auth/AuthService';
import { pagesActions } from './redux/pagesSlice';
import { getNavBar, getPages, updatePage } from './services/pages/PagesService';
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

export const getIdByHrefFromPages = (href, pages) => {
  const page = pages.find((page) => page.data.metadata.href === href)
  return page.id
}

const AppServices = ({children}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const timer = useRef(null);
  const hasPermission = useSelector(state => state.pages.hasPermissionToSettings)
  const [navBar, setNavBar] = useState([])
  const pageNeedsUpdate = useSelector(state => state.pages.pageNeedsUpdate)
  const pages = useSelector(state => state.pages.pagesList)
  const refreshNavBar = useSelector(state => state.pages.refreshNavBar)


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
      const navBarLayout = await createNavBar(navbar)
      // console.log('CREATED NAVBAR1', navBarLayout)
      navBarLayout.push(navBar)
      if(hasPermission)
        navBarLayout.push(...navBarBasicSettings)
      setNavBar(navBarLayout.filter(obj => obj.key !== undefined))
      const currentPageId = getIdByHrefFromPages(location.pathname.split('/')[1],pages)
      dispatch(pagesActions.setPages({ pages: pages, selectedPage: currentPageId }))
    }
    // console.log('will GET NAVBAR and PAGES')
    fetchPages()

  },[hasPermission,refreshNavBar])

  useEffect(() => {
    async function update(){
      if(pageNeedsUpdate) {
        const page = pages.find(page => page.id === pageNeedsUpdate)
        const res = await updatePage(page, pageNeedsUpdate);
        dispatch(pagesActions.resetPageNeedsUpdate())
        console.log(res)
      }
    }
    update()
  }, [pageNeedsUpdate, pages])

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
