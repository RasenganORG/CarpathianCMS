import React, { useEffect } from 'react';
import Router from './routes';
import AppServices from './AppServices';
import "./App.css"

const App = () => {

  return (
    <AppServices>
      <Router />
    </AppServices>
  );
};

export default App;
