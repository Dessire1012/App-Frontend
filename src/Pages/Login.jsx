import "./Styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cielo from "../Imagenes/Cielo.jpg";
import LogCreds from "../Components/LogCreds";
import FbBttn from "../Components/FbBttn";
import GBttn from "../Components/GBttn";
import { loginUser } from "../Backend/API";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("Login successful:", data);
      const userId = data.id;
      navigate("/chatbot", { state: { userId: userId } });
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Incorrect email or password.");
    }
  };

  return (
    <div className="full-container">
      <div className="white-container">
        <img src={Cielo} alt="" />
        <div className="overlay-container">
          <div className="login-title">
            <h1>Log In</h1>
          </div>
          <div className="sub-title">
            <h1>Welcome Back!</h1>
          </div>
          <div className="logcreds-container">
            <LogCreds
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
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
            <p>New user?</p>
            <a href="signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
