import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
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
import logo from "../Logo_Forky_light.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEyeSlash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const LandingPage = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  let title = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#f5f3f4",
    letterSpacing: 5,
  };

  return (
    <div className="image-hero">
      <Container>
        <Row xs="12">
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <img className="logo" src={logo}></img>
          </Col>
        </Row>
        <Row xs="1">
          <Col style={title}>
            <h1>Déjeuner</h1>
            <h1>Rencontrer</h1>
            <h1>Recommencer...</h1>
          </Col>
        </Row>
        <Row xs="1" lg="2" style={{ display: "flex", alignItems: "center" }}>
          <Col>
            <div className="Sign">
              <Form>
                <h3 className="title-form">Se connecter</h3>
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

                {/* <h5 className="error-message">{errorMessage}</h5> */}
                <Button
                  className="btn-landing"
                  onClick={(e) => {
                    e.preventDefault();
                    // handleSubmitSignUp(props);
                  }}
                >
                  Connectez moi
                </Button>
              </Form>
            </div>
          </Col>
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
                <FormGroup>
                  <Label for="email">Confirmez votre mot de passe</Label>
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
                      placeholder="Confirmez votre mot de passe"
                      required
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      value={passwordConfirm}
                    ></Input>
                  </InputGroup>
                </FormGroup>

                {/* <h5 className="error-message">{errorMessage}</h5> */}
                <Button
                  className="btn-landing"
                  onClick={(e) => {
                    e.preventDefault();
                    // handleSubmitSignUp(props);
                  }}
                >
                  Inscrivez moi
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
