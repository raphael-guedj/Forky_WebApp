import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import MyProfilCard from "../components/MyProfilCard";
import "../App.css";

const SettingsPage = ({ setReduxUser, userState }) => {
  const handleLogOut = async () => {
    await fetch(`/logout?token=${userState.token}`);

    localStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
  };

  const handleDeleteUser = async () => {
    await fetch(`/delete-user?id=${userState.id}`);

    localStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
  };
  return (
    <div>
      <NavBar />
      <Container className="layout-profil">
        <Row>
          <Button className="btn-landing" onClick={() => handleLogOut()}>
            Déconnexion
          </Button>
          <Button className="btn-next" onClick={() => handleDeleteUser()}>
            Supprimer mon profil
          </Button>
        </Row>
      </Container>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
      // console.log("dispatch", pseudo, id, token);
    },
  };
}

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
