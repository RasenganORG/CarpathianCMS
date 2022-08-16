import { createSlice } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import React from 'react';

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pagesList: [],
    navBar:[],
    wizard:{},
    hasPermissionToSettings:false,
    selectedPage:{},
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
      const pages = action.payload.pages;
      state.selectedPage = action.payload.selectedPage
      state.pagesList = pages;
    },

    setHasPermissionToSettings(state, action) {
      state.hasPermissionToSettings = action.payload
    },

    addBlockVariantWizard(state, action){
      state.wizard = {
        type:action.payload.type,
        id:action.payload.id
      }
    },

    addBlockToPage(state, action){
      const pageId = action.payload.pageId
      const block = action.payload.block
      const currentPageIndex = state.pagesList.findIndex(page => page.id === pageId)
      state.pagesList[currentPageIndex].blocks = []
      state.pagesList[currentPageIndex].blocks.push(block)

    },

    addBlockMetadataWizard(state, action){
      state.wizard.metadata=action.payload
    },

    resetWizard(state){
      state.wizard = {}
    },

    setSelectedPage(state, action){
      state.selectedPage = action.payload
    }

  },
});

export const pagesActions = pagesSlice.actions;

export default pagesSlice;
