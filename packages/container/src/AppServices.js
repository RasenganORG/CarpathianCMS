import { useDispatch, useSelector } from 'react-redux';
import useAuth from './components/hooks/use-auth';
import React, { useEffect, useRef, useState } from 'react';
import { refreshToken } from './services/auth/AuthService';
import { pagesActions } from './redux/pagesSlice';
import { getNavBar, getPages } from './services/pages/PagesService';
import { Link } from 'react-router-dom';
import { DesktopOutlined } from '@ant-design/icons';
import { createNavBar } from './utils/createNavBar';

const AppServices = ({children}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const timer = useRef(null);
  const pages = useSelector(state => state.pages.pagesList)
  const navBar = useSelector(state => state.pages.navBar)


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
      console.log(navbar)
      const navBar = createNavBar(navbar)
      console.log(navBar)
      dispatch(pagesActions.pushToNavBar(navBar))
      dispatch(pagesActions.setPages(pages))
    }
    fetchPages()

  },[])


  return(
    children
  )
}

export default AppServices
