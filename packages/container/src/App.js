import React, { useEffect } from 'react';
import Router from './routes';
import AppServices from './AppServices';
import Notification from './components/notification/Notification';


const App = () => {

  return (
    <AppServices>
      <Router />
    </AppServices>
  );
};

export default App;
