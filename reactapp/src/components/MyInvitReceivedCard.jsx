import React, { useState, useEffect } from "react";

import { Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { ImCancelCircle } from "react-icons/im";
import { HiCheckCircle } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import { GiHotMeal } from "react-icons/gi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsBriefcaseFill } from "react-icons/bs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "../App.css";

const MyInvitReceived = ({ dataInvit }) => {
  const [open, setOpen] = useState(false);
  const [listUser, setListUser] = useState();
  const [isModalCancelVisible, setModalCancelVisible] = useState(false);
  const [isModalAcceptVisible, setModalAcceptVisible] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      let rawResponse = await fetch(`/mydataprofile?id=${dataInvit.id_sender}`);
      let response = await rawResponse.json();
      setListUser(response.user);
    };
    getUserData();
  }, []);

  const toggleModalCancel = () => {
    const cancelInvitation = async () => {
      let rawResponse = await fetch(`/cancelinvit?id=${dataInvit._id}`);
      let response = await rawResponse.json();
      if (response.result) {
        setModalCancelVisible(true);
      }
    };
    cancelInvitation();
  };

  const toggleModalAccept = () => {
    const acceptInvitation = async () => {
      let rawResponse = await fetch(`/acceptinvit?id=${dataInvit._id}`);
      let response = await rawResponse.json();
      if (response.result) {
        setModalAcceptVisible(true);
      }
    };
    acceptInvitation();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledBadge = withStyles((theme) =>
    listUser.isConnected
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
      maxWidth: "90%",
      Height: "70%",
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

  let date = new Date(dataInvit.date);
  let dateFormat = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return !listUser ? (
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
        <Card
          style={{
            backgroundColor: "#ececec",
            borderColor: "#418581",
          }}
          className="card-invitation"
        >
          <div
            style={{
              display: "flex",
              width: 500,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
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
                  src={listUser.photo}
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
                    Votre déjeuner avec {listUser.name}
                  </h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BsBriefcaseFill style={{ fontSize: 20 }} color="#f9b34c" />
                  <h5 className="title-invitationCard">
                    {listUser.profession}
                  </h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <HiOutlineLocationMarker
                    style={{ fontSize: 20 }}
                    color="#f9b34c"
                  />
                  <h5 className="title-invitationCard">
                    {listUser.arrondissement} {listUser.city}
                  </h5>
                </div>
              </CardContent>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <div style={{ cursor: "pointer" }}>
                  <ImCancelCircle
                    style={{ fontSize: 35 }}
                    color="#eb4d4b"
                    onClick={toggleModalCancel}
                  />

                  <HiCheckCircle
                    style={{ fontSize: 42, marginLeft: 5 }}
                    color="#418581"
                    onClick={toggleModalAccept}
                  />
                </div>
                <Modal
                  className={classes.modal}
                  open={isModalCancelVisible}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={isModalCancelVisible}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                      className={classes.paper}
                    >
                      <h3
                        style={{
                          color: "#418581",
                          fontWeight: "bold",
                        }}
                      >
                        Votre déjeuner avec {listUser.name} a été annulé !
                      </h3>
                    </div>
                  </Fade>
                </Modal>

                <Modal
                  className={classes.modal}
                  open={isModalAcceptVisible}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={isModalAcceptVisible}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                      className={classes.paper}
                    >
                      <h3
                        style={{
                          color: "#418581",
                          fontWeight: "bold",
                        }}
                      >
                        Super ! Vous avez accepté l'invitation de{" "}
                        {listUser.name}. A vos Forky 🍴
                      </h3>
                    </div>
                  </Fade>
                </Modal>
                <div>
                  <Button outline className="btn-details" onClick={handleOpen}>
                    Détails de l'invitation
                  </Button>
                </div>
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
                      <h4
                        style={{
                          color: "#418581",
                          marginTop: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Recap de mon invitation
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          size={15}
                          color="#c7d3dc"
                        />
                        <h6
                          style={{
                            paddingLeft: 10,

                            marginBottom: 0,
                          }}
                        >
                          {dateFormat}
                        </h6>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faClock}
                          size={15}
                          color="#c7d3dc"
                        />
                        <h6
                          style={{
                            paddingLeft: 10,
                            marginBottom: 0,
                          }}
                        >
                          {dataInvit.heure === 12
                            ? "12h"
                            : dataInvit.heure === 12.5
                            ? "12h30"
                            : dataInvit.heure === 13
                            ? "13h"
                            : dataInvit.heure === 13.5
                            ? "13h30"
                            : "14h"}
                        </h6>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <AiOutlineClockCircle size={20} color="#c7d3dc" />
                        <h6
                          style={{
                            paddingLeft: 10,
                            marginBottom: 0,
                          }}
                        >
                          {dataInvit.temps_propose === 0.5
                            ? "30min"
                            : dataInvit.temps_propose === 1
                            ? "1h"
                            : dataInvit.temps_propose === 1.5
                            ? "1h30"
                            : "2h"}
                        </h6>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <HiOutlineLocationMarker size={20} color="#c7d3dc" />
                        <h6
                          style={{
                            paddingLeft: 10,
                            marginBottom: 0,
                          }}
                        >
                          {dataInvit.lieu_propose}
                        </h6>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <HiOutlineLocationMarker size={20} color="#c7d3dc" />

                        <h6
                          style={{
                            paddingLeft: 10,
                            marginBottom: 0,
                          }}
                        >
                          {dataInvit.adresse}
                        </h6>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <GiHotMeal size={20} color="#c7d3dc" />
                        <h6
                          style={{
                            paddingLeft: 10,
                            marginBottom: 0,
                          }}
                        >
                          {dataInvit.cuisine_propose}
                        </h6>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <FiBookOpen size={20} color="#c7d3dc" />
                        <h6
                          style={{
                            paddingLeft: 10,
                            marginBottom: 0,
                          }}
                        >
                          {dataInvit.message}
                        </h6>
                      </div>
                      <Button
                        className="btn-closeModal"
                        onClick={() => handleClose()}
                      >
                        Retour
                      </Button>
                    </div>
                  </Fade>
                </Modal>
              </CardContent>
            </div>
          </div>
        </Card>
      </Col>
    </div>
  );
};

export default MyInvitReceived;
