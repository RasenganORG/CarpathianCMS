import { useSelector } from 'react-redux';

const useAuth = () => {
  const user = useSelector(state => state.user)
  const isAuthenticated = user.isAuthenticated

  return {
    user,
    isAuthenticated,
  }
}

export default useAuth