import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pagesList: [],
    navBar: {},
    wizard: {},
    hasPermissionToSettings: false,
    selectedPage: "",
    pageNeedsUpdate: false,
    refreshNavBar: 0,
    roles: [],
    isPageListEmpty: null,
  },
  reducers: {
    createNewPage(state, action) {
      const payload = action.payload;
      state.pagesList.push({
        id: payload.id,
        data: {
          metadata: payload.object.metadata,
          blocks: [],
        },
      });
      state.isPageListEmpty = false
    },

    setPages(state, action) {
      const pages = action.payload.pages;
      // console.log("Pages in redux", pages)
      if(action.payload.selectedPage) {
        state.selectedPage = action.payload.selectedPage;
      }
      state.pagesList = pages;
      state.roles = [
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'editor',
          label: 'Editor',
        },
        {
          value: 'user',
          label: 'User',
        },
      ];
      state.isPageListEmpty = false

    },

    setHasPermissionToSettings(state, action) {
      state.hasPermissionToSettings = action.payload;
    },

    addBlockToPage(state, action) {
      const pageId = action.payload.pageId;
      const block = action.payload.block;
      const currentPageIndex = state.pagesList.findIndex(page => page.id === pageId);
      state.pagesList[currentPageIndex].data.blocks.push(block);
      state.pageNeedsUpdate = pageId;
    },

    setBlocks(state, action) {
      const pageId = action.payload.pageId;
      const currentPageIndex = state.pagesList.findIndex(page => page.id === state.selectedPage);
      state.pagesList[currentPageIndex].data.blocks = action.payload.blocks;
      state.pageNeedsUpdate = pageId;
    },

    setSelectedPage(state, action) {
      if(action.payload) {
        state.selectedPage = action.payload;
      }
      else{
        state.selectedPage = null
      }
    },

    setPageNeedsUpdate(state) {
      state.pageNeedsUpdate = state.selectedPage;
    },

    resetPageNeedsUpdate(state) {
      state.pageNeedsUpdate = false;
    },

    refreshNavBar(state) {
      state.refreshNavBar = state.refreshNavBar + 1;
    },

    setNavBar(state, action) {
      state.navBar = action.payload;
    },

    setIsPagesListEmpty(state,action){
      state.isPageListEmpty = action.payload
    }


  },
});

export const pagesActions = pagesSlice.actions;

export default pagesSlice;
