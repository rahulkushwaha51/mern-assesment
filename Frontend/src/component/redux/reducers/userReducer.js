import { createReducer } from "@reduxjs/toolkit";

const loginRequest = 'loginRequest';
const loginSuccess = 'loginSuccess';
const loginFail = 'loginFail';

const signUpRequest = 'signUpRequest';
const signUpSuccess = 'signUpSuccess';
const signUpFail = 'signUpFail';

const logoutRequest = 'logoutRequest';
const logoutSuccess = 'logoutSuccess';
const logoutFail = 'logoutFail';

const clearError = 'clearError';
const clearMessage = 'clearMessage';

const userReducer = createReducer({}, (builder) => {
  builder

    .addCase(signUpRequest, (state) => {
      state.loading = true;
    })
    .addCase(signUpSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase(signUpFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(loginRequest, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase(loginFail, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;

    })
  
    .addCase(logoutSuccess, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    })
    .addCase(logoutFail, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;

    })


    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(clearMessage, (state) => {
      state.message = null;
    });
});
export default userReducer;
