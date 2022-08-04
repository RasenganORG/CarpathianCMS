import { createSlice } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import React from 'react';

const pagesSlice = createSlice({
  name:'pages',
  initialState:{
    pagesList: []
  },
  reducers:{

    createNewPage(state, action){
      const data = action.payload
      state.pagesList.push({data: data})
    },

    setPages(state,action){
      const pages = action.payload
      state.pagesList = pages
    }
  }
})

export const pagesActions = pagesSlice.actions;

export default pagesSlice