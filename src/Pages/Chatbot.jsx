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
      const cookieGoogleId = Cookies.get("googleId");

      if (cookieUserId) {
        setId(cookieUserId);
      } else if (cookieGoogleId) {
        setId(cookieGoogleId);
      }
    }

    // Cleanup function to clear cookies when the component unmounts
    return () => {
      Cookies.remove("userId");
      Cookies.remove("googleId");
      console.log("Cookies removed");
    };
  }, [location.state]);

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((data) => {
          if (data.name) {
            setUserName(data.name);
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
      <Navbar userName={userName} />
      {id ? <p>Welcome, User ID: {id}</p> : <p>Loading...</p>}
      {userName ? <p>Welcome, User : {userName}</p> : <p>Loading...</p>}
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
