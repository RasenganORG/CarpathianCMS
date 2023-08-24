import React, {useEffect} from 'react';
import Router from './routes';
import AppServices from './AppServices';
import "./App.css"
import {GoogleOAuthProvider} from '@react-oauth/google';


const App = () => {
  
  return (
    <GoogleOAuthProvider clientId={"3002178617-ecbu28ar2r9qjtnjkvnmjkao865j8d4s.apps.googleusercontent.com"}>
      <AppServices>
        <Router/>
      </AppServices>
    </GoogleOAuthProvider>
  );
};

export default App;
