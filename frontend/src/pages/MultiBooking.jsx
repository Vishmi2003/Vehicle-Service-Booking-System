import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .multi-booking-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .booking-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    flex: 1;
  }
  
  .booking-title {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
  }
  
  .booking-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 40px;
  }
  
  .booking-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  @media (min-width: 768px) {
    .booking-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .services-summary {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .services-list {
    margin-top: 20px;
  }
  
  .service-item {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .total-amount {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 2px solid #e5e7eb;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
  
  .booking-form {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
  }
  
  .submit-btn {
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const MultiBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    vehicleModel: '',
    vehicleNumber: '',
    bookingDate: '',
    bookingTime: '',
    specialRequests: ''
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }
    
    const selectedServices = location.state?.services || [];
    if (selectedServices.length === 0) {
      navigate('/services');
      return;
    }
    
    setServices(selectedServices);
    setFormData(prev => ({
      ...prev,
      customerName: localStorage.getItem('userName') || '',
      customerEmail: localStorage.getItem('userEmail') || ''
    }));
  }, [location, navigate]);

  const getTotalPrice = () => {
    return services.reduce((total, s) => {
      const price = parseInt(s.price.replace(/[^0-9]/g, ''));
      return total + price;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBooking = {
      id: Date.now(),
      services: services.map(s => s.title),
      serviceNames: services.map(s => s.title).join(', '),
      totalPrice: `Rs ${getTotalPrice().toLocaleString()}`,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      vehicleModel: formData.vehicleModel,
      vehicleNumber: formData.vehicleNumber,
      date: formData.bookingDate,
      time: formData.bookingTime,
      specialRequests: formData.specialRequests,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    allBookings.push(newBooking);
    localStorage.setItem('allBookings', JSON.stringify(allBookings));
    
    const myBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    myBookings.push(newBooking);
    localStorage.setItem('myBookings', JSON.stringify(myBookings));
    
    alert('Booking confirmed successfully!');
    navigate('/my-bookings');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="multi-booking-page">
        <HomeTopBar />
        <div className="booking-container">
          <h1 className="booking-title">Complete Your Booking</h1>
          <p className="booking-subtitle">Review your services and provide vehicle details</p>
          
          <div className="booking-grid">
            <div className="services-summary">
              <h3>Selected Services ({services.length})</h3>
              <div className="services-list">
                {services.map(service => (
                  <div key={service.id} className="service-item">
                    <span>{service.icon} {service.title}</span>
                    <span>{service.price}</span>
                  </div>
                ))}
              </div>
              <div className="total-amount">
                <span>Total Amount:</span>
                <span style={{ color: '#2563eb' }}>Rs {getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="booking-form">
              <h3>Vehicle & Contact Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={formData.customerEmail} onChange={(e) => setFormData({...formData, customerEmail: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" value={formData.customerPhone} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Vehicle Model</label>
                  <input type="text" value={formData.vehicleModel} onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})} required placeholder="e.g., Toyota Camry" />
                </div>
                <div className="form-group">
                  <label>Vehicle Number</label>
                  <input type="text" value={formData.vehicleNumber} onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})} required placeholder="e.g., ABC-1234" />
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" value={formData.bookingDate} onChange={(e) => setFormData({...formData, bookingDate: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select value={formData.bookingTime} onChange={(e) => setFormData({...formData, bookingTime: e.target.value})} required>
                    <option value="">Select</option>
                    <option>09:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
                    <option>12:00 PM</option><option>01:00 PM</option><option>02:00 PM</option>
                    <option>03:00 PM</option><option>04:00 PM</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea rows="3" value={formData.specialRequests} onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} />
                </div>
                <button type="submit" className="submit-btn">Confirm Booking</button>
              </form>
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
    </>
  );
};

export default MultiBooking;