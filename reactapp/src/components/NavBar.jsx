import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo_Forky_dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-home" />
          </Link>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
            <a href="#">Accueil</a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="#">Mes Forkys</a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="#">Profil</a>
          </li>
          <li className="option-noti" onClick={closeMobileMenu}>
            <FontAwesomeIcon icon={faBell} className="notif" />
          </li>
        </ul>
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <FontAwesomeIcon icon={faTimes} className="menu-icon" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default NavBar;
