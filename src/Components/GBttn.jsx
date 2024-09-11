import React from "react";
import "./Styles/GBttn.css";
import { FaGoogle } from "react-icons/fa";

function GBttn() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <button className="g-button" onClick={handleGoogleLogin}>
      <FaGoogle className="g-icon" />
      Connect with Google
    </button>
  );
}

export default GBttn;
