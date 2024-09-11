import React from "react";
import "./Styles/GBttn.css";
import { FaGoogle } from "react-icons/fa";

function GBttn() {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://app-ffb84f79-a617-43e4-b3ef-d4e15dbc138f.cleverapps.io/auth/google";
  };

  return (
    <button className="g-button" onClick={handleGoogleLogin}>
      <FaGoogle className="g-icon" />
      Connect with Google
    </button>
  );
}

export default GBttn;
