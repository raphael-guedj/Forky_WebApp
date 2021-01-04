import React from "react";
import NavBar from "../components/NavBar";
import InvitCard from "../components/InvitCard";
import { Container } from "reactstrap";
import "../App.css";

const InvitPage = ({ location }) => {
  const userData = location.state;

  return (
    <div>
      <NavBar />
      <Container className="layout-profil">
        <InvitCard userData={userData} />
      </Container>
    </div>
  );
};

export default InvitPage;
