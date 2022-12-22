import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import SearchBtn from "../SearchBtn";
import "./navbar.scss";
import logo from "../../assets/images/logo.png";

function Navbar() {

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
          <div className="header__content__mainmenu">
            <div className="dropdown">
              <button className="dropbtn">main menu
              <FontAwesomeIcon icon={faCaretDown} className="fa_icon" color="white" size="lg" />
              </button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
          </div>
          <div className="header__content__signin_btn">
            <FontAwesomeIcon icon={faSignIn} className="fa_icon" color="white" size="sm" />
            Sign In
          </div>
          <a href="#" className="header__content__right__btn">Add Spectrum</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;