import axios from "axios";
import { ToastInfo, ToastSuccess, ToastError } from '../helpers/toast.helper';
import { setLocalStorage, getLocalStorage, clearLocalStorage } from "../utils/storageUtil";
import history from "../utils/history";
import store from "../redux/store";
import { clearLoading, setPiesData, setProjectList } from '../redux/pie/pieSlice';
import { fetch, store as save, update, destroy } from "../utils/httpUtil";
const API_URL = process.env.REACT_APP_API_URL || "";

export const pieSaveRequest = async (data: any) => {
  if (data.pies.length === 0) {
    ToastInfo('You must have at least one pie chart');
    store.dispatch(clearLoading())
    return;
  }
  save(API_URL, '/pies', data).then((res) => {
    store.dispatch(clearLoading())
    getProjectList();
    ToastSuccess("Your pie charts have saved successfully");

  }).catch((err) => {
    let { status, data } = err.response;
    store.dispatch(clearLoading())
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
export const getPieDetailById = async (id: number) => {
  let user_id = getLocalStorage('user_id');
  fetch(API_URL, '/pies/' + user_id + '/' + id)
    .then((res) => {
      store.dispatch(setPiesData(res.data.data))
    })
    .catch((err) => {
      ToastError(err.message)
    })
}
export const getProjectList = async () => {
  let user_id = getLocalStorage('user_id');
  fetch(API_URL, '/pies/' + user_id)
    .then((res) => {
      let {status, data} = res.data;
      store.dispatch(setProjectList(data));
    })
}