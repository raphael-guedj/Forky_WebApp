import React, { useEffect, useState } from "react";
import "date-fns";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RiSurveyLine } from "react-icons/ri";
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
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

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
    </div>
  );
};
export default InvitCard;
