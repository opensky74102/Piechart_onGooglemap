import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "./PopupForm.scss";
import { ToastError, ToastInfo, ToastSuccess } from '../../helpers/toast.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { closeForm } from '../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';



export default function LoginForm() {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    email: yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: yup.string().required("Password is required")
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm(
    {
      resolver: yupResolver(validationSchema)
    }
  );

  const onSubmit = () => {

  }

  const onError = (errors: any, e: any) => {

    for (let key in errors) {
      ToastError(errors[key].message);
    }
  };
  return (
    <form
      className="popup_form active"
      onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="popup_form_title">
        <h2>Login</h2>
      </div>
      <div className='close_part' onClick={()=>dispatch(closeForm())}>
        <FontAwesomeIcon icon={faTimes} className="fa_icon" size="sm" />
      </div>
      <div className="popup_form_content">

        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="email">
              E-mail
            </label>
          </div>
          <div className='input_part'>
            <input
              id="email"
              type="text"
              {...register("email")}
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="password">
              Password
            </label>
          </div>
          <div className='input_part'>
            <input
              id="password"
              type="password"
              {...register("password")}
            />
          </div>
        </div>
        <div className='form_input'>
          <button>Submit</button>
        </div>
      </div>
    </form>

  )
}