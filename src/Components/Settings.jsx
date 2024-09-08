import "./Styles/Settings.css";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

const Settings = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);

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
              {imagePreview ? (
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
                <input type="text" name="name" placeholder="Value" />
              </label>
              <label>
                Email:
                <input type="email" name="email" placeholder="Value" />
              </label>
              <label>
                Password:
                <input type="text" name="surname" placeholder="Value" />
              </label>
              <div className="right-buttons">
                <button className="edit-face-id">Edit Face ID</button>
                <button className="delete-user">Delete User</button>
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
