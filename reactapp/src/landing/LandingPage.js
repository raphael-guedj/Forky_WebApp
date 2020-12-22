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
  FormText,
} from "reactstrap";
import logo from "../Logo_Forky_light.png";
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
        <Row xs="2">
          <Col>
            <div className="Sign">
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>
                {/* <h5 className="error-message">{errorMessage}</h5> */}
                <Button
                  style={{ width: "80px" }}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   handleSubmitSignUp(props);
                  // }}
                >
                  Sign-up
                </Button>
              </Form>
            </div>
          </Col>
          <Col>
            <div className="Sign">
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>
                {/* <h5 className="error-message">{errorMessage}</h5> */}
                <Button
                  style={{ width: "80px" }}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   handleSubmitSignUp(props);
                  // }}
                >
                  Sign-up
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
