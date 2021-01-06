import React from "react";
import NavBar from "../components/NavBar";
import { Container } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import NotifReceived from "../components/NotifReceived";
import NotifSent from "../components/NotifSent";
import "../App.css";

//Librairie Material UI pour afficher les Tabs en haut de l'écran .

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabs: {
    color: "#418581",
    textDecoration: "none",
  },
  tab: {},
});

const NotifPage = () => {
  const [value, setValue] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      {/* J'appelle mes composants navbar +notif sent et notif received qui eux même appeleront d'autres composants */}
      <NavBar />
      <Container className="layout-profil">
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <LinkTab label="Mes invitations envoyées" {...a11yProps(0)} />
            <LinkTab label="Mes invitations reçues" {...a11yProps(1)} />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          <NotifSent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NotifReceived />
        </TabPanel>
      </Container>
    </div>
  );
};

export default NotifPage;
