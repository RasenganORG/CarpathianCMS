import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    config:{}
  },
  reducers: {
    openNotification(state, action) {
      state.config = action.payload
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;