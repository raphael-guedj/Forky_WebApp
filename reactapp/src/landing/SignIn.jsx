import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const SignIn = ({ setReduxUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseOk, setResponseOk] = useState(true);

  const handleSignIn = async () => {
    let rawResponse = await fetch(`/sign-in`, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });
    let response = await rawResponse.json();

    if (response.result) {
      setResponseOk(true);
      setReduxUser({
        pseudo: response.userExists.name,
        id: response.userExists._id,
        token: response.userExists.token,
      });
      localStorage.setItem("userToken", response.userExists.token);
    } else {
      setResponseOk(false);
      setEmail("");
      setPassword("");
    }
  };

  let responseText = {
    textAlign: "center",
    fontStyle: "italic",
    color: "#eb4d4b",
    fontSize: 15,
  };

  return (
    <Col>
      <div className="sign">
        <Form>
          <h2 className="title-form">Se connecter</h2>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Entrez votre email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="email">Mot de passe</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Entrez votre mot de passe"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></Input>
            </InputGroup>
          </FormGroup>

          {!responseOk && (
            <h5 style={responseText}>Email ou mot de passe introuvable</h5>
          )}
          <Button
            className="btn-landing"
            onClick={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            Connectez moi
          </Button>
        </Form>
      </div>
    </Col>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
      // console.log("dispatch", pseudo, id, token);
    },
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
