import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_USER_API_URL,  // Your backend API URL
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Set the token in the request header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
