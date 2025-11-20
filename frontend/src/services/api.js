import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor (for adding auth tokens later)
api.interceptors.request.use(
  (config) => {
    // TODO: Add authentication token when implemented
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for handling errors globally)
api.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data portion
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      return Promise.reject({ error: 'Network error. Please check your connection.' });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({ error: error.message });
    }
  }
);

export default api;