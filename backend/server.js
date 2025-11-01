const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
    console.log('Database: vaccination-tracker');
    
    // Test database connection by creating a simple document
    const Test = mongoose.model('Test', new mongoose.Schema({ test: String }));
    return Test.create({ test: 'Connection test' })
      .then(() => Test.findOneAndDelete({ test: 'Connection test' }))
      .then(() => console.log('Database write/read test successful'));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  });

// Routes
const vaccineRoutes = require('./routes/vaccines');
const patientRoutes = require('./routes/patients');
const recordRoutes = require('./routes/records');

app.use('/api/vaccines', vaccineRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/records', recordRoutes);

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});