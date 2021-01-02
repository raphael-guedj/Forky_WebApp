import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCog } from "@fortawesome/free-solid-svg-icons";
import { BsBriefcaseFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../App.css";

const MyProfilCard = ({ userState }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");

  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }))(Badge);

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(22),
      height: theme.spacing(22),
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(`/getmydata?id=${userState.id}`);
      let response = await rawResponse.json();
      // console.log(response);
      response.myUser.name && setName(response.myUser.name);
      response.myUser.profession && setJob(response.myUser.profession);
      response.myUser.city && setCity(response.myUser.city);
      response.myUser.photo && setPhoto(response.myUser.photo);
    };
    getUser();
  }, []);

  return (
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
              <Avatar src={photo} alt="avatar" className={classes.large} />
            </StyledBadge>
            <CardContent className="layout-myprofil">
              <div style={{ display: "flex", marginTop: 20 }}>
                <FontAwesomeIcon icon={faUserCircle} className="icon-profil" />
                <h4>{name !== "" ? name : "Non renseigné"}</h4>
              </div>
              <div style={{ display: "flex", marginTop: 20 }}>
                <HiOutlineLocationMarker className="icon-profil" />
                <h4> {city !== "" ? city : "Non renseigné"}</h4>
              </div>
              <div style={{ display: "flex", marginTop: 20 }}>
                <BsBriefcaseFill className="icon-profil" />
                <h4> {job !== "" ? job : "Non renseigné"}</h4>
              </div>
              <div className="setting">
                <FontAwesomeIcon icon={faCog} className="icon-setting" />
                <Link to="/settings">
                  <h5>Accèder à vos réglages</h5>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(MyProfilCard);
