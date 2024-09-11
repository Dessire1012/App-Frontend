import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";
import { loginUser, registerUser } from "../Backend/API";
import "./Styles/GBttn.css";

function GBttn() {
  const generateRandomPassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    while (!isPassword(password)) {
      password = Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map((n) => charset[n % charset.length])
        .join("");
    }
    return password;
  };

  const isPassword = (str) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
  };

  const handleSuccess = async (response) => {
    try {
      const token = response.credential;
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.sub;
      const name = decodedToken.name;
      const email = decodedToken.email;
      const password = generateRandomPassword();

      console.log("Decoded token", decodedToken);
      console.log("Google ID", user_id);
      console.log("Name", name);
      console.log("Email", email);
      console.log("Generated Password", password);

      let user;
      try {
        user = await loginUser({ email, password });
        console.log("User logged in", user);
      } catch (loginError) {
        console.error("Login failed, attempting to register", loginError);
        user = await registerUser({ user_id, name, email, password });
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
