import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import MultiBooking from './pages/MultiBooking';
import ContactUs from './pages/ContactUs';
import Payment from './pages/Payment';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Authenticated User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/multi-booking" element={<MultiBooking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment" element={<Payment />} />
        
        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;