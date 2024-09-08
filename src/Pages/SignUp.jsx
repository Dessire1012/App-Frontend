import "./Styles/SignUp.css";
import React, { useState } from "react";
import Cielo from "../Imagenes/Cielo.jpg";
import SignCreds from "../Components/SignCreds";
import FbBttn from "../Components/FbBttn";
import GBttn from "../Components/GBttn";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Backend/API";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage(
        "Password must be 8+ characters, include a number and a special character."
      );
      return;
    }
    try {
      const data = await registerUser({ name, email, password });
      console.log("Sign Up successful:", data);
      navigate("/");
    } catch (error) {
      console.error("Sign Up failed:", error);
      setErrorMessage("Sign Up failed. Please try again.");
    }
  };

  return (
    <div className="full-container">
      <div className="white-container">
        <img src={Cielo} alt="" />
        <div className="overlay-container-sign">
          <div className="signin-title">
            <h1>Sign In</h1>
          </div>
          <div className="sub-title">
            <h1>Enter your credentials</h1>
          </div>
          <div className="logcreds-container">
            <SignCreds
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleSignup}
              errorMessage={errorMessage}
            />
          </div>
          <div className="or-section">
            <div className="line"></div>
            <p>Or</p>
            <div className="line"></div>
          </div>
          <div className="socialmedia-container">
            <FbBttn />
            <GBttn />
          </div>
          <div className="sign-container">
            <p>Already have an account?</p>
            <a href="/">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
