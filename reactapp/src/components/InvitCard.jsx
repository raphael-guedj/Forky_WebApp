import React, { useState } from "react";
import { connect } from "react-redux";
import "date-fns";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { IoRestaurantOutline } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "../App.css";

const InvitCard = ({ userData, userState }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  let history = useHistory();

  const sendInvit = async () => {
    if (
      inputMessage !== "" &&
      duration !== "" &&
      date !== "" &&
      hours !== "" &&
      kitchen !== "" &&
      location !== "" &&
      address !== ""
    ) {
      let rawResponse = await fetch(`/new-invitation`, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `message=${inputMessage}&duration=${duration}&date=${date}&hour=${hours}&kitchen=${kitchen}&location=${location}&address=${address}&sender=${userState.id}&receiver=${userData._id}`,
      });

      var responseJSON = await rawResponse.json();
      if (responseJSON.response) {
        history.push("/myforkys");
      }
    } else {
      setErrorMessage(true);
    }
  };

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
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    root: {
      width: 250,
    },
    margin: {
      height: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
      maxWidth: 300,
    },
  }));

  const marks = [
    {
      value: 0,
      label: "30'",
    },
    {
      value: 30,
      label: "1h'",
    },
    {
      value: 60,
      label: "1h30'",
    },
    {
      value: 90,
      label: "2h'",
    },
  ];

  const classes = useStyles();

  return (
    <div>
      <Row xs="1">
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#418581",
          }}
        >
          <h2>Envoyez une invitation à {userData.name} !</h2>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <Card style={{ backgroundColor: "#ececec" }} className="card-image">
            <div className="layout-profil-invit">
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
              <CardContent
                style={{ paddingBottom: 0 }}
                className="layout-invitation-profil"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="icon-invitation"
                  />
                  <h5 style={{ fontSize: 17 }}>{userData.name}</h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BsBriefcaseFill className="icon-invitation" />
                  <h5 style={{ fontSize: 17 }}>{userData.profession}</h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <HiOutlineLocationMarker className="icon-invitation" />
                  <h5 style={{ fontSize: 17 }}>
                    {userData.arrondissement} {userData.city}
                  </h5>
                </div>
              </CardContent>
            </div>
          </Card>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 220 }}
            className="card-image"
          >
            <div className="layout-maindata">
              <CardContent style={{ padding: 8 }}>
                <h4 className="title-about">
                  <FiBookOpen className="icon-about" />
                  Envoyez un message:
                </h4>
              </CardContent>
              <div>
                <TextField
                  label="Entrez votre message"
                  multiline
                  rows={5}
                  style={{ width: 350, backgroundColor: "#fff" }}
                  onChange={(e) => setInputMessage(e.target.value)}
                  defaultValue={inputMessage}
                  variant="outlined"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row xs="1">
        <Col style={{ textAlign: "center" }}>
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
            }}
          >
            <FontAwesomeIcon icon={faClock} className="icon-invitation" />
            <h4 className="title-about">Combien de temps avez vous ?</h4>
          </CardContent>
          <div>
            <Slider
              track={false}
              value={duration}
              marks={marks}
              style={{ color: "#418581", width: "47%" }}
              step={30}
              max={90}
              onChange={(event, newValue) => {
                setDuration(newValue);
              }}
            />
            <div className={classes.margin} />
          </div>
        </Col>
      </Row>

      <Row xs="1">
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 220 }}
            className="card-image"
          >
            <div className="layout-maindata">
              <div style={{ marginBottom: 15 }}>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="icon-invitation"
                  />
                  <h4 className="title-about">Date proposée ?</h4>
                </CardContent>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    format="dd-MM-yyyy"
                    value={date}
                    onChange={(date) => {
                      setDate(date);
                    }}
                    minDate={new Date()}
                    minDateMessage={
                      "La date ne peut être inférieur à la date du jour"
                    }
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <CardContent style={{ padding: 0 }}>
                  <h4 className="title-about">
                    <BiTimeFive className="icon-about" />
                    Heure proposée:
                  </h4>
                </CardContent>
                <FormControl className={classes.formControl}>
                  <Select
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  >
                    <MenuItem value={12}>12h</MenuItem>
                    <MenuItem value={12.5}>12h30</MenuItem>
                    <MenuItem value={13}>13h</MenuItem>
                    <MenuItem value={13.5}>13h30</MenuItem>
                    <MenuItem value={14}>14h</MenuItem>
                  </Select>
                </FormControl>
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
            <div className="language-card">
              <GiHotMeal className="icon-profil" />
              <h5>Cuisine proposée: </h5>

              <FormControl className={classes.formControl}>
                <Select
                  placeholder="Proposez une cuisine"
                  value={kitchen}
                  onChange={(e) => setKitchen(e.target.value)}
                >
                  <MenuItem value="Africain">Africain</MenuItem>
                  <MenuItem value="Arménien">Arménien</MenuItem>
                  <MenuItem value="Asiatique">Asiatique</MenuItem>
                  <MenuItem value="Casher">Casher</MenuItem>
                  <MenuItem value="Fast food">Fast food</MenuItem>
                  <MenuItem value="Française">Français</MenuItem>
                  <MenuItem value="Halal">Halal</MenuItem>
                  <MenuItem value="Italien">Italien</MenuItem>
                  <MenuItem value="Indien">Indien</MenuItem>
                  <MenuItem value="Libanais">Libanais</MenuItem>
                  <MenuItem value="Méditérranéen">Méditérranéen</MenuItem>
                  <MenuItem value="Mexicain">Mexicain</MenuItem>
                  <MenuItem value="Oriental">Oriental</MenuItem>
                  <MenuItem value="Japonais">Japonais</MenuItem>
                  <MenuItem value="Tapas">Tapas</MenuItem>
                  <MenuItem value="Thaï">Thaï</MenuItem>
                  <MenuItem value="Végétarien">Végétarien</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="card-profil"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <div className="language-card">
                <IoRestaurantOutline className="icon-profil" />

                <Input
                  placeholder="Nom du restaurant"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  style={{ paddingLeft: 5, width: 200 }}
                />
              </div>
              <div className="language-card">
                <IoRestaurantOutline className="icon-profil" />
                <Input
                  placeholder="Adresse du restaurant"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  style={{ paddingLeft: 5, width: 200 }}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row xs="1">
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 22,
          }}
        >
          {errorMessage && (
            <h5
              style={{
                color: "#eb4d4b",
                margin: 15,
              }}
            >
              Vérifiez que toutes les informations aient bien été remplies.
            </h5>
          )}
          <Button
            className="btn-next"
            onClick={() => {
              sendInvit();
            }}
          >
            Envoyer l'invitation
          </Button>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(InvitCard);
