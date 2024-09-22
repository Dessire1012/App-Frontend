import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Chatbot from "./Pages/Chatbot";
import FaceId from "./Pages/FaceId";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/faceid" element={<FaceId />} />
      </Routes>
    </Router>
  );
}

export default App;
