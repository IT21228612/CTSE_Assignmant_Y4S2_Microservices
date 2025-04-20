import React from 'react';
import { Navigate } from 'react-router-dom';
import Inventory from '../inventory/Items';  // Import  to render it

const Inv_Route = () => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  return token ? (
    <Inventory />  // If token exists, render the  component
  ) : (
    <Navigate to="/login" />  // If no token, redirect to login page
  );
};

export default Inv_Route;
