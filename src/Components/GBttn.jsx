import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";
import { loginUser } from "../Backend/API";
import "./Styles/GBttn.css";

function GBttn() {
  const handleSuccess = async (response) => {
    try {
      const token = response.credential;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      console.log("User ID", userId);

      const user = await loginUser({ id: userId });
      console.log("User logged in", user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleError = (error) => {
    console.error("Login failed", error);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      buttonText="Connect with Google"
      render={(renderProps) => (
        <button
          className="g-button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <FaGoogle className="g-icon" />
          Connect with Google
        </button>
      )}
    />
  );
}

export default GBttn;
