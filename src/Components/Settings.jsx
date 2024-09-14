import "./Styles/Settings.css";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";

const Settings = ({ isOpen, onClose, userPhoto, userName, userEmail }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userName) {
      setName(userName);
    }
    if (userPhoto) {
      setPhoto(userPhoto);
    }
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userName, userPhoto, userEmail]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNoAction = (event) => {
    event.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="settings-container">
          <div className="settings-left">
            <div className="user-icon">
              {photo ? (
                <img src={photo} alt="User" className="user-image" />
              ) : imagePreview ? (
                <img src={imagePreview} alt="User" className="user-image" />
              ) : (
                <FaUser />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="file-input"
              style={{ display: "none" }}
            />
            <label htmlFor="file-input" className="upload-image">
              Upload Image
            </label>
          </div>
          <div className="settings-right">
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Value"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder="Value"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Password:
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Value"
                  />
                </div>
              </label>
              <div className="right-buttons">
                <button className="edit-face-id" onClick={handleNoAction}>
                  Edit Face ID
                </button>
                <button className="delete-user" onClick={handleNoAction}>
                  Delete User
                </button>
                <button type="submit" className="done-button">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
