import React, { useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Col } from "reactstrap";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { BsBriefcaseFill, BsGeoAlt } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../App.css";

const HomeCard = ({ dataUser }) => {
  /*Avatar et badge from material UI */
  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }))(Badge);

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
  }));

  const classes = useStyles();

  if (!dataUser) {
    return (
      <div>
        <h1 style={{ fontSize: 25, color: "#eb4d4b", textAlign: "center" }}>
          Aucun utilisateur enregistré sur notre base, réessayez plus tard !
        </h1>
      </div>
    );
  }

  return (
    <Col>
      <Card className="card-layout">
        {/* useLocation pour faire passer un objet dans le link */}
        <Link
          to={{
            pathname: "/userprofil",
            state: dataUser,
          }}
          className="link-card"
        >
          <CardBody className="layout-headercard">
            <CardTitle tag="h4" style={{ fontWeight: 700 }}>
              {dataUser.name}
            </CardTitle>

            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faUtensils} className="icon-card" />
              <FontAwesomeIcon icon={faUtensils} className="icon-card" />
              <FontAwesomeIcon icon={faUtensils} className="icon-card-empty" />
              <p className="text-distance">
                {" "}
                {Math.floor(Math.random() * 20) + 1} déjeuners
              </p>
            </div>
          </CardBody>

          <div className="layout-imagelocalisation">
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              variant="dot"
            >
              <Avatar
                src="./images/profile.jpg"
                alt="avatar"
                className={classes.large}
              />
            </StyledBadge>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsGeoAlt className="icon-card-big" />
              <div className="layout-localisation">
                <CardSubtitle tag="h6" className="mb-2">
                  {dataUser.arrondissement} {dataUser.city}
                </CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2">
                  Situé à {Math.floor(Math.random() * 999)}m
                </CardSubtitle>
              </div>
            </div>
          </div>

          <CardBody className="layout-job">
            <CardSubtitle>
              <BsBriefcaseFill className="icon-card" />
              {dataUser.profession}
            </CardSubtitle>
          </CardBody>
        </Link>
      </Card>
    </Col>
  );
};

export default HomeCard;
