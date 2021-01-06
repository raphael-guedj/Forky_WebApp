import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import MyInvitSent from "./MyInvitSentCard";

const NotifSent = ({ userState }) => {
  const [invit, setInvit] = useState([]);

  const getInvitSent = async () => {
    let rawResponse = await fetch(`/invitsent?id=${userState.id}`);
    let response = await rawResponse.json();
    setInvit(response.invit);
  };

  useEffect(() => {
    getInvitSent();
    // console.log(invit);
  }, []);

  const handleRefresh = async () => {
    let rawResponse = await fetch(`/invitsent?id=${userState.id}`);
    let response = await rawResponse.json();
    setInvit(response.invit);
  };

  return (
    <div style={{ padding: 15 }} onClick={() => handleRefresh()}>
      <Row xs="1">
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <FontAwesomeIcon
            icon={faSync}
            className="icon-about"
            style={{ cursor: "pointer", color: "#f9b34c", fontSize: 26 }}
          />
        </Col>
      </Row>
      <Row xs="1">
        {/* meme fonctionnement que le composant notif Received avec la boucle sur un tableau d'objet */}
        {invit.map((invitation, i) => (
          <MyInvitSent key={invitation._id} dataInvit={invitation} />
        ))}
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(NotifSent);
