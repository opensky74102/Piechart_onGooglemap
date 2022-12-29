import { ToastContainer, toast } from 'react-toastify';

export const ToastError = (msg:string)=>{
    toast.error(msg, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success toast-error',
      toastId: 'notifyToast'
    });
}
export const ToastInfo = (msg:string)=>{
    toast.info(msg, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success toast-info',
      toastId: 'notifyToast'
    });
}
export const ToastSuccess = (msg:string)=>{
    toast.success(msg, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success toast-success',
      toastId: 'notifyToast'
    });
}
