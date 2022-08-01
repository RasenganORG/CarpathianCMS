import React, { useEffect } from 'react';
import Router from './routes';
import { Provider, useDispatch } from 'react-redux';
import { refreshToken } from './services/auth/AuthService';
import useAuth from './components/hooks/use-auth';
import AppServices from './AppServices';


const App = () => {

  return (
    <AppServices>
      <Router />
    </AppServices>
  );
};

export default App;