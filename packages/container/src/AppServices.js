import { useDispatch, useSelector } from 'react-redux';
import useAuth from './components/hooks/use-auth';
import React, { useEffect, useRef, useState } from 'react';
import { refreshToken } from './services/auth/AuthService';
import { pagesActions } from './redux/pagesSlice';
import { getNavBar, getPages, updatePage } from './services/pages/PagesService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DesktopOutlined } from '@ant-design/icons';
import { createNavBar } from './utils/createNavBar';
import { notificationActions } from './redux/notificationSlice';
import { PATHS } from './routes/paths';
import { useCurrentRole } from './components/guards/RoleBasedGuard';
import { getUser } from './services/user/UsersService';


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
  if(href === "account" || href === "settings" || href === "home" || href === 'auth' )    // temporary fix for bug where it searches account or settings pages in pagesList
    return null
  const page = pages.find((page) => page.data.metadata.href === href);
  if(page)
    return page.id;
  else
    return null
};

const AppServices = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const timer = useRef(null);
  const hasPermission = useSelector(state => state.pages.hasPermissionToSettings);
  const [navBar, setNavBar] = useState([]);
  const pageNeedsUpdate = useSelector(state => state.pages.pageNeedsUpdate);
  const pages = useSelector(state => state.pages.pagesList);
  const refreshNavBar = useSelector(state => state.pages.refreshNavBar);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useLocation().pathname.split('/')[1]
  const role = useCurrentRole()
  const isPageListEmpty = useSelector(state => state.pages.isPageListEmpty)




  useEffect(() => {
    if(isPageListEmpty === false) {
      const pageExists = pages.find(page => page.data.metadata.href === currentPage);
      if(pageExists === undefined &&
        !['settings', "account", 'auth', 'get-started'].includes(currentPage) &&
        (selectedPage === null || selectedPage.length === 0)
      ) {
        //console.log("AppServices 404")
        navigate(PATHS['404']);
      }
    }
    if(isPageListEmpty === true){
      if(role !== 'admin'){
        if(!['auth','settings','account'].includes(currentPage)){
          navigate(PATHS['404']);
        }
      }
    }
  },[currentPage,pages,selectedPage,isPageListEmpty,role])

  useEffect(() => {
    if(navBar.length === 2 && !['auth','settings','account'].includes(currentPage)){
      navigate(PATHS.getStarted)
    }
  },[navBar,currentPage])


  useEffect(() => {
    timer.current = setInterval(() => refreshToken(user.refreshToken, dispatch), 3500000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    async function fetchPages() {
      try {
        const responsePages = await getPages();
        if (responsePages && responsePages.stack && responsePages.message) {
          throw responsePages
        }

        const responseNavBar = await getNavBar();

        if (responseNavBar && responseNavBar.stack && responseNavBar.message) {
          throw responseNavBar
        }


        const navbar = responseNavBar;
        const pages = responsePages;

        if(navbar.name !== "AxiosError") {
          dispatch(pagesActions.setNavBar(navbar));
          const navBarLayout = await createNavBar(navbar, dispatch, navigate, user);
          //console.log('CREATED NAVBAR1', navBarLayout)
          navBarLayout.push(navBar);
          if (hasPermission)
            navBarLayout.push(...navBarBasicSettings);
          setNavBar(navBarLayout.filter(obj => obj.key !== undefined));
          const currentPageId = getIdByHrefFromPages(location.pathname.split('/')[1], pages);
          if(pages.length > 0) {
            dispatch(pagesActions.setPages({ pages: pages, selectedPage: currentPageId }));
          }
          else{
            dispatch(pagesActions.setIsPagesListEmpty(true));
          }
        }
        else{
          let navBarLayout = []
          if (hasPermission)
            navBarLayout.push(...navBarBasicSettings);
          setNavBar(navBarLayout.filter(obj => obj.key !== undefined));
          dispatch(pagesActions.setIsPagesListEmpty(true));
        }
      } catch (error) {
        console.log(error)
        if (error.message === 'ERR_NETWORK') {
          dispatch(notificationActions.openNotification({
            message: 'Error',
            description: 'Our servers might be down or your internet connection is not valid',
            type: 'error',
          }));
        } else {
          dispatch(notificationActions.openNotification({
            message: 'Error',
            description: 'Error while loading pages from server',
            type: 'error',
          }));
        }
      }
    }

    // console.log('will GET NAVBAR and PAGES')

    fetchPages();


  }, [hasPermission, refreshNavBar, user]);


  useEffect(() => {
    async function update() {
      try {

        if (pageNeedsUpdate) {
          const page = pages.find(page => page.id === pageNeedsUpdate);
          const res = await updatePage(page, pageNeedsUpdate);
          dispatch(pagesActions.resetPageNeedsUpdate());
          if (res.data.type === 'success') {
            dispatch(notificationActions.openNotification({
              message: 'Blocks updated successfully',
              description: '',
              type: 'success',
            }));
          } else {
            throw new Error()
          }
        }
      } catch (error) {
        dispatch(notificationActions.openNotification({
          message: 'Error while trying to update blocks',
          description: '',
          type: 'error',
        }));
      }
    }

    update();
  }, [pageNeedsUpdate, pages]);


  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { navBar, setNavBar });
    }
    return child;
  });


  return (
    childrenWithProps
  );
};

export default AppServices;
