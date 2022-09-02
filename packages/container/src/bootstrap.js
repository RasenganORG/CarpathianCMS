import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux';
import { Provider } from 'react-redux';
import Notification from './components/notification/Notification';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Notification>
        <App />
      </Notification>
    </Provider>
  </BrowserRouter>,
);
