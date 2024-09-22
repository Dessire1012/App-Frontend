import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./Styles/FaceId.css";

const FaceIdLogin = () => {
  const videoRef = useRef();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredImageDescriptor, setRegisteredImageDescriptor] =
    useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

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
        setIsCameraActive(true);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const handleRegister = async () => {
    if (!isModelLoaded) return alert("Modelos no cargados");

    const video = videoRef.current;
    const detection = await faceapi
      .detectSingleFace(video)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      setRegisteredImageDescriptor(detection.descriptor);
      setIsRegistered(true);
      alert("Registro completado");

      video.srcObject.getTracks().forEach((track) => track.stop());
    } else {
      alert("No se detectó una cara, intenta de nuevo");
    }
  };

  const handleLogin = async () => {
    if (!isModelLoaded || !isRegistered)
      return alert("No puedes iniciar sesión sin registrarte primero.");

    const video = videoRef.current;
    const detection = await faceapi
      .detectSingleFace(video)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      const faceMatcher = new faceapi.FaceMatcher([registeredImageDescriptor]);
      const bestMatch = faceMatcher.findBestMatch(detection.descriptor);

      console.log(bestMatch);

      if (bestMatch.label === "person 1") {
        alert("Autenticación exitosa");

        video.srcObject.getTracks().forEach((track) => track.stop());
      } else {
        alert("Autenticación fallida");
      }
    } else {
      alert("No se detectó ninguna cara para autenticar");
    }
  };

  return (
    <div className="container-face">
      <h2 className="title-face">Iniciar sesión con reconocimiento facial</h2>

      <div className="video-container-face">
        <video ref={videoRef} className="video-face" autoPlay muted></video>
      </div>

      <div className="controls-face">
        {!showRegister && !showLogin && (
          <div className="initial-buttons-face">
            <h3>Primera vez aquí?</h3>
            <button
              onClick={() => setShowRegister(true)}
              className="button-face"
            >
              Registrar
            </button>
            <h3>Ya tienes una cuenta?</h3>
            <button onClick={() => setShowLogin(true)} className="button-face">
              Sign In
            </button>
          </div>
        )}

        {showRegister && (
          <div className="register-form-face">
            <button onClick={startVideo} className="button-face">
              Iniciar Cámara
            </button>
            <button onClick={handleRegister} className="button-face">
              Registrar mi cara
            </button>
          </div>
        )}

        {showLogin && (
          <div className="login-form-face">
            <button onClick={startVideo} className="button-face">
              Iniciar Cámara
            </button>
            <button onClick={handleLogin} className="button-face">
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceIdLogin;
