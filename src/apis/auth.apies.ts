import axios from "axios";
import { ToastInfo, ToastSuccess, ToastError } from '../helpers/toast.helper';
import { setLocalStorage, getLocalStorage, clearLocalStorage } from "../utils/storageUtil";
import history from "../utils/history";
import store from "../redux/store";
import { closeForm } from "../redux/auth/authSlice";
const API_URL = process.env.REACT_APP_API_URL;

export const loginRequest = async (data: any) => {
  axios.post(`${API_URL}/auth/login`, data).then(res => {
    let { status, data } = res.data;
    if (status == 'success') {
      ToastSuccess("You have successfully logged in");
      setLocalStorage('token', data.token);
      setLocalStorage("user", data);
      setLocalStorage("user_id", data.id);
      history.push('/');
      store.dispatch(closeForm())
    }
  }).catch(err => {
    if (err.response === undefined) {
      ToastError('Unknown error');
      return;
    }
    let { status, data } = err.response;
    if (err.response === undefined) {
      ToastError('Unknown error');
      return;
    }
    if (status === 500) {
      ToastError("Server Interval Error")
      return;
    }
    ToastError(data.message)
  })
} 
export const registerRequest = async (data: any) => {
  axios.post(`${API_URL}/auth/register`, data).then(res => {
    let { status, data } = res.data;
    if (status == 'success') {
      ToastSuccess("You have been registered successfully")
      setLocalStorage('token', data.token);
      setLocalStorage("user", data);
      setLocalStorage("user_id", data.id);
      store.dispatch(closeForm())
      history.push('/');
    }
  }).catch(err => {
    if (err.response === undefined) {
      ToastError('Unknown error');
      return;
    }
    let { status, data } = err.response;
    if (err.response === undefined) {
      ToastError('Unknown error');
      return;
    }
    if (status === 500) {
      ToastError("Server Interval Error")
      return;
    }
    ToastError(data.message)
  })
}
export const logoutRequest = ()=>{
  clearLocalStorage('token');
  clearLocalStorage('user')
  window.location.href = "/"
}