import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./Component/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home.js";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
