// routes/authRoutes.js
// Authentication routes for user registration, login, and password management

const express = require('express');
const router = express.Router();

// Controller functions
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../Controllers/userController');

// Auth routes
router.post('/register', registerUser);          // Register new user
router.post('/login', loginUser);                // Login existing user
router.post('/forgot-password', forgotPassword); // Request password reset
router.post('/reset-password', resetPassword);   // Reset password with token

module.exports = router;
