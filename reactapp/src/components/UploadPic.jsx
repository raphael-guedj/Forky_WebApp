import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Input,
  Form,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  Button,
} from "reactstrap";
import "../App.css";

const UploadPic = ({ userState }) => {
  return (
    <Form>
      <Input type="file" className="btn-upload" />
    </Form>
  );
};

function mapStateToProps(state) {
  // console.log("state", state.user);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(UploadPic);
