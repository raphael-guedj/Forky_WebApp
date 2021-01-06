import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import ForkysCard from "./ForkysCard";

const CurrentInvit = ({ userState }) => {
  const [myInvitations, setMyInvitations] = useState([]);

  console.log(myInvitations);

  useEffect(() => {
    const getMyInvitations = async () => {
      let response = await fetch(`/current-invit?id=${userState.id}`);
      let responseJson = await response.json();
      // console.log(responseJson);
      setMyInvitations(responseJson.invitations);
    };
    getMyInvitations();
  }, []);

  const handleRefresh = async () => {
    let response = await fetch(`/current-invit?id=${userState.id}`);
    let responseJson = await response.json();
    setMyInvitations(responseJson.invitations);
  };

  return (
    <div onClick={() => handleRefresh()}>
      <Row xs="1">
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <FontAwesomeIcon
            icon={faSync}
            className="icon-about"
            style={{ cursor: "pointer", color: "#f9b34c", fontSize: 26 }}
          />
        </Col>
      </Row>
      {/* On boucle sur le composant ForkysCard qui affichera une carte correspondant à un élément du tableau (objet) */}
      <Row xs="1">
        {myInvitations.map((invit, i) => (
          <ForkysCard invit={invit} key={i} />
        ))}
      </Row>
    </div>
  );
};
function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(CurrentInvit);
