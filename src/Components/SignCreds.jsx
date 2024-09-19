import React from "react";
import "./Styles/SignCreds.css";
import FaceId from "../Imagenes/face-id.png";

function SignCreds({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  errorMessage,
}) {
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="group">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          type="name"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>

      <div className="group">
        <label htmlFor="email" className="label">
          Email
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
        Sign In
      </button>

      <div align="center">
        <button type="button" className="faceid-button">
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

export default SignCreds;
