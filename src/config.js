const config = {
  apiUrl: process.env.REACT_APP_API_URL || window.location.hostname === 'vaxtrak-frontend.onrender.com'
    ? 'https://vaxtrak-backend.onrender.com'  // Production backend URL
    : 'http://localhost:5001'  // Development backend URL
};

export default config;