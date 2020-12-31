import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCamera,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { BsBriefcaseFill } from "react-icons/bs";
import { RiSurveyLine } from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import UploadPic from "../components/UploadPic";
import "../App.css";

const EditCard = ({ userState }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [languages, setLanguages] = useState([]);
  const [food, setFood] = useState([]);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");
  const [wish1, setWish1] = useState(false);
  const [wish2, setWish2] = useState(false);
  const [wish3, setWish3] = useState(false);
  const [wish4, setWish4] = useState(false);
  const [wish5, setWish5] = useState(false);
  const [wish6, setWish6] = useState(false);
  const [emptyProfil, setEmptyProfil] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(`/getmydata?id=${userState.id}`);
      let response = await rawResponse.json();
      console.log("get data", response);
      response.myUser.name && setName(response.myUser.name);
      response.myUser.email && setEmail(response.myUser.email);
      response.myUser.profession && setJob(response.myUser.profession);
      response.myUser.city && setCity(response.myUser.city);
      response.myUser.arrondissement &&
        setPostcode(response.myUser.arrondissement);
      response.myUser.description && setText(response.myUser.description);
      response.myUser.secteur && setActivity(response.myUser.secteur);
      response.myUser.wish1 && setWish1(response.myUser.wish1);
      response.myUser.wish2 && setWish2(response.myUser.wish2);
      response.myUser.wish3 && setWish3(response.myUser.wish3);
      response.myUser.wish4 && setWish4(response.myUser.wish4);
      response.myUser.wish5 && setWish5(response.myUser.wish5);
      response.myUser.wish6 && setWish6(response.myUser.wish6);
      response.myUser.language && setLanguages(response.myUser.language);
      response.myUser.food && setFood(response.myUser.food);
      // response.myUser.photo && setPhoto(response.myUser.photo);
    };
    getUser();
  }, []);

  let history = useHistory();

  const handleRecord = async () => {
    if (
      name !== "" &&
      job !== "" &&
      email !== "" &&
      city !== "" &&
      postcode !== "" &&
      activity !== "" &&
      languages.length !== 0 &&
      text !== "" &&
      food.length !== 0 &&
      // photo !== "" &&
      (wish1 || wish2 || wish3 || wish4 || wish5 || wish6)
    ) {
      let rawResponse = await fetch(`/recordmydata`, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${name}&email=${email}&job=${job}&city=${city}&postcode=${postcode}&activity=${activity}&language=${JSON.stringify(
          languages
        )}&text=${text}&food=${JSON.stringify(
          food
        )}&wish1=${wish1}&wish2=${wish2}&wish3=${wish3}&wish4=${wish4}&wish5=${wish5}&wish6=${wish6}&id=${
          userState.id
        }`,
      });

      let response = await rawResponse.json();
      console.log("record data", response);

      setEmptyProfil(false);
      history.push("/myprofil");
    } else {
      setEmptyProfil(true);
    }
  };

  const arrayLanguage = [
    "Anglais",
    "Arabe",
    "Espagnol",
    "Italien",
    "Français",
    "Mandarin",
    "Hebreu",
    "Russe",
    "Portugais",
    "Autre",
  ];

  const arrayCuisine = [
    "Africain",
    "Arménien",
    "Asiatique",
    "Casher",
    "Espagnol",
    "Fast Food",
    "Français",
    "Halal",
    "Italien",
    "Indien",
    "Libanais",
    "Mexicain",
    "Oriental",
    "Japonais",
    "Thai",
    "Vegan",
    "Vietnamien",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 0;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(22),
      height: theme.spacing(22),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
      maxWidth: 300,
    },
  }));
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
          <h2>Editer mon profil</h2>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <Card style={{ backgroundColor: "#ececec" }} className="card-image">
            <div className="style-image">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  style={{
                    width: 80,
                    height: 80,
                    color: "#418581",
                  }}
                  icon={faCamera}
                />
                <UploadPic />
              </div>
              <CardContent className="design-maindata">
                <FontAwesomeIcon icon={faUserCircle} className="icon-profil" />
                <Input
                  placeholder="Prénom"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  style={{ paddingLeft: 5 }}
                />
              </CardContent>

              <CardContent className="design-maindata">
                <FontAwesomeIcon icon={faEnvelope} className="icon-profil" />
                <Input
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  style={{ paddingLeft: 5 }}
                />
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
                <BsBriefcaseFill className="icon-profil" />
                <Input
                  placeholder="Profession"
                  onChange={(e) => setJob(e.target.value)}
                  value={job}
                  style={{ paddingLeft: 5 }}
                />
              </CardContent>
              <CardContent className="design-maindata">
                <HiOutlineLocationMarker className="icon-profil" />
                <Input
                  placeholder="Ville"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  style={{ paddingLeft: 5, marginRight: 14, width: 150 }}
                />
                <Input
                  placeholder="Code Postal"
                  onChange={(e) => setPostcode(e.target.value)}
                  value={postcode}
                  style={{ paddingLeft: 5, width: 100 }}
                />
              </CardContent>
            </div>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="layout-language-activity"
          >
            <div className="language-card">
              <FontAwesomeIcon icon={faGlobe} className="icon-profil" />
              <h5>Langue(s) parlée(s) (3 choix max): </h5>

              <FormControl className={classes.formControl}>
                <Select
                  multiple={true}
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  MenuProps={MenuProps}
                >
                  {arrayLanguage.map((language) => (
                    <MenuItem
                      key={language}
                      disabled={
                        languages.length >= 3 && !languages.includes(language)
                      }
                      value={language}
                    >
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="language-card">
              <BsBriefcaseFill className="icon-profil" />
              <h5>Secteur d'activité: </h5>

              <FormControl className={classes.formControl}>
                <Select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                >
                  <MenuItem value="Agroalimentaire">Agroalimentaire</MenuItem>
                  <MenuItem value="Activité informatique">
                    Activité informatique
                  </MenuItem>
                  <MenuItem value="Activité juridique et comptable">
                    Activité juridique et comptable
                  </MenuItem>
                  <MenuItem value="Art - Culture">Art - Culture</MenuItem>
                  <MenuItem value="Banque et Assurances">
                    Banque et Assurances
                  </MenuItem>
                  <MenuItem value="Commerce - Négoce - Distribution">
                    Commerce - Négoce - Distribution
                  </MenuItem>
                  <MenuItem value="Graphisme - Design">
                    Graphisme - Design
                  </MenuItem>
                  <MenuItem value="Immobilier">Immobilier</MenuItem>
                  <MenuItem value="Industrie pharmaceutique">
                    Industrie pharmaceutique
                  </MenuItem>
                  <MenuItem value="Mécanique - Métallurgie">
                    Mécanique - Métallurgie
                  </MenuItem>
                  <MenuItem value="RH - Rectutement">RH - Rectutement</MenuItem>
                  <MenuItem value="Santé - Medical">Santé - Medical</MenuItem>
                  <MenuItem value="autre">Autre</MenuItem>
                </Select>
              </FormControl>
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
              <div>
                <TextField
                  label="à propos de vous"
                  multiline
                  rows={5}
                  style={{ width: 550, backgroundColor: "#fff" }}
                  onChange={(e) => setText(e.target.value)}
                  defaultValue={text}
                  variant="outlined"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row xs="1" lg="2">
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="layout-language-activity"
          >
            <div className="language-card">
              <RiSurveyLine className="icon-about" />
              <h5>Mes envies: </h5>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wish1}
                      onChange={(e) => {
                        setWish1(e.target.checked);
                      }}
                      style={{
                        color: "#f9b34c",
                      }}
                    />
                  }
                  style={{ margin: 0 }}
                  label={
                    <Typography style={{ margin: 0, fontSize: 13 }}>
                      Déconnecter du travail
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wish2}
                      onChange={(e) => {
                        setWish2(e.target.checked);
                      }}
                      style={{
                        color: "#f9b34c",
                      }}
                    />
                  }
                  style={{ margin: 0 }}
                  label={
                    <Typography style={{ fontSize: 13 }}>
                      Découvrir un nouveau métier
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wish3}
                      onChange={(e) => {
                        setWish3(e.target.checked);
                      }}
                      style={{
                        color: "#f9b34c",
                      }}
                    />
                  }
                  style={{ margin: 0 }}
                  label={
                    <Typography style={{ fontSize: 13 }}>
                      Recherche d'opportunités professionnelles
                    </Typography>
                  }
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wish4}
                      onChange={(e) => {
                        setWish4(e.target.checked);
                      }}
                      style={{
                        color: "#f9b34c",
                      }}
                    />
                  }
                  style={{ margin: 0 }}
                  label={
                    <Typography style={{ margin: 0, fontSize: 13 }}>
                      Rencontrer de nouvelles personnes
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wish5}
                      onChange={(e) => {
                        setWish5(e.target.checked);
                      }}
                      style={{
                        color: "#f9b34c",
                      }}
                    />
                  }
                  style={{ margin: 0 }}
                  label={
                    <Typography style={{ margin: 0, fontSize: 13 }}>
                      Se reconvertir professionnellement
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wish6}
                      onChange={(e) => {
                        setWish6(e.target.checked);
                      }}
                      style={{
                        color: "#f9b34c",
                      }}
                    />
                  }
                  style={{ margin: 0 }}
                  label={
                    <Typography style={{ margin: 0, fontSize: 13 }}>
                      Découvrir le quartier et ses alentours
                    </Typography>
                  }
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ backgroundColor: "#ececec", height: 180 }}
            className="layout-language-activity"
          >
            <div className="language-card">
              <GiHotMeal className="icon-about" />
              <h5>Mes cuisines préférés (3 choix max): </h5>
            </div>
            <FormControl className={classes.formControl}>
              <Select
                multiple={true}
                value={food}
                onChange={(e) => setFood(e.target.value)}
                MenuProps={MenuProps}
              >
                {arrayCuisine.map((cook) => (
                  <MenuItem
                    key={cook}
                    disabled={food.length >= 3 && !food.includes(cook)}
                    value={cook}
                  >
                    {cook}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          {emptyProfil && (
            <h5
              style={{
                color: "#eb4d4b",
                // fontSize: 15,
                margin: 15,
              }}
            >
              L'un des champs du profil est vide, re-vérifiez avant
              d'enregistrer.
            </h5>
          )}
          <Button
            className="btn-next"
            onClick={() => {
              handleRecord();
            }}
          >
            Enregistrer
          </Button>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log("state", state.user);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(EditCard);
