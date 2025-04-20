import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './middleware/PrivateRoute';
import Home from './pages/Home';
import Footer from './components/Footer';

// User - Item Display, Order
import Inv_Route from "./middleware/Inv_route";

import Inv_Reports_Route from "./middleware/Inv_reports_route";


const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            
            {/* Protected Routes */}
            <Route path="/profile" element={<PrivateRoute />} />
            <Route path="/inventory" element={<Inv_Route />} />
            <Route path="/inventory_reports" element={<Inv_Reports_Route />} />

            {/* Home Route */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
