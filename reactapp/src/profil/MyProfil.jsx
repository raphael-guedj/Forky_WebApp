import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import MyProfilCard from "../components/MyProfilCard";
import "../App.css";

const MyProfil = () => {
  return (
    <div>
      <NavBar />
      <Container className="layout-profil">
        <MyProfilCard />
        <div
          style={{
            marginTop: 9,
            height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Link to="/editprofil">
              <Button className="btn-landing">Modifier mon profil</Button>
            </Link>
          </div>
          <div>
            <Link to="/">
              <Button className="btn-next">Mes Forkys</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfil;
