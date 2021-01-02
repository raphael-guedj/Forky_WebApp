import React, { useEffect, useState } from "react";
import ProfilCard from "../components/ProfilCard";
import NavBar from "../components/NavBar";
import InvitCard from "../components/InvitCard";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../App.css";

const InvitPage = ({ userState, location }) => {
  const userData = location.state;
  console.log(userData);
  return (
    <div>
      <NavBar />
      <Container className="layout-profil">
        <InvitCard userData={userData} />
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(InvitPage);
