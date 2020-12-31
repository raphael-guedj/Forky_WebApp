import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import NavBar from "../components/NavBar";
import MyProfilCard from "../components/MyProfilCard";
import "../App.css";

const MyProfil = () => {
  return (
    <div>
      <NavBar />
      <Container className="layout-profil">
        <MyProfilCard />
      </Container>
    </div>
  );
};

export default MyProfil;
