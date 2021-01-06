import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, Form, Button } from "reactstrap";
import "../App.css";

const UploadPic = ({ userState }) => {
  //Composant pour uploader une image de son PC et l'uploader avec CLoudinary.
  const [photo, setPhoto] = useState();

  const sendPhoto = async () => {
    var data = new FormData();
    data.append("image", photo);

    let rawResponse = await fetch(`/uploadPhoto?id=${userState.id}`, {
      method: "post",
      body: data,
    });
    await rawResponse.json();
  };

  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Input
        type="file"
        name="photo"
        style={{
          width: 120,
          margin: 10,
        }}
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      {/* method send photo permettant d'appeler le back via la method du fetch (plusieurs tuto evoque Axios pour faciliter l'envoi) */}
      <Button
        className="btn-upload"
        onClick={() => {
          sendPhoto();
        }}
      >
        Enregistrer l'image
      </Button>
    </Form>
  );
};

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(UploadPic);
