import React from 'react';
import { Navigate } from 'react-router-dom';
import Profile from '../pages/Profile';  // Import Profile to render it

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  return token ? (
    <Profile />  // If token exists, render the Profile component
  ) : (
    <Navigate to="/login" />  // If no token, redirect to login page
  );
};

export default PrivateRoute;
