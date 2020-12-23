import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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
  FormText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEyeSlash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const SignUp = ({ setReduxUser }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  const handleSignUp = async () => {
    setPasswordError(false);
    setSignupError(false);
    setEmptyField(false);
    if (
      pseudo !== "" &&
      email !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (password === passwordConfirm) {
        setPasswordError(false);

        let rawResponse = await fetch("/sign-up", {
          method: "post",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `name=${pseudo}&email=${email}&password=${password}`,
        });
        let response = await rawResponse.json();
        console.log("response user", response);
        if (response.result) {
          setReduxUser({
            pseudo: response.user.name,
            id: response.user._id,
            token: response.user.token,
          });
          localStorage.setItem("userToken", response.userExists.token);
          setSignupError(false);
        } else {
          setSignupError(true);
        }
      } else {
        setPasswordError(true);
      }
    } else {
      setEmptyField(true);
    }
  };

  let passwordText = {
    textAlign: "center",
    color: "#eb4d4b",
    fontSize: 15,
  };

  return (
    <Col>
      <div className="Sign">
        <Form>
          <h3 className="title-form">S'inscrire</h3>
          <FormGroup>
            <Label for="exampleEmail">Nom</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faUserCircle} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Votre nom"
                required
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
              ></Input>
            </InputGroup>
          </FormGroup>
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
                id="emailSignUp"
                placeholder="Entrez votre email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="password">Mot de passe</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                name="password"
                id="passwordSignUp"
                placeholder="Entrez votre mot de passe"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="password">Confirmez votre mot de passe</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                name="password"
                id="passwordConfirmSignUp"
                placeholder="Confirmez votre mot de passe"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
              ></Input>
            </InputGroup>
          </FormGroup>

          {passwordError && (
            <h5 style={passwordText}>
              Les deux mots de passe ne sont pas identiques
            </h5>
          )}
          {signupError && (
            <h5 style={passwordText}>L'email existe déjà en base de donnée</h5>
          )}
          {emptyField && (
            <h5 style={passwordText}>L'un des champs est vide.</h5>
          )}
          <Button
            className="btn-landing"
            onClick={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            Inscrivez moi
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
      console.log("dispatch", user);
    },
  };
}

export default connect(null, mapDispatchToProps)(SignUp);
