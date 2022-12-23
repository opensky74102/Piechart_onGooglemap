import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import SearchBtn from "../SearchBtn";
import "./navbar.scss";
import logo from "../../assets/images/logo.png";

function Navbar() {
  const [listOpen, setListOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const handleClickOutside = () => {
    setListOpen(false);
  }
  const toggleList = () => {
    setListOpen(!listOpen)
  }
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__content__left">
          <Link to="/" className="header__content__logo">
            <img src={logo} className="header__content__logo__img" alt="" />
          </Link>
          {/* <SearchBtn /> */}
        </div>
        <div className="header__content__right">
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
                  <li className="dd-list-item">Save</li>
                  <li className="dd-list-item">Rename Project</li>
                  <li className="dd-list-item">Save As</li>
                </ul>) : null
              }
            </div>
          </div>
          <div className="header__content__signin_btn">
            <FontAwesomeIcon icon={faSignIn} className="fa_icon" color="white" size="sm" />
            Sign In
          </div>
          {/* <a href="#" className="header__content__right__btn">Add Spectrum</a> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;