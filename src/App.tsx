import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useSelector, useDispatch } from 'react-redux';

import { isOpenLogin, isOpenSignUp } from './redux/auth/authSlice';
import { isOpenFixedModal, isLoading } from './redux/pie/pieSlice';
import FixedModal from './components/FixedModal';
import Spinner from './components/Spinner';
import SidePopUp from './components/SidePopup';
import { isAuthenticated } from './utils/jwtUtil';

function App() {
  const openLoginVar = useSelector(isOpenLogin);
  const openRegisterVar = useSelector(isOpenSignUp);
  const openFixedModal = useSelector(isOpenFixedModal);
  const loading = useSelector(isLoading);
  useEffect(()=>{

  })
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {openLoginVar ? <LoginForm /> : null}
      {openRegisterVar ? <RegisterForm /> : null}
      {openFixedModal ? <FixedModal /> : null}
      {loading?<Spinner/>:null}
      {isAuthenticated()?<SidePopUp/>:null}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
