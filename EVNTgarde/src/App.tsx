import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Major Pages/Login";
import SignUp from "./Major Pages/SignUp";
import Home from "./Major Pages/Home"; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />{" "}
        {}
      </Routes>
    </Router>
  );
};

export default App;
