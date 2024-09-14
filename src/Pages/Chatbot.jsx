import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { getUserById } from "../Backend/API";
import "./Styles/Chatbot.css";

const Chatbot = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((user) => {
        setUserName(user.name);
        setEmail(user.email);
      });
    }
    const userPhoto = Cookies.get("user_photo");
    if (userPhoto) {
      setPhoto(userPhoto);
    }
  }, [userId]);

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
