import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Auth/login";
import "./index.css";
import Dashboard from "./component/Dashboard";
import Chatbot from "./component/Pages/Chatbot";
import Testing from "./component/testing";
// import Main from "./main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chatbot />} />
          {/* ini halaman kosong mas */}
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
