import React from 'react'
import ReactDom from 'react-dom'
import App from "./App";


//mount function to start up the app
const mount = (el) => {
  ReactDom.render(
    <App/>,
    el
  );
}

//case application in development
if (process.env.NODE_ENV === 'development'){
  const el = document.querySelector('#_calendar01_public_id');
  if(el){
    mount(el)
  }
}

export {mount}
