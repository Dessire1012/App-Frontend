import React from "react";
import "./Styles/LogCreds.css";
import FaceId from "../Imagenes/face-id.png";
import { useNavigate } from "react-router-dom";

function LogCreds({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  errorMessage,
}) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/faceid");
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="group">
        <label htmlFor="email" className="label">
          User email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>

      <div className="group">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="submit" className="button">
        Log in
      </button>
      <div align="center">
        <button
          type="button"
          className="faceid-button"
          onClick={handleRedirect}
        >
          <img
            src={FaceId}
            alt="Face ID"
            style={{ width: "60px", height: "60px" }}
          />
        </button>
      </div>
    </form>
  );
}

export default LogCreds;
