import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import { Container, Row, Col } from "reactstrap";
import HomeCard from "../components/HomeCard";

const HomePage = ({ userState }) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(`/alluser?id=${userState.id}`);
      let response = await rawResponse.json();
      // console.log(response);
      setListUser(response.userExcl);
    };
    getUser();
  }, []);

  let title = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: " #418581",
    letterSpacing: 5,
  };
  return (
    <div>
      <NavBar />

      <Container className="home-head">
        <Row xs="1">
          <Col style={title}>
            <h1>Déjeuner,</h1>
            <h1>Rencontrer,</h1>
            <h1>Recommencer...</h1>
          </Col>
        </Row>
        <Row xs="1" md="2" xl="3">
          {listUser.map((user, i) => (
            <HomeCard key={user._id} dataUser={user} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log("state", state.user.id);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(HomePage);
