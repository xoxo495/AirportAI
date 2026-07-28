import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Auth/login";
import "./index.css";
// import Main from "./main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
