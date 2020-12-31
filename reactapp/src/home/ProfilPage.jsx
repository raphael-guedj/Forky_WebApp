import React, { useEffect, useState } from "react";
import ProfilCard from "../components/ProfilCard";
import NavBar from "../components/NavBar";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import "../App.css";

const ProfilPage = ({ userState, location }) => {
  const [profilEmpty, setProfilEmpty] = useState(true);
  const userData = location.state;

  let history = useHistory();

  const handleSignUp = async () => {
    let rawResponse = await fetch(`/mydataprofile?id=${userState.id}`);
    let response = await rawResponse.json();
    if (response.result) {
      console.log(response.result);
      setProfilEmpty(false);

      history.push({
        pathname: "/",
        state: userData,
      });
    } else {
      setProfilEmpty(true);
      history.push("/editprofil");
    }
  };

  useEffect(() => {
    console.log(profilEmpty);
  }, [profilEmpty]);

  return (
    <div>
      <NavBar />
      <Container className="layout-profil">
        <ProfilCard userData={userData} />
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Link to="/">
              <Button className="btn-landing">Retour à l'accueil</Button>
            </Link>
          </div>
          <div>
            <Button
              className="btn-next"
              onClick={() => {
                handleSignUp();
              }}
            >
              Envoyer une invitation
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(ProfilPage);
