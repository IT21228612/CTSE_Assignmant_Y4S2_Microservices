const express = require('express');
const router = express.Router();

// Controller functions
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP, // Add verifyOTP
  resetPassword,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require('../Controllers/userController');

// Auth routes
router.post('/register', registerUser);          // Register new user
router.post('/login', loginUser);                // Login existing user
router.post('/forgot-password', forgotPassword); // Request password reset
router.post('/verify-otp', verifyOTP);           // Verify OTP (New Route)
router.post('/reset-password', resetPassword);   // Reset password with token
router.get('/profile', getUserProfile);  // Get user profile route
router.put('/profile', updateUserProfile);  // Update user profile route


// Apply authentication middleware to the delete account route
router.delete('/delete-account', deleteUserAccount);

module.exports = router;
