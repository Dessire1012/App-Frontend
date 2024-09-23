import "./Styles/Settings.css";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { updateUserEmail, updateUserName, updateUserPassword } from "../Backend/API";
import { useLocation } from "react-router-dom";

const Settings = ({ isOpen, onClose, userPhoto, userName, userEmail }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const { userId } = location.state || {};
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleUpdate = async () => {
    //console.log("Updating user data");
    try {
      // Reseteamos el mensaje de error
      setErrorMessage(null);

      // Condiciones para verificar si hubo cambios antes de hacer la actualización
      if (name !== userName) {
        //console.log("Updating name");
        await updateUserName(userId, name);
      }

      if (email !== userEmail) {
        //console.log("Updating email");
        await updateUserEmail(userId, email);
      }

      if (password) {
        //console.log("Updating password");
        await updateUserPassword(userId, password);
      }

      // Si todo sale bien, puedes mostrar un mensaje de éxito o resetear el formulario.
    } catch (error) {
      // Si ocurre algún error, lo mostramos en pantalla
      setErrorMessage("Hubo un error actualizando los datos. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="modal-settings">
      <div className="modal-content-sett">
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
                    value=""
                    onChange={(e) => setPassword(e.target.value)}
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
                <button type="submit" className="done-button" onClick={handleUpdate}>
                  Done
                </button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
