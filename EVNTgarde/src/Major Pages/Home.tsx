import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
