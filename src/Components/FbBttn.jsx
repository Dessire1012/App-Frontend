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

    // Cargar el SDK de Facebook
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

  const handleFbLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information.... ");
          const { accessToken, userID } = response.authResponse;
          console.log("Access Token:", accessToken);
          console.log("User ID:", userID);

          FB.api(
            "/me",
            { fields: "id,name,email,picture" },
            function (response) {
              const { id, name, email, picture } = response;
              console.log("User ID:", id);
              console.log("Name:", name);
              console.log("Email:", email);
              console.log("Picture URL:", picture.data.url);
            }
          );
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
