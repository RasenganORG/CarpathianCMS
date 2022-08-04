import { useDispatch, useSelector } from 'react-redux';
import useAuth from './components/hooks/use-auth';
import { useEffect, useRef, useState } from 'react';
import { refreshToken } from './services/auth/AuthService';
import { pagesActions } from './redux/pagesSlice';
import { getPages } from './services/pages/PagesService';

const AppServices = ({children}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const timer = useRef(null);
  const pages = useSelector(state => state.pages.pagesList)

  useEffect( () => {
    timer.current = setInterval(() => refreshToken(user.refreshToken, dispatch), 3500000 )

    return () => {
      clearInterval(timer.current)
    }
  },[])

  useEffect(() => {
    async function fetchPages(){
      const pages = await getPages()
      dispatch(pagesActions.setPages(pages))
    }
    fetchPages()

  },[])


  return(
    children
  )
}

export default AppServices