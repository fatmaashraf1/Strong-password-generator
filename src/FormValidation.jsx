import React, { useState } from "react";
import "./App.css";

const FormValidation = () => {
  var validBorderColor = "rgba(0, 128, 0, 0.628)";
  const [nameErrorMsg, setNameError] = useState("");
  const [emailErrorMsg, setEmailError] = useState("");
  const [phoneErrorMsg, setPhoneError] = useState("");

  const [ThankYouOpacity, setMessageOpacity] = useState(0);
  const [ThankYouHeight, setMessageHeight] = useState(0);
  const [MessageVisiblity, setMessageVisiblity] = useState("hidden");

  const [validForm, setValidation] = useState([false, false, false]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const checkOnName = (text) => {
    var nameFormat = /^[a-zA-Z ]+$/;
    if (text.match(nameFormat)) return true;
    else return false;
  };

  const checkOnPhone = (text) => {
    var phoneFormat = /^01[0125][0-9]{8}$/;
    if (text.match(phoneFormat)) return true;
    else return false;
  };

  const checkOnEmail = (text) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (text.match(mailformat)) return true;
    else return false;
  };

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!validForm.every((val) => val)) {
      if (!validForm[0]) setNameError("Name is required");
      if (!validForm[1]) setEmailError("Email is required");
      if (!validForm[2]) setPhoneError("Phone is required");
    } else {
      setMessageVisiblity("visible");
      setMessageHeight(20);
      setMessageOpacity(1);
      setTimeout(() => {
        setMessageHeight(0);
        setMessageVisiblity("hidden");
        setMessageOpacity(0);
      }, 4000);
    }

  }

  return (
    <div className="main-section">
      <h1 className="registerTittle">Registeration</h1>
      <p
        className="thankYouMessage"
        style={{
          height: ThankYouHeight,
          visibility: MessageVisiblity,
          opacity: ThankYouOpacity,
        }}
      >
        {`Thank you for registering ${name}!`}
      </p>

      <form onSubmit={handleOnSubmit} action="">
        {/* Name Field */}
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            if (!e.target.value) {
              setNameError("Name is required");
              e.target.style.borderColor = "red";
              validForm[0] = false;
            } else if (!checkOnName(e.target.value)) {
              setNameError("Please enter a valid name");
              e.target.style.borderColor = "red";
              validForm[0] = false;
            } else {
              setName(e.target.value);
              setNameError("");
              e.target.style.borderColor = validBorderColor;
              validForm[0] = true;
            }
          }}
        />
        <br />
        <span>{nameErrorMsg}</span>

        {/* Email Field */}
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          onChange={(e) => {
            if (!e.target.value) {
              setEmailError("Email is required");
              e.target.style.borderColor = "red";
              validForm[1] = false;
            } else if (!checkOnEmail(e.target.value)) {
              setEmailError("Please enter a valid email ex: john@gmail.com");
              e.target.style.borderColor = "red";
              validForm[1] = false;
            } else {
              setEmail(e.target.value);
              setEmailError("");
              e.target.style.borderColor = validBorderColor;
              validForm[1] = true;
            }
          }}
        />
        <br />
        <span>{emailErrorMsg}</span>

        {/* Whatsapp Number Field */}
        <label htmlFor="whatsapp">Whatsapp Number:</label>
        <br />
        <input
          type="text"
          id="whatsapp"
          name="whatsapp"
          onChange={(e) => {
            if (!e.target.value) {
              setPhoneError("Phone is required");
              e.target.style.borderColor = "red";
              validForm[2] = false;
            } else if (!checkOnPhone(e.target.value)) {
              setPhoneError("Please enter a valid number ex: 01289208636");
              e.target.style.borderColor = "red";
              validForm[2] = false;
            } else {
              setPhone(e.target.value);
              setPhoneError("");
              e.target.style.borderColor = validBorderColor;
              validForm[2] = true;
            }
          }}
        />
        <br />
        <span>{phoneErrorMsg}</span>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormValidation;
