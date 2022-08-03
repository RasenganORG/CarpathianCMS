import { createSlice } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import React from 'react';

const pagesSlice = createSlice({
  name:'pages',
  initialState:{
    navBar : [
      {
        key: 'settings',
        label: <Link to={{ pathname: 'settings', state: { prevPath: location.pathname } }}>Settings</Link>,
      },
      {
        key: 'siteWorkspace',
        label: <Link to={'siteWorkspace'}>Site</Link>,
      },
      {
        key: 'account',
        label: <Link to={'account'}>My account</Link>,
      },
    ],
    pagesList: [
      {
        metadata: {
          name: 'page One',
          hrf: 'page-one',
          parent: 'none',
        },
      },
      {
        metadata: {
          name: 'page Two',
          hrf: 'page-two',
          parent: 'none',
        },
      },
    ]
  },
  reducers:{

  }
})

export const pagesActions = pagesSlice.actions;

export default pagesSlice