/* global FB */
import React, { useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import "./Styles/FbBttn.css";

function FbBttn() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "833630222214619",
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

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

  const handleFbLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information.... ");
          FB.api("/me", function (response) {
            console.log("Good to see you, " + response + ".");
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    );
  };

  return (
    <button className="fb-button" onClick={handleFbLogin}>
      <FaFacebookF className="fb-icon" />
      Connect with Facebook
    </button>
  );
}

export default FbBttn;
