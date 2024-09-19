import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { getUserById } from "../Backend/API";
import "./Styles/Chatbot.css";
import { sentimentAnalysis } from "../Backend/API";

const Chatbot = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sentimentResult, setSentimentResult] = useState("");

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = async () => {
    setIsModalOpen(!isModalOpen);
    setIsDropdownOpen(false);

    if (!isModalOpen) {
      setIsLoading(true);
      try {
        const userMessages = messages
          .filter((msg) => msg.user)
          .map((msg) => (msg.text.endsWith(".") ? msg.text : `${msg.text}.`))
          .join(" ");
        console.log(userMessages);
        const response = await sentimentAnalysis({ text: userMessages });
        setSentimentResult(response.body);
        console.log(response);
      } catch (error) {
        console.error("Error al analizar el sentimiento:", error);
      } finally {
        setIsLoading(false);
      }
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
            <div className="dropdown-container">
              <FaEllipsisV
                className="icon options-icon"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="dropdown-sentiment">
                  <button className="item-sentiment" onClick={toggleModal}>
                    Analyze Sentiment
                  </button>
                </div>
              )}
            </div>
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close-button" onClick={toggleModal}>
                    &times;
                  </span>
                  <h2>The overall sentiment is:</h2>
                  {isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <p>{sentimentResult}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
