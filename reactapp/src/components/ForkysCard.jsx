import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCheck,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ImCancelCircle } from "react-icons/im";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import "../App.css";

const ForkysCard = ({ invit, userState }) => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      if (invit.id_sender === userState.id) {
        let response = await fetch(`/getmydata?id=${invit.id_receiver}`);
        let responseJson = await response.json();
        setUser(responseJson.myUser);
      } else {
        let response = await fetch(`/getmydata?id=${invit.id_sender}`);
        let responseJson = await response.json();
        setUser(responseJson.myUser);
      }
    };
    getUser();
  }, [invit]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelInvit = async () => {
    let response = await fetch(`/cancelinvit?id=${invit._id}`);
    let responseJson = await response.json();
    if (responseJson.result) {
      setOpen(false);
    }
  };

  const StyledBadge = withStyles((theme) =>
    user.isConnected
      ? {
          badge: {
            backgroundColor: "#44b700",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          },
        }
      : {
          badge: {
            backgroundColor: "#eb4d4b",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          },
        }
  )(Badge);

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // maxWidth: "90%",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #abd6d3",
      borderRadius: 5,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      fontFamily: "Roboto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "25%",
    },
  }));

  const classes = useStyles();

  let date = new Date(invit.date);
  let dateFormat = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return !user ? (
    <></>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Col>
        <div className="layout-Myinvitation">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            style={{ fontSize: 25 }}
            color={
              (invit.statut_invit === "Refusé" && "#eb4d4b") ||
              (invit.statut_invit === "En cours" && "#ffa500") ||
              (invit.statut_invit === "Accepté" && "#418581")
            }
          />
          <h5 style={{ paddingLeft: 15, color: "0b090a" }}>{dateFormat}</h5>
        </div>
      </Col>
      <Col>
        <Card
          style={{
            backgroundColor: "#ececec",
            borderColor:
              (invit.statut_invit === "Refusé" && "#eb4d4b") ||
              (invit.statut_invit === "En cours" && "#ffa500") ||
              (invit.statut_invit === "Accepté" && "#418581"),
          }}
          className="card-invitation"
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                variant="dot"
              >
                <Avatar
                  src={user.photo}
                  alt="avatar"
                  className={classes.large}
                />
              </StyledBadge>

              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
                  <h5 className="title-invitationCard">
                    Votre déjeuner avec {user.name}
                  </h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ fontSize: 20 }}
                    color="#c7d3dc"
                  />
                  <h5 className="title-invitationCard">
                    Rendez-vous:{" "}
                    {(invit.heure === 12 && "12h") ||
                      (invit.heure === 12.5 && "12h30") ||
                      (invit.heure === 13 && "13h") ||
                      (invit.heure === 13.5 && "13h30") ||
                      (invit.heure === 14 && "14h")}
                  </h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <HiOutlineLocationMarker
                    style={{ fontSize: 20 }}
                    color="#c7d3dc"
                  />
                  <h5 className="title-invitationCard">
                    Restaurant: {invit.lieu_propose}
                  </h5>
                </div>
              </CardContent>
            </div>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon icon={faUtensils} className="icon-card" />
                <FontAwesomeIcon icon={faUtensils} className="icon-card" />
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="icon-card-empty"
                />
                <p className="text-distance">
                  {" "}
                  {Math.floor(Math.random() * 20) + 1} déjeuners
                </p>
              </div>
              <div>
                <Button
                  outline
                  style={{
                    borderColor:
                      (invit.statut_invit === "Refusé" && "#eb4d4b") ||
                      (invit.statut_invit === "En cours" && "#ffa500") ||
                      (invit.statut_invit === "Accepté" && "#418581"),
                    borderWidth: 1,
                  }}
                  className="btn-detailsinvit"
                  onClick={handleOpen}
                >
                  Détails
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </Col>
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {invit.statut_invit === "Accepté" ? (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ fontSize: 70 }}
                color="#F9B34C"
              />
            ) : invit.statut_invit === "Refusé" ? (
              <ImCancelCircle style={{ fontSize: 70 }} color="#F9B34C" />
            ) : (
              <FontAwesomeIcon
                icon={faClock}
                style={{ fontSize: 70 }}
                color="#F9B34C"
              />
            )}
            <h5
              style={{
                color: "#418581",
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              {invit.statut_invit === "Accepté"
                ? "CONFIRMATION"
                : invit.statut_invit === "Refusé"
                ? "ANNULATION"
                : "EN ATTENTE"}
            </h5>
            <h6
              style={{
                marginTop: 20,
                textAlign: "center",
                padding: 5,
                fontSize: 14,
                letterSpacing: 1,
              }}
            >
              {invit.statut_invit === "Accepté"
                ? `Bonjour ${userState.pseudo}, votre déjeuner est désormais confirmé.`
                : invit.statut_invit === "Refusé"
                ? `Bonjour ${userState.pseudo}, votre déjeuner n’a pas été confirmé.`
                : `Bonjour ${userState.pseudo}, votre déjeuner avec ${user.name} est encore en attente de confirmation.`}
            </h6>
            <h5
              style={{
                marginTop: 20,
                textAlign: "center",
                padding: 5,
                fontSize: 15,
                letterSpacing: 1,
                fontWeight: "bold",
              }}
            >
              {invit.statut_invit === "Accepté"
                ? `Vous avez rendez-vous avec ${user.name} à ${
                    (invit.heure === 12 && "12h") ||
                    (invit.heure === 12.5 && "12h30") ||
                    (invit.heure === 13 && "13h") ||
                    (invit.heure === 13.5 && "13h30") ||
                    (invit.heure === 14 && "14h")
                  }.`
                : invit.statut_invit === "Refusé"
                ? `Vous pouvez proposer une nouvelle date pour déjeuner avec ${user.name}.`
                : `Si vous le souhaitez vous pouvez proposer à une autre personne disponible.`}
            </h5>
            <h6
              style={{
                marginTop: 20,
                textAlign: "center",
                padding: 5,
                fontSize: 14,
                letterSpacing: 1,
              }}
            >
              {invit.statut_invit === "Accepté"
                ? `A noter que ${user.name} vous attendra directement à ${invit.lieu_propose}, ${invit.adresse}.`
                : invit.statut_invit === "Refusé"
                ? `Ou proposer à une autre personne disponible...`
                : `Pour rappel, le déjeuner est prévu à ${invit.lieu_propose}, ${invit.adresse}.`}
            </h6>
            <h5
              style={{
                marginTop: 20,
                textAlign: "center",
                padding: 5,
                fontSize: 15,
                letterSpacing: 1,
                fontWeight: "bold",
              }}
            >
              Voici le message envoyé / reçu:
            </h5>
            <h6
              style={{
                marginTop: 5,
                textAlign: "center",
                padding: 5,
                fontSize: 14,
                fontStyle: "italic",
                letterSpacing: 1,
              }}
            >
              {invit.message}
            </h6>
            {invit.statut_invit === "Accepté" ? (
              <Button className="btn-modal" onClick={() => cancelInvit()}>
                Annuler mon RDV
              </Button>
            ) : invit.statut_invit === "Refusé" ? (
              <Link
                to={{
                  pathname: "/userprofil",
                  state: user,
                }}
              >
                <Button className="btn-modal">Proposer une autre date ?</Button>
              </Link>
            ) : (
              <Button
                className="btn-modal"
                onClick={() => {
                  history.push("/");
                }}
              >
                Inviter une nouvelle personne ?
              </Button>
            )}

            <Button className="btn-closeModal" onClick={() => handleClose()}>
              Retour
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(ForkysCard);
