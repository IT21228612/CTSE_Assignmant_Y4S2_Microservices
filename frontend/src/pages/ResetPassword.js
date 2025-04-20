import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state to disable button during request
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired reset token", {
        position: "top-center",
        autoClose: 3000,
        transition: Slide,
        theme: "colored",
      });
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(to right, #e52d27, #b31217)',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        },
      });
    }

    // Check password length (e.g., at least 6 characters, maximum 20 characters)
    if (newPassword.length < 6 || newPassword.length > 20) {
      return toast.error("Password must be between 6 and 20 characters", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(to right, #e52d27, #b31217)',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        },
      });
    }

    setLoading(true);  // Disable button during request

    try {
      const response = await axios.post('/auth/reset-password', { token, newPassword });

      toast.success('Your password has been successfully reset !!!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        },
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error resetting password', {
        position: "top-center",
        autoClose: 3000,
        transition: Slide,
        theme: "colored",
      });
    } finally {
      setLoading(false);  // Re-enable button after request
    }
  };

  // Handle password input change (limit it to 20 characters)
  const handlePasswordChange = (e) => {
    const value = e.target.value.slice(0, 20);  // Limit to 20 characters
    setNewPassword(value);
  };

  // Handle confirm password input change (limit it to 20 characters)
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value.slice(0, 20);  // Limit to 20 characters
    setConfirmPassword(value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handlePasswordChange}  // Use the new password handler
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}  // Use the new confirm password handler
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
