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
              <a href="#">Main Menu</a>
            </div>
            <div className="dropdown-list">
              <li>Main</li>
              <li>Main</li>
              <li>Main</li>
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