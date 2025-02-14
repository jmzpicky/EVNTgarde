import React from "react";
import Logout from "./Logout"; 
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <Logout />
    </div>
  );
};

export default Dashboard;
