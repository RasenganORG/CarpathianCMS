import { createSlice } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import React from 'react';

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pagesList: [],
    navBar:[],
    wizard:{}
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

    addBlockVariantWizard(state, action){
      state.wizard = {
        type:action.payload.type,
        id:action.payload.id
      }
    },

    addBlockMetadataWizard(state, action){
      state.wizard.metadata=action.payload
    },

    resetWizard(state){
      state.wizard = {}
    }

  },
});

export const pagesActions = pagesSlice.actions;

export default pagesSlice;
