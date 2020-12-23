import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import user from "./reducers/user";
import Navigation from "./navigation/Navigation";

const store = createStore(combineReducers({ user }));

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
