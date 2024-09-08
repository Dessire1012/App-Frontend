import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css";
import { FaUser, FaCog, FaSignOutAlt, FaFilePdf } from "react-icons/fa";
import Settings from "./Settings";

const Navbar = ({ userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSilaboModalOpen, setIsSilaboModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const openSilaboModal = () => setIsSilaboModalOpen(true);
  const closeSilaboModal = () => setIsSilaboModalOpen(false);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);
  //aasdasd

  return (
    <nav className="navbar">
      <Link to="/chatbot" className="navbar-title">
        Chatbot
      </Link>
      <div className="navbar-user">
        <h4 className="welcome">Welcome back,</h4>
        {userName && <span className="user-name">{userName}</span>}
        <button onClick={toggleDropdown} className="user-button">
          <FaUser />
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li>
              <a onClick={openSilaboModal}>
                <FaFilePdf style={{ marginRight: "8px" }} /> Silabo
              </a>
            </li>
            <hr className="menu-divider" />
            <li>
              <a onClick={openSettingsModal}>
                <FaCog style={{ marginRight: "8px" }} /> Settings
              </a>
            </li>
            <li>
              <a href="/">
                <FaSignOutAlt style={{ marginRight: "8px" }} /> Log out
              </a>
            </li>
          </ul>
        )}
      </div>
      {isSilaboModalOpen && (
        <div className="modal">
          <div
            className="modal-content"
            style={{ width: "90%", maxWidth: "800px" }}
          >
            <span className="close" onClick={closeSilaboModal}>
              &times;
            </span>
            <iframe
              src="/Silabo.pdf"
              width="100%"
              height="500px"
              title="Silabo PDF"
            />
          </div>
        </div>
      )}
      <Settings isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
    </nav>
  );
};

export default Navbar;
