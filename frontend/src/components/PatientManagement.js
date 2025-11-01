import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientManagement.css';

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    guardian: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/patients', newPatient);
      setNewPatient({ name: '', dateOfBirth: '', gender: '', guardian: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="patient-management">
      <h2>Patient Management</h2>
      <button className="add-btn" onClick={() => document.getElementById('addPatientForm').style.display = 'block'}>+ ADD PATIENT</button>

      <div id="addPatientForm" className="modal">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newPatient.name}
            onChange={handleInputChange}
            placeholder="Patient Name"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={newPatient.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          <select
            name="gender"
            value={newPatient.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="guardian"
            value={newPatient.guardian}
            onChange={handleInputChange}
            placeholder="Guardian Name"
            required
          />
          <div className="button-group">
            <button type="submit">Add</button>
            <button type="button" onClick={() => document.getElementById('addPatientForm').style.display = 'none'}>Cancel</button>
          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Guardian</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
              <td>{patient.gender}</td>
              <td>{patient.guardian}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(patient._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientManagement;