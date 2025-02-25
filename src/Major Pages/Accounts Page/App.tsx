import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Major Pages/Login";
import SignUp from "./Major Pages/SignUp";
import Home from "./Major Pages/Home"; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect root to Home */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
