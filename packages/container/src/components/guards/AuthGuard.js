import PropTypes from 'prop-types';
import { useState} from 'react';
import  React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../auth/Login';
import useAuth from '../hooks/use-auth';
import { PATHS } from '../../routes/paths';


// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);


  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATHS.auth.login}/>;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}

