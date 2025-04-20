import React, { useState, useEffect } from 'react';
import axios from '../axios';  // Axios instance to make API requests
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import toast CSS for styling

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    category: '',
    password: '', // Added for password field
  });

  const [loading, setLoading] = useState(false);  // Loading state for form submission
  const [error, setError] = useState('');  // Error state for displaying errors
  const [successMessage, setSuccessMessage] = useState('');  // Success message for successful update
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation modal
  const [passwordConfirm, setPasswordConfirm] = useState(''); // State for the confirmation password input
  const navigate = useNavigate();

  // Fetch user details when the page loads
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');  // Get token from localStorage

      if (!token) {
        navigate('/login');  // Redirect to login if token does not exist
        return;
      }

      setLoading(true);  // Set loading to true while fetching
      try {
        const response = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },  // Pass token in headers
        });
        setUserDetails(response.data);  // Set the user details to state
        setLoading(false);  // Set loading to false after the request completes
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch profile details. Please try again.');  // Set error message
        setLoading(false);  // Set loading to false after the request completes
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Handle form submission to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');  // Get token from localStorage
    if (!token) {
      navigate('/login');
      return;
    }

    // Password validation for profile update (6-20 characters)
    if (userDetails.password && (userDetails.password.length < 6 || userDetails.password.length > 20)) {
      setError('Password must be between 6 and 20 characters.');
      return;
    }

    // Simple form validation (if needed)
    if (!userDetails.firstName || !userDetails.lastName || !userDetails.phoneNumber || !userDetails.address) {
      setError('Please fill in all the required fields.');
      return;
    }

    setLoading(true);  // Set loading to true while submitting the form
    setError('');  // Clear any previous errors
    setSuccessMessage('');  // Clear success message

    try {
      // Send the updated details to the backend to update the user profile
      await axios.put('/auth/profile', userDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update localStorage with the new first name
      localStorage.setItem('firstName', userDetails.firstName);

      // Show success message with custom toast (with one checkmark)
      toast.success('Profile Updated Successfully !!!', {
        position: "top-center",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(to right, #00b09b, #96c93d)',  // Green gradient background
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
          fontSize: '16px',
        },
        progressClassName: 'line-progress',
      });

      // Reload the page after a short delay
      setTimeout(() => {
        navigate('/'); // Navigate to homepage
        setTimeout(() => {
          window.location.reload(); // Then refresh the page
        }, 100); // Small delay to allow navigation to happen first
      }, 5000); // Wait 5 seconds before starting the redirect & reload

      setLoading(false);  // Set loading to false after the request completes
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');  // Set error message
      setLoading(false);  // Set loading to false after the request completes
      toast.error('Failed to update profile. Please try again!');  // Show error toast
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // If phone number, sanitize and limit to 9 digits
    if (name === "phoneNumber") {
      let sanitizedValue = value.replace(/[^0-9]/g, ''); // Allow only digits
      if (sanitizedValue.length > 9) sanitizedValue = sanitizedValue.slice(0, 9);
  
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: sanitizedValue,
      }));
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };
  
  // Handle password change (limit to 20 characters)
  const handlePasswordChange = (e) => {
    const value = e.target.value.slice(0, 20);  // Limit to 20 characters
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      password: value,
    }));
  };

  // Handle confirm password change (limit to 20 characters)
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value.slice(0, 20);  // Limit to 20 characters
    setPasswordConfirm(value);
  };

  // Handle Delete Account Logic
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if password is between 6 and 20 characters
    if (passwordConfirm.length < 6 || passwordConfirm.length > 20) {
      setError('Password must be between 6 and 20 characters.');
      return;
    }

    if (!passwordConfirm) {
      setError('Please enter your password to confirm.');
      return;
    }

    setError('');  // Clear previous error message

    try {
      // Send DELETE request to the backend to delete the account
      const response = await axios.delete('/auth/delete-account', {
        headers: { Authorization: `Bearer ${token}` },  // Send token in Authorization header
        data: { password: passwordConfirm },  // Send the password in the request body
      });

      // Success message
      toast.success('Account Deleted Successfully !!!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      setTimeout(() => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('username');
        navigate('/register');
        window.location.reload(); // Refresh after navigating
      }, 2000);
      
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Incorrect password. Please try again.');
      if (error.response) {
        console.error('Error Response:', error.response);  // Log detailed error response from backend
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', margin: 'auto' }}>
        <h2 className="text-center mb-4">Profile</h2>

        {/* Show error message if any */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Show success message if the profile is updated successfully */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              value={userDetails.category}
              onChange={handleInputChange}
            >
              <option value="Home">Home</option>
              <option value="Shop">Shop</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        {/* Delete Account Button */}
        <button 
          className="btn btn-danger w-100 mt-3" 
          onClick={() => setShowDeleteConfirmation(true)} // Show the confirmation modal
        >
          Delete Account
        </button>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div> // Adding backdrop
        )}
        {showDeleteConfirmation && (
          <div className="modal fade show" tabIndex="-1" style={{ display: 'block', paddingRight: '17px', zIndex: 1050 }} aria-modal="true" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Account Deletion</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Please enter your password to confirm account deletion:</p>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={passwordConfirm} 
                    onChange={handleConfirmPasswordChange}  // Use the new confirm password handler
                    placeholder="Enter password" 
                    required 
                  />
                  {error && <div className="alert alert-danger mt-2">{error}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ToastContainer for toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Profile;
