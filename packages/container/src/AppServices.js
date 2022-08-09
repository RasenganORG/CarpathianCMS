import { useDispatch, useSelector } from 'react-redux';
import useAuth from './components/hooks/use-auth';
import React, { useEffect, useRef, useState } from 'react';
import { refreshToken } from './services/auth/AuthService';
import { pagesActions } from './redux/pagesSlice';
import { getNavBar, getPages } from './services/pages/PagesService';
import { Link } from 'react-router-dom';
import { DesktopOutlined } from '@ant-design/icons';

const AppServices = ({children}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const timer = useRef(null);
  const pages = useSelector(state => state.pages.pagesList)

  const createNavBar = (navbarJson) => {
    //console.log(navbarJson)
    let navBarComp = []
    for(let page of Object.entries(navbarJson)){
      let children = []
      if(page[1].children !== {}){
        children = createNavBar(page[1].children)
      }
      //console.log(page)
      navBarComp.push({
        key: page[1].metadata.href,
        label: <Link to={page[1].metadata.href}>{page[1].metadata.title}</Link>,
        icon: <DesktopOutlined />,
        children: children.length > 0 ? children : null
      })
      //console.log(Object.entries(page[1].children))
    }
    //console.log("Comp", navBarComp)
    return navBarComp
  }


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
      const navBarComp = createNavBar(navbar)
      console.log(navBarComp)
      dispatch(pagesActions.setNavBar(navBarComp))
      dispatch(pagesActions.setPages(pages))
    }
    fetchPages()

  },[])


  return(
    children
  )
}

export default AppServices