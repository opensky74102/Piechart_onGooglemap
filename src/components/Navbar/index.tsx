import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn,faSignOut, faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import SearchBtn from "../SearchBtn";
import "./navbar.scss";
import logo from "../../assets/images/logo.png";

import { useSelector, useDispatch } from 'react-redux';
import { openLoginForm, openSignUpForm } from "../../redux/auth/authSlice";
import { addPieData, openFixedModal,closeFixedModal } from "../../redux/pie/pieSlice";
import { isAuthenticated } from "../../utils/jwtUtil";
import { logoutRequest } from "../../apis/auth.apies";

function Navbar() {
  const [listOpen, setListOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__content__left">
          <Link to="/" className="header__content__logo">
            <img src={logo} className="header__content__logo__img" alt="" />
          </Link>
          <SearchBtn />
        </div>
        <div className="header__content__right">
          {
            isAuthenticated() ? (
              <>
                <div className="header__content__mainmenu">
                  <div className="dd-wrapper">
                    <div className="dd-header" onClick={() => setListOpen(!listOpen)}>
                      <div className="dd-header-title">Main Menu <FontAwesomeIcon icon={listOpen ? faCaretRight : faCaretDown} className="fa_icon" size="lg" />
                      </div>
                    </div>
                    {
                      listOpen === true ? (<ul className="dd-list">
                        <li className="dd-list-item">New Project</li>
                        <li className="dd-list-item">Open</li>
                        <li className="dd-list-item" onClick={()=>{
                          setListOpen(false);
                          dispatch(openFixedModal());
                        }}>Save</li>
                        <li className="dd-list-item">Rename Project</li>
                        <li className="dd-list-item">Save As</li>
                      </ul>) : null
                    }
                  </div>
                </div>
                <div className="header__content__signin_btn" onClick={() => logoutRequest()}>
                  <FontAwesomeIcon icon={faSignOut} className="fa_icon" color="white" size="sm" />
                  Log out
                </div>
              </>
            ) : (
              <>
                <div className="header__content__signin_btn" onClick={() => dispatch(openLoginForm())}>
                  <FontAwesomeIcon icon={faSignIn} className="fa_icon" color="white" size="sm" />
                  Sign In
                </div>
                <div className="header__content__signin_btn" onClick={() => dispatch(openSignUpForm())}>
                  <FontAwesomeIcon icon={faSignIn} className="fa_icon" color="white" size="sm" />
                  Sign Up
                </div>
              </>
            )
          }
        </div>
      </div>
    </header>
  );
}

export default Navbar;