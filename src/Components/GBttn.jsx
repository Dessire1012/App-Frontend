import React from "react";
import "./Styles/GBttn.css";
import { FaGoogle } from "react-icons/fa";

function GBttn() {
  const handleGoogleLogin = () => {
    window.location.href = "https://vanguardchat.netlify.app/auth/google";
  };

  return (
    <button className="g-button" onClick={handleGoogleLogin}>
      <FaGoogle className="g-icon" />
      Connect with Google
    </button>
  );
}

export default GBttn;
