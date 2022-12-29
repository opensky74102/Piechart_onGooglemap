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




export default function RegisterForm() {
const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    passwd1: yup.string().required("Password is required"),
    passwd2: yup.string().required('Password is mendatory').oneOf([yup.ref('password')], 'Passwords does not match'),
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
      ToastInfo(errors[key].message);
    }
  };
  return (
    <form
      className="popup_form active"
      onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="popup_form_title">
        <h2>Register</h2>
      </div>
      <div className='close_part' onClick={()=>dispatch(closeForm())}>
        <FontAwesomeIcon icon={faTimes} className="fa_icon" size="sm" />
      </div>
      <div className="popup_form_content">
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="firstname">
              First Name
            </label>
          </div>
          <div className='input_part required'>
            <input
              id="firstname"
              type="text"
              {...register("firstname")}
              className='required'
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="lastname">
              Last Name
            </label>
          </div>
          <div className='input_part required'>
            <input
              id="lastname"
              type="text"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="company">
              Company
            </label>
          </div>
          <div className='input_part'>
            <input
              id="company"
              type="text"
              {...register("company")}
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="url">
              Web site
            </label>
          </div>
          <div className='input_part'>
            <input
              id="url"
              type="text"
              {...register("url")}
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="tax_number">
              Tax number
            </label>
          </div>
          <div className='input_part'>
            <input
              id="tax_number"
              type="text"
              {...register("tax_number")}
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="email">
              E-mail
            </label>
          </div>
          <div className='input_part required'>
            <input
              id="email"
              type="text"
              {...register("email")}
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="passwd1" >
              Password
            </label>
          </div>
          <div className='input_part required'>
            <input
              id="passwd1"
              type="password"
              {...register("passwd1")}
            />
          </div>
        </div>
        <div className='form_input'>
          <div className='label_part'>
            <label htmlFor="passwd2">
              Confirm Password
            </label>
          </div>
          <div className='input_part required'>
            <input
              id="passwd2"
              type="password"
              {...register("passwd2")}
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