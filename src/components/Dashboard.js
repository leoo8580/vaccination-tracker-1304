import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>
      <p>Manage your vaccines, patients, and vaccination records</p>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="icon">💉</div>
          <Link to="/vaccines">
            <h2>Vaccines</h2>
            <p>Manage vaccine information and track available vaccines</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="icon">👥</div>
          <Link to="/patients">
            <h2>Patients</h2>
            <p>Register and manage patient information</p>
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="icon">📋</div>
          <Link to="/records">
            <h2>Records</h2>
            <p>Track vaccination records and schedule appointments</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;