import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import LandingPage from "./landing/LandingPage";

const Navigation = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
    </Switch>
  );
};

export default Navigation;
