import React from "react";
import "./Styles/FbBttn.css";
import { FaFacebookF } from "react-icons/fa";

function FbBttn() {
  return (
    <button className="fb-button">
      <FaFacebookF className="fb-icon" />
      Connect with Facebook
    </button>
  );
}

export default FbBttn;
