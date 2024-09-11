import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";
import { loginUser, registerUser } from "../Backend/API";
import "./Styles/GBttn.css";

function GBttn() {
  const handleSuccess = async (response) => {
    try {
      const token = response.credential;
      const decodedToken = jwtDecode(token);
      const googleId = decodedToken.sub;
      console.log("Google ID", googleId);

      let user;
      try {
        user = await loginUser({ googleId });
        console.log("User logged in", user);
      } catch (loginError) {
        console.error("Login failed, attempting to register", loginError);
        user = await registerUser({ googleId });
        console.log("User registered", user);
      }
    } catch (error) {
      console.error("Operation failed", error);
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
