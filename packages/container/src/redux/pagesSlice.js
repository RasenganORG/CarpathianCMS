import { createSlice } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import React from 'react';

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pagesList: [],
    navBar:[]
  },
  reducers: {

    createNewPage(state, action) {
      const payload = action.payload;
      state.pagesList.push({
        id: payload.id,
        data: payload.object,
      });
    },

    setPages(state, action) {
      const pages = action.payload;
      state.pagesList = pages;
    },

    pushToNavBar(state, action) {
      console.log(action.payload)
      state.navBar.push(...action.payload)
    },

  },
});

export const pagesActions = pagesSlice.actions;

export default pagesSlice;