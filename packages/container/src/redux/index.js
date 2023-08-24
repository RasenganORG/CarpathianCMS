import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import pagesSlice from './pagesSlice';
import notificationSlice from './notificationSlice';


const store = configureStore({
  reducer:{
    user: userSlice.reducer,
    pages: pagesSlice.reducer,
    notification: notificationSlice.reducer,
  }
})

export default store

