import React from "react";
import "./Styles/LogCreds.css";

function LogCreds({
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

      <a href="faceID">Use Face ID to Log In</a>
    </form>
  );
}

export default LogCreds;
