import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VaccineManagement.css';

function VaccineManagement() {
  const [vaccines, setVaccines] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    recommendedAge: '',
    doses: '',
    interval: ''
  });

  useEffect(() => {
    fetchVaccines();
  }, []);

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
    setNewVaccine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/vaccines', newVaccine);
      setNewVaccine({ name: '', recommendedAge: '', doses: '', interval: '' });
      fetchVaccines();
    } catch (error) {
      console.error('Error adding vaccine:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/vaccines/${id}`);
      fetchVaccines();
    } catch (error) {
      console.error('Error deleting vaccine:', error);
    }
  };

  return (
    <div className="vaccine-management">
      <h2>Vaccine Management</h2>
      <button className="add-btn" onClick={() => document.getElementById('addVaccineForm').style.display = 'block'}>+ ADD VACCINE</button>
      
      <div id="addVaccineForm" className="modal">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newVaccine.name}
            onChange={handleInputChange}
            placeholder="Vaccine Name"
            required
          />
          <input
            type="number"
            name="recommendedAge"
            value={newVaccine.recommendedAge}
            onChange={handleInputChange}
            placeholder="Recommended Age"
            required
          />
          <input
            type="number"
            name="doses"
            value={newVaccine.doses}
            onChange={handleInputChange}
            placeholder="Number of Doses"
            required
          />
          <input
            type="number"
            name="interval"
            value={newVaccine.interval}
            onChange={handleInputChange}
            placeholder="Interval (months)"
            required
          />
          <div className="button-group">
            <button type="submit">Add</button>
            <button type="button" onClick={() => document.getElementById('addVaccineForm').style.display = 'none'}>Cancel</button>
          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Recommended Age</th>
            <th>Doses</th>
            <th>Interval</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map(vaccine => (
            <tr key={vaccine._id}>
              <td>{vaccine.name}</td>
              <td>{vaccine.recommendedAge}</td>
              <td>{vaccine.doses}</td>
              <td>{vaccine.interval}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(vaccine._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VaccineManagement;