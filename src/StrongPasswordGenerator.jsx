import React, { useState } from "react";
import "./App.css";
import copyLogo from "./copy.png";
import copy from "copy-to-clipboard";

export default function StrongPasswordGenerator() {
  const [borderColor, setBorderColor] = useState("rgba(0, 128, 0, 0.628)");
  const [digits, setDigits] = useState(0);
  const [errorMsg, setError] = useState("");
  const [generatedPassword, setPassword] = useState("");
  const [passwordWidthDiv, setWidth] = useState(26);



  function checkOnDigits(text) {
    if (text <= 40 && text >= 8) return true;
    else return false;
  }

  function generateStrongPassword(digits) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var password = "";
    for (var i = 0; i <= digits; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setPassword(password);
  }


  return (
    <div className="main-section">
      <h1>Password Generator</h1>

      <div className="passwordLength">
        <input
          type="text"
          placeholder="Enter password length"
          onChange={(e) => {
            if (!checkOnDigits(e.target.value)) {
              setBorderColor("red");
              setDigits(0);
              setWidth(26);
              setPassword("");
              setError("Please enter a number from 8 to 40");
            } else {
              setError("");
              setBorderColor("rgba(0, 128, 0, 0.628)");
              setDigits(e.target.value);
            }
          }}
          style={{ borderColor: borderColor }}
        ></input>

        <button
          onClick={() => {
            if (checkOnDigits(digits)) {
              setTimeout(() => generateStrongPassword(digits),600);
              setWidth("60%");
            }
          }}
        >
          Generate
        </button>
      </div>
      <p style={{ color: "red", fontSize: "16px", letterSpacing: ".2px" }}>
        {errorMsg}
      </p>

      <div className="generatedDiv" style={{ width: passwordWidthDiv }} >
        <div className="generatedInput">
          {generatedPassword}
        </div>
        <img
          src={copyLogo}
          className="copyLogo"
          title="Copy"
          onClick={() => {
            if (generatedPassword.length > 0) {
              copy(generatedPassword);
              alert(`You have copied "${generatedPassword}"`);
            }
          }}
        ></img>
      </div>
    </div>
  );
}
