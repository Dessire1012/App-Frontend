/* global FB */
import React, { useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import "./Styles/FbBttn.css";
import { loginUser, registerUser } from "../Backend/API";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function FbBttn() {
  const navigate = useNavigate();

  useEffect(() => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.onload = () => {
        FB.init({
          appId: "1084301713253316",
          cookie: true,
          xfbml: true,
          version: "v20.0",
        });
        FB.AppEvents.logPageView();
      };
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFbLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          handleFbApi();
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    );
  };

  const handleFbApi = async () => {
    try {
      FB.api("/me", { fields: "id,name,email,picture" }, async (profile) => {
        const user_id = profile.id;
        const name = profile.name;
        const email = profile.email;
        const photo = profile.picture.data.url;

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
      });
    } catch (error) {
      console.error("Operation failed", error);
    }
  };

  return (
    <button className="fb-button" onClick={handleFbLogin}>
      <FaFacebookF className="fb-icon" />
      Connect with Facebook
    </button>
  );
}

export default FbBttn;
