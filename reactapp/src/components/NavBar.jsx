import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../assets/Logo_Forky_dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";
import "../App.css";

const NavBar = ({ userState }) => {
  const [click, setClick] = useState(false);
  const [isNotifUnRead, setIsNotifUnRead] = useState();

  useEffect(() => {
    const checkNotif = async () => {
      let rawResponse = await fetch(`/checkstatusnotif?id=${userState.id}`);
      let response = await rawResponse.json();
      setIsNotifUnRead(response.notifUnread);
    };
    checkNotif();
  }, []);

  const updateNotif = async () => {
    let rawResponse = await fetch(`/updatenotif?id=${userState.id}`);
    let response = await rawResponse.json();
  };

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  return (
    <div className="nav-header">
      <div className="logo-nav">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-home" />
          </Link>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/">Accueil</Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="myforkys">Mes Forkys</Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/myprofil">Profil</Link>
          </li>
          <li className="option-noti" onClick={closeMobileMenu}>
            <Link to="/notification" onClick={() => updateNotif()}>
              {isNotifUnRead ? (
                <Badge color="secondary" variant="dot">
                  <FontAwesomeIcon icon={faBell} className="notif" />
                </Badge>
              ) : (
                <FontAwesomeIcon icon={faBell} className="notif" />
              )}
            </Link>
          </li>
        </ul>
      </div>
      {/* Nav Bar responsive  */}
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

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(NavBar);
