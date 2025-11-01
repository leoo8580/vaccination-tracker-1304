import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VaccinationRecords.css';

function VaccinationRecords() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [newRecord, setNewRecord] = useState({
    patient: '',
    vaccine: '',
    dose: '',
    administered: '',
    nextDue: '',
    status: 'Scheduled'
  });

  useEffect(() => {
    fetchRecords();
    fetchPatients();
    fetchVaccines();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchVaccines = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/vaccines');
      setVaccines(response.data);
    } catch (error) {
      console.error('Error fetching vaccines:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recordData = {
        patientId: newRecord.patient,
        vaccineId: newRecord.vaccine,
        dose: parseInt(newRecord.dose),
        administered: newRecord.administered,
        nextDue: newRecord.nextDue,
        status: newRecord.status
      };
      
      console.log('Sending record data:', recordData);
      await axios.post('http://localhost:5001/api/records', recordData);
      
      setNewRecord({
        patient: '',
        vaccine: '',
        dose: '',
        administered: '',
        nextDue: '',
        status: 'Scheduled'
      });
      fetchRecords();
      document.getElementById('addRecordForm').style.display = 'none';
    } catch (error) {
      console.error('Error adding record:', error);
      alert('Error adding record: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/records/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="vaccination-records">
      <h2>Vaccination Records</h2>
      <button className="add-btn" onClick={() => document.getElementById('addRecordForm').style.display = 'block'}>+ ADD RECORD</button>

      <div id="addRecordForm" className="modal">
        <form onSubmit={handleSubmit}>
          <select
            name="patient"
            value={newRecord.patient}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient._id} value={patient._id}>{patient.name}</option>
            ))}
          </select>
          <select
            name="vaccine"
            value={newRecord.vaccine}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Vaccine</option>
            {vaccines.map(vaccine => (
              <option key={vaccine._id} value={vaccine._id}>{vaccine.name}</option>
            ))}
          </select>
          <input
            type="number"
            name="dose"
            value={newRecord.dose}
            onChange={handleInputChange}
            placeholder="Dose Number"
            required
          />
          <input
            type="date"
            name="administered"
            value={newRecord.administered}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="nextDue"
            value={newRecord.nextDue}
            onChange={handleInputChange}
            required
          />
          <select
            name="status"
            value={newRecord.status}
            onChange={handleInputChange}
            required
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Due">Due</option>
          </select>
          <div className="button-group">
            <button type="submit">Add</button>
            <button type="button" onClick={() => document.getElementById('addRecordForm').style.display = 'none'}>Cancel</button>
          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Vaccine</th>
            <th>Dose</th>
            <th>Administered</th>
            <th>Next Due</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record._id}>
              <td>{record.patient?.name}</td>
              <td>{record.vaccine?.name}</td>
              <td>{record.dose}</td>
              <td>{new Date(record.administered).toLocaleDateString()}</td>
              <td>{new Date(record.nextDue).toLocaleDateString()}</td>
              <td>
                <span className={`status ${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(record._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VaccinationRecords;