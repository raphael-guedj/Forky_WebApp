import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import EditCard from "../components/EditCard";
import "../App.css";

const EditProfil = () => {
  const handleData = () => {
    console.log("hello");
  };
  return (
    <div>
      <NavBar />
      <Container className="layout-profil">
        <EditCard />
      </Container>
    </div>
  );
};

export default EditProfil;
