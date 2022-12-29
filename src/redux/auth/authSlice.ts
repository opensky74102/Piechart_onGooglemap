import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedin: false,
    isOpenLogin: false,
    isOpenSignUp: false,
  },
  reducers: {
    openLoginForm: (state) => {
      state.isOpenLogin = true;
      state.isOpenSignUp = false;
    },
    openSignUpForm: (state) => {
      state.isOpenLogin = false;
      state.isOpenSignUp = true;
    },
    closeForm:(state)=>{
      state.isOpenLogin = false;
      state.isOpenSignUp = false;
    }
  }
})

export const { openLoginForm, openSignUpForm, closeForm } = authSlice.actions;
export const isLoggedin = (state:any)=>state.auth.isLoggedin;
export const isOpenLogin = (state:any) => state.auth.isOpenLogin;
export const isOpenSignUp = (state:any)=>state.auth.isOpenSignUp;
export default authSlice.reducer;