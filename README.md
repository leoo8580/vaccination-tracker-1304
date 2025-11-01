# Vaccination Tracker System

A full-stack MERN application for tracking vaccinations, managing patients, and maintaining vaccination records.

## Deployment

The application is deployed and accessible at:
- Frontend: [https://vaxtrak-frontend.onrender.com](https://vaxtrak-frontend.onrender.com)
- Backend: [https://vaxtrak-backend.onrender.com](https://vaxtrak-backend.onrender.com)

## Features

- Vaccine Management: Add, edit, and delete vaccine information
- Patient Management: Register and manage patient information
- Vaccination Records: Track vaccination history and schedule next doses
- Dashboard: Overview of all activities

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Compass
- npm or yarn

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Configuration

1. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/vaccination-tracker
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Vaccines
- GET /api/vaccines - Get all vaccines
- GET /api/vaccines/:id - Get a specific vaccine
- POST /api/vaccines - Create a new vaccine
- PUT /api/vaccines/:id - Update a vaccine
- DELETE /api/vaccines/:id - Delete a vaccine

### Patients
- GET /api/patients - Get all patients
- GET /api/patients/:id - Get a specific patient
- POST /api/patients - Create a new patient
- PUT /api/patients/:id - Update a patient
- DELETE /api/patients/:id - Delete a patient

### Records
- GET /api/records - Get all vaccination records
- GET /api/records/:id - Get a specific record
- GET /api/records/patient/:patientId - Get records for a specific patient
- POST /api/records - Create a new record
- PUT /api/records/:id - Update a record
- DELETE /api/records/:id - Delete a record