import React from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { BsBriefcaseFill } from "react-icons/bs";
import { RiSurveyLine } from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import "../App.css";

const ProfilCard = ({ userData }) => {
  //Librairie Material UI

  const StyledBadge = withStyles((theme) =>
    userData.isConnected
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
      width: theme.spacing(22),
      height: theme.spacing(22),
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <Row xs="1">
        <Col>
          <Card style={{ backgroundColor: "#ececec" }} className="card-image">
            <div className="style-image">
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                variant="dot"
              >
                <Avatar
                  src={userData.photo}
                  alt="avatar"
                  className={classes.large}
                />
              </StyledBadge>
              <CardContent className="design-maindata">
                <FontAwesomeIcon icon={faUserCircle} className="icon-profil" />
                <h3>{userData.name}</h3>
              </CardContent>
            </div>
          </Card>
        </Col>
      </Row>
      <Row xs="1" lg="2">
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="card-profil"
          >
            <div className="layout-maindata">
              <CardContent className="design-maindata">
                <HiOutlineLocationMarker className="icon-profil" />
                <h5>
                  {userData.arrondissement} {userData.city}
                </h5>
              </CardContent>
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingBottom: 2,
                  minWidth: "150%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BsBriefcaseFill className="icon-profil" />
                  <h5>{userData.profession}</h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BsBriefcaseFill className="icon-profil" />
                  <h5>{userData.secteur}</h5>
                </div>
              </CardContent>
            </div>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="card-profil"
          >
            <div className="layout-maindata">
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: 0,
                }}
              >
                <FontAwesomeIcon icon={faGlobe} className="icon-about" />
                <h4 className="title-about">Langue(s) parlée(s):</h4>
              </CardContent>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {userData.language.map((lang) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          key={lang}
                          style={{
                            color: "#418581",
                          }}
                        />
                      }
                      style={{ margin: 0 }}
                      label={
                        <Typography
                          style={{
                            margin: 0,
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {lang}
                        </Typography>
                      }
                    />
                  );
                })}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 220 }}
            className="card-profil"
          >
            <div className="layout-maindata">
              <CardContent style={{ padding: 8 }}>
                <h4 className="title-about">
                  {" "}
                  <FiBookOpen className="icon-about" />A propos:
                </h4>
              </CardContent>
              <div className="layout-about">
                <div>
                  <p>{userData.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row xs="1" lg="2">
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="card-profil"
          >
            <div className="layout-maindata">
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: 0,
                }}
              >
                <h4 className="title-about">
                  <GiHotMeal className="icon-about" />
                  Mes cuisines favorites:
                </h4>
              </CardContent>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {userData.food.map((food) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          key={food}
                          style={{
                            color: "#418581",
                          }}
                        />
                      }
                      style={{ margin: 0 }}
                      label={
                        <Typography
                          style={{
                            margin: 0,
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {food}
                        </Typography>
                      }
                    />
                  );
                })}
              </div>
            </div>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="card-profil"
          >
            <div className="layout-maindata">
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h4 className="title-about">
                  <RiSurveyLine className="icon-about" />
                  Mes envies:
                </h4>
              </CardContent>
              <div style={{ display: "flex" }}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData.wish1}
                        style={{
                          color: "#418581",
                        }}
                      />
                    }
                    style={{ margin: 0 }}
                    label={
                      <Typography
                        style={{
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        Déconnecter du travail
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData.wish2}
                        style={{
                          color: "#418581",
                        }}
                      />
                    }
                    style={{ margin: 0 }}
                    label={
                      <Typography
                        style={{
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        Découvrir un nouveau métier
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData.wish3}
                        style={{
                          color: "#418581",
                        }}
                      />
                    }
                    style={{ margin: 0 }}
                    label={
                      <Typography
                        style={{
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        Recherche d'opportunités professionnelles
                      </Typography>
                    }
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData.wish4}
                        style={{
                          color: "#418581",
                        }}
                      />
                    }
                    style={{ margin: 0 }}
                    label={
                      <Typography
                        style={{
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        Rencontrer de nouvelles personnes
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData.wish5}
                        style={{
                          color: "#418581",
                        }}
                      />
                    }
                    style={{ margin: 0 }}
                    label={
                      <Typography
                        style={{
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        Se reconvertir professionnellement
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData.wish6}
                        style={{
                          color: "#418581",
                        }}
                      />
                    }
                    style={{ margin: 0 }}
                    label={
                      <Typography
                        style={{
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        Découvrir le quartier et ses alentours
                      </Typography>
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilCard;
