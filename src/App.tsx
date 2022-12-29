import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useSelector, useDispatch } from 'react-redux';

import { isOpenLogin, isOpenSignUp } from './redux/auth/authSlice';

function App() {
  const openLoginVar = useSelector(isOpenLogin);
  const openRegisterVar = useSelector(isOpenSignUp);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {openLoginVar ? <LoginForm /> : null}
      {openRegisterVar ? <RegisterForm /> : null}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
