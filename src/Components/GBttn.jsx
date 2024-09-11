import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";
import { loginUser, registerUser } from "../Backend/API";
import "./Styles/GBttn.css";

function GBttn() {
  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleSuccess = async (response) => {
    try {
      const token = response.credential;
      const decodedToken = jwtDecode(token);
      const googleId = decodedToken.sub;
      const name = decodedToken.name;
      const email = decodedToken.email;
      const password = generateRandomPassword();

      console.log("Decoded token", decodedToken);
      console.log("Google ID", googleId);
      console.log("Name", name);
      console.log("Email", email);
      console.log("Generated Password", password);

      let user;
      try {
        user = await loginUser({ googleId });
        console.log("User logged in", user);
      } catch (loginError) {
        console.error("Login failed, attempting to register", loginError);
        user = await registerUser({ googleId, name, email, password });
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
