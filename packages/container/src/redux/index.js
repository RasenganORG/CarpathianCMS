import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import pagesSlice from './pagesSlice';


const store = configureStore({
  reducer:{
    user: userSlice.reducer,
    pages: pagesSlice.reducer,
  }
})

export default store

