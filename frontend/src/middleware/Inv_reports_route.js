import React from 'react';
import { Navigate } from 'react-router-dom';
import InventoryReports from '../inventory/ItemsReport';  // Import  to render it

const Inv_Reports_Route = () => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  return token ? (
    <InventoryReports />  // If token exists, render the  component
  ) : (
    <Navigate to="/login" />  // If no token, redirect to login page
  );
};

export default Inv_Reports_Route;
