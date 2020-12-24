import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../landing/LandingPage";
import HomePage from "../home/HomePage";

const Navigation = ({ setReduxUser, userState }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getUser = () => {
      var token = localStorage.getItem("userToken");
      // console.log(token);
      setToken(token);
    };
    getUser();

    // localStorage.removeItem("userToken");
  }, []);

  useEffect(() => {
    const getUserDB = async () => {
      if (token) {
        let rawResponse = await fetch(`/get-user?token=` + token);

        let response = await rawResponse.json();
        console.log("ma réponse", response);

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

  return userState.token ? (
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  ) : (
    <Route path="/" exact component={LandingPage} />
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
