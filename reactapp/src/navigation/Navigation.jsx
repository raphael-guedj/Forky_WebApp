import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../landing/LandingPage";
import HomePage from "../home/HomePage";
import ProfilPage from "../home/ProfilPage";
import EditProfil from "../profil/EditProfil";
import MyProfil from "../profil/MyProfil";
import SettingsPage from "../profil/SettingsPage";
import InvitPage from "../home/InvitPage";
import ForkyPage from "../myforkys/MyForkyPage";
import NotifPage from "../notification/NotifPage";

const Navigation = ({ setReduxUser, userState }) => {
  const [token, setToken] = useState(null);

  //on recupere le token et on le place dans un etat à l'initialisation
  useEffect(() => {
    const getUser = () => {
      var token = localStorage.getItem("userToken");
      // console.log(token);
      setToken(token);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserDB = async () => {
      if (token) {
        let rawResponse = await fetch(`/get-user?token=` + token);

        let response = await rawResponse.json();
        // console.log("ma réponse", response);
        //On envoi dans le store Redux, le nom, l'id et le token afin qu'il soit disponible partout
        setReduxUser({
          pseudo: response.user.name,
          id: response.user._id,
          token: response.user.token,
        });
        setToken(response.user.token);
      }
    };
    getUserDB();
    // eslint-disable-next-line
  }, [token]);

  //Condition si le token existe alors on est automatiquement redirigé vers la homepage sinon on affiche le landing
  return userState.token ? (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/userprofil" component={ProfilPage} />
      <Route path="/editprofil" component={EditProfil} />
      <Route path="/myprofil" component={MyProfil} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/sendinvitation" component={InvitPage} />
      <Route path="/myforkys" component={ForkyPage} />
      <Route path="/notification" component={NotifPage} />
    </Switch>
  ) : (
    <Route path="/" component={LandingPage} />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
    },
  };
}

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
