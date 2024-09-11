import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import "./Styles/Chatbot.css";
import { FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { getUserById } from "../Backend/API";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const propUserId = location.state?.userId;
    const propGoogleId = location.state?.googleId;

    if (propUserId) {
      setId(propUserId);
    } else if (propGoogleId) {
      setId(propGoogleId);
    } else {
      const cookieUserId = Cookies.get("userId");

      if (cookieUserId) {
        setId(cookieUserId);
      }
    }
  }, [location]);

  useEffect(() => {
    if (id) {
      const domain = id.startsWith("google")
        ? "https://app-ffb84f79-a617-43e4-b3ef-d4e15dbc138f.cleverapps.io"
        : ".vanguardchat.netlify.app";

      Cookies.set("userId", id, {
        path: "/",
        domain: domain,
      });
      getUserById(id)
        .then((data) => {
          if (data.name) {
            setUserName(data.name);
          }
          if (data.photo) {
            setPhoto(data.photo);
            Cookies.set("photo", data.photo, {
              path: "/",
              domain: domain,
            });
          }
          if (data.email) {
            setEmail(data.email);
            Cookies.set("email", data.email, {
              path: "/",
              domain: domain,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Bot response", user: false },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      <Navbar userName={userName} userPhoto={photo} userEmail={email} />
      <div className="chatbot">
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-container ${msg.user ? "user" : "bot"}`}
            >
              <div className={`message ${msg.user ? "user" : "bot"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <div className="input-container">
            <span className="text-icon">T</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="input-field"
            />
            <FaPaperPlane className="icon send-icon" onClick={handleSend} />
            <FaEllipsisV className="icon options-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
