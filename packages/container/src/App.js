import React, { useEffect } from 'react';
import Router from './routes';
import AppServices from './AppServices';


const App = () => {

  return (
    <AppServices>
      <Router />
    </AppServices>
  );
};

export default App;
