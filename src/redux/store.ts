import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import pieSlice from './pie/pieSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    pie:pieSlice
  },
});