import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Auth/login";
import "./index.css";
import Dashboard from "./component/Dashboard";
import Chatbot from "./component/Pages/Chatbot";
import Testing from "./component/testing";
// import Main from "./main";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("userRole");

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ChatbotRoute = ({ children }) => {
  const role = localStorage.getItem("userRole");

  if (role !== "karyawan" && role !== "user_umum") {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/chat" element={<ChatbotRoute><Chatbot /></ChatbotRoute>} />
          {/* ini halaman kosong mas */}
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
