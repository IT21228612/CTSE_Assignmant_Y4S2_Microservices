import React, { useState } from 'react';
import axios from '../axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import 'react-toastify/dist/ReactToastify.css';  // Ensure correct toast styles are imported

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/forgot-password', { email });
      toast.success(
        <div>
          <strong>OTP Sent !!!</strong>
          <br />
          Check your inbox and enter the code below.
        </div>,
        {
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
        }
      );
      
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending OTP', {
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
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
  
    // Validate OTP
    try {
      const response = await axios.post('/auth/verify-otp', { email, otp });
      if (response.data.message === "OTP validated") {
        toast.success(response.data.message, {
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
        
  
        // Navigate to Reset Password page if OTP is valid
        setTimeout(() => {
          navigate(`/reset-password?token=${response.data.token}`); // Using navigate for redirection
        }, 3000); // Redirect after the toast message is displayed
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong', {
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
  };
  

  return (
    <div className="forgot-password-container">
      <div className="card shadow-lg p-5">
        <h2 className="text-center mb-4">Forgot Password</h2>
        {!isOtpSent ? (
          <form onSubmit={handleSubmitEmail}>
            <div className="form-group mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleSubmitOTP}>
            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">Verify OTP</button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
