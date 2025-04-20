import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('Home');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  // Regular expressions for validations
  const usernameRegex = /^[A-Za-z0-9_.]{5,10}$/; // 5 to 10 characters, only letters, numbers, "_" and "."
  const phoneRegex = /^[0-9]{9}$/; // Sri Lankan phone number format: 9 digits
  // Regular expression for password (minimum 6, maximum 20 characters)
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{6,20}$/; // Adjust this regex based on your password requirements
  


// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Form validation
  if (!usernameRegex.test(username)) {
    toast.error('Username must be between 5-10 characters and can only contain letters, numbers, ".", and "_"', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
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
    return;
  }

  if (!phoneRegex.test(phoneNumber)) {
    toast.error('Phone number must be exactly 9 digits', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
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
    return;
  }

  if (!passwordRegex.test(password)) {
    toast.error('Password too short — must be 6 characters or more', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
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
    return;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match! Please make sure both passwords are the same.', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
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
    return;
  }

  const userData = {
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    category,
    password
  };

  setLoading(true); // Set loading to true while waiting for the response

  try {
    const response = await axios.post('/auth/register', userData);
    toast.success('Registration Successful !!!', {
      position: "top-center",
      autoClose: 2500,
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
    localStorage.setItem('token', response.data.token); // Store the token in localStorage
    setTimeout(() => {
      navigate('/login'); // Navigate to login page after successful registration
    }, 3000); // Redirect after 3 seconds delay for user to read the success message
  } catch (error) {
    setLoading(false); // Set loading to false after receiving the response
    toast.error(error.response?.data?.message || 'Error: Registration failed. Please try again!', {
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


  // Handle phone number input change (limit it to 9 digits)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
    if (value.length > 9) value = value.slice(0, 9); // Limit to 9 digits
    setPhoneNumber(value);
  };

  // Handle username input change (limit it to 10 characters)
  const handleUsernameChange = (e) => {
    const value = e.target.value.slice(0, 10); // Limit to 10 characters
    setUsername(value);
  };

  // Handle password input change (limit it to 20 characters)
const handlePasswordChange = (e) => {
  const value = e.target.value.slice(0, 20); // Limit to 20 characters
  setPassword(value);
};

// Handle confirm password input change (limit it to 20 characters)
const handleConfirmPasswordChange = (e) => {
  const value = e.target.value.slice(0, 20); // Limit to 20 characters
  setConfirmPassword(value);
};


  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', margin: 'auto' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange} // Handle username change
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneChange} // Handle phone number change
              required
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Home">Home</option>
              <option value="Shop">Shop</option>
            </select>
          </div>
          <div className="form-group mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value.slice(0, 20))}  // Limit to 20 characters
            required
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value.slice(0, 20))}  // Limit to 20 characters
            required
          />
        </div>

          <button type="submit" className="btn btn-primary btn-block w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <ToastContainer /> {/* Toast notifications container */}
      </div>
    </div>
  );
};

export default Register;
