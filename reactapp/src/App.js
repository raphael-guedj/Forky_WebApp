import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import Navigation from "./Navigation";

const store = createStore(combineReducers({}));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Navigation />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
