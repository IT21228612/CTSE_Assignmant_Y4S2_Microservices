import React, { useState } from 'react';
import axios from '../axios';  // Axios instance to make API requests
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Ensure correct toast styles are imported
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // useNavigate for redirection

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post('/auth/login', loginData);

      const { token, firstName, username } = response.data;  // Get token, firstName, and username from the response

      // Save token, firstName, and username in localStorage
      localStorage.setItem('token', token); 
      localStorage.setItem('firstName', firstName); 
      localStorage.setItem('username', username);

      // Show success toast message
      toast.success('Login Successful !!!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",  // adds vibrant look
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(to right, #00b09b, #96c93d)', // gradient green
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        },
        progressClassName: 'line-progress',
      });
      
      // Redirect to home page and reload the page after 3 seconds
      setTimeout(() => {
        navigate('/inventory');  // Navigate to home page
        window.location.reload();  // Reload the page after the navigation
      }, 3000); // Time in milliseconds (3 seconds)

    } catch (error) {
      // Show error toast message
      toast.error(error.response?.data?.message || 'Login Failed !!!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(to right, #e52d27, #b31217)', // gradient red
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        },
        progressClassName: 'line-progress',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-primary">Forgot Password?</Link>
        </div>
      </div>
      <ToastContainer />  {/* Ensure this is inside your component to render the toasts */}
    </div>
  );
};

export default Login;
