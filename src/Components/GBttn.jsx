import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "../Backend/API";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Styles/GBttn.css";

function GBttn() {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      const token = response.credential;
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.sub;
      const name = decodedToken.name;
      const email = decodedToken.email;
      const photo = decodedToken.picture;

      Cookies.set("user_photo", photo, { expires: 7 });

      let user;
      try {
        user = await loginUser({ email, user_id });
        console.log("User logged in", user);
      } catch (loginError) {
        console.error("Login failed, attempting to register", loginError);
        user = await registerUser({ user_id, name, email });
        console.log("User registered", user);
      }
      navigate("/chatbot", { state: { userId: user_id } });
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
    />
  );
}

export default GBttn;
