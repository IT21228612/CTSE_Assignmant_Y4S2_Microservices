import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://16.16.210.181:5000/api',  // Your backend API URL
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
