import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import VaccineManagement from './components/VaccineManagement';
import PatientManagement from './components/PatientManagement';
import VaccinationRecords from './components/VaccinationRecords';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">Vaccination Tracker</Link>
          </div>
          <div className="nav-links">
            <Link to="/vaccines">VACCINES</Link>
            <Link to="/patients">PATIENTS</Link>
            <Link to="/records">RECORDS</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vaccines" element={<VaccineManagement />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/records" element={<VaccinationRecords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;