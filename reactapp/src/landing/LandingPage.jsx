import React from "react";
import { Container, Row, Col } from "reactstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../App.css";

const LandingPage = () => {
  let title = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#f5f3f4",
    letterSpacing: 5,
  };

  return (
    <div className="image-hero">
      <Container>
        <Row xs="12">
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="logo"
              src="../images/Logo_Forky_light.png"
              alt="logo_forky"
            ></img>
          </Col>
        </Row>
        <Row xs="1">
          <Col style={title}>
            <h1>Déjeuner,</h1>
            <h1>Rencontrer,</h1>
            <h1>Recommencer...</h1>
          </Col>
        </Row>
        <Row xs="1" lg="2" style={{ display: "flex", alignItems: "center" }}>
          {/* On appelle deux composants Sign In et Sign up */}
          <SignIn />
          <SignUp />
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
