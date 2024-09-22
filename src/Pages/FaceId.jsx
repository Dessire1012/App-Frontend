import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import "./Styles/FaceId.css";
import { loginUser, registerUser } from "../Backend/API";

const FaceIdLogin = () => {
  const videoRef = useRef();
  const navigate = useNavigate();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const handleRegister = async () => {
    if (!name || !email) {
      return setMessage("Please complete all fields.");
    }
    if (!isModelLoaded) return setMessage("Models not loaded.");

    const video = videoRef.current;
    const detection = await faceapi
      .detectSingleFace(video)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      try {
        await registerUser({
          name,
          email,
          vector: detection.descriptor,
        });
        setMessage("Registration completed.");
        video.srcObject.getTracks().forEach((track) => track.stop());
        setShowRegister(false);
        setShowLogin(true);
      } catch (error) {
        setMessage("Registration failed, please try again.");
      }
    } else {
      setMessage("No face detected, please try again.");
    }
  };

  const handleLogin = async () => {
    if (!email) {
      return setMessage("Please enter your email.");
    }
    if (!isModelLoaded) {
      return setMessage("Models not loaded.");
    }

    const video = videoRef.current;
    const detection = await faceapi
      .detectSingleFace(video)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      try {
        const response = await loginUser({ email });
        let storedVector = response.vector;
        console.log(storedVector);

        if (!(storedVector instanceof Float32Array)) {
          storedVector = new Float32Array(storedVector);
        }

        const faceMatcher = new faceapi.FaceMatcher([storedVector]);
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);

        if (bestMatch.label === "person 1") {
          setMessage("Authentication successful.");
          video.srcObject.getTracks().forEach((track) => track.stop());
          navigate("/chatbot");
        } else {
          setMessage("Authentication failed.");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setMessage("Login failed, please try again.");
      }
    } else {
      setMessage("No face detected for authentication.");
    }
  };

  return (
    <div className="container-face">
      <h2 className="title-face">Login with Face Recognition</h2>

      <div className="video-container-face">
        <video ref={videoRef} className="video-face" autoPlay muted></video>
      </div>

      <div className="controls-face">
        {!showRegister && !showLogin && (
          <div className="initial-buttons-face">
            <div className="action-section">
              <h3>Register if you are new</h3>
              <button
                onClick={() => setShowRegister(true)}
                className="button-face"
              >
                Register
              </button>
            </div>
            <div className="action-section">
              <h3>Sign in if you are back</h3>
              <button
                onClick={() => setShowLogin(true)}
                className="button-face"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {showRegister && (
          <div className="register-form-face">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-face"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-face"
            />
            <button onClick={startVideo} className="button-face">
              Start Camera
            </button>
            <button onClick={handleRegister} className="button-enter">
              Register Face
            </button>
          </div>
        )}

        {showLogin && (
          <div className="login-form-face">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-face"
            />
            <button onClick={startVideo} className="button-face">
              Start Camera
            </button>
            <button onClick={handleLogin} className="button-enter">
              Sign In
            </button>
          </div>
        )}
      </div>

      {message && <p className="message-face">{message}</p>}
    </div>
  );
};

export default FaceIdLogin;
