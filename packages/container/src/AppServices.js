import { useDispatch } from 'react-redux';
import useAuth from './components/hooks/use-auth';
import { useEffect, useRef, useState } from 'react';
import { refreshToken } from './services/auth/AuthService';

const AppServices = ({children}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [refreshTokenTimeout, setRefreshTokenTimeout] = useState(0)
  const timer = useRef(null);

  useEffect( () => {
    timer.current = setInterval(() => refreshToken(user.refreshToken, dispatch), 3500000 )

    return () => {
      clearInterval(timer.current)
    }
  },[])

  return(
    children
  )
}

export default AppServices