import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .booking-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .booking-main {
    flex: 1;
  }
  
  .booking-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .booking-title {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: #1f2937;
    margin-bottom: 16px;
  }
  
  .booking-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 40px;
    font-size: 18px;
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
  
  .service-summary {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .service-summary h3 {
    font-size: 24px;
    color: #1f2937;
    margin-bottom: 20px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 10px;
  }
  
  .service-detail-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .service-detail-label {
    font-weight: 500;
    color: #6b7280;
  }
  
  .service-detail-value {
    font-weight: 600;
    color: #1f2937;
  }
  
  .service-price-total {
    background: #f3f4f6;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
  }
  
  .booking-form {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .booking-form h3 {
    font-size: 24px;
    color: #1f2937;
    margin-bottom: 20px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 10px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #2563eb;
  }
  
  .submit-btn {
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background: #1d4ed8;
  }
  
  .error-message {
    background: #fee2e2;
    color: #dc2626;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .success-message {
    background: #d1fae5;
    color: #059669;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [service, setService] = useState(null);
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }

    // Get service from navigation state
    const selectedService = location.state?.service;
    if (selectedService) {
      setService(selectedService);
      // Pre-fill customer info from localStorage
      const userName = localStorage.getItem('userName') || '';
      const userEmail = localStorage.getItem('userEmail') || '';
      setFormData(prev => ({
        ...prev,
        customerName: userName,
        customerEmail: userEmail
      }));
    } else {
      // If no service selected, go back to services
      navigate('/services');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.vehicleModel || !formData.vehicleNumber || !formData.bookingDate || !formData.bookingTime) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    // Create booking object
    const newBooking = {
      id: Date.now(),
      serviceName: service.title,
      servicePrice: service.price,
      serviceIcon: service.icon,
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

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('myBookings', JSON.stringify(existingBookings));

    // Also save to all bookings for admin
    const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    allBookings.push(newBooking);
    localStorage.setItem('allBookings', JSON.stringify(allBookings));

    setSuccess('Booking confirmed successfully! Redirecting...');
    
    setTimeout(() => {
      navigate('/my-bookings');
    }, 2000);
  };

  if (!service) {
    return (
      <div className="booking-page">
        <HomeTopBar />
        <div className="booking-main">
          <div className="booking-container" style={{textAlign: 'center'}}>
            <p>Loading...</p>
          </div>
        </div>
        <HomeFooter />
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="booking-page">
        <HomeTopBar />
        <main className="booking-main">
          <div className="booking-container">
            <h1 className="booking-title">Book Your Service</h1>
            <p className="booking-subtitle">Complete the form below to confirm your booking</p>
            
            <div className="booking-grid">
              {/* Service Summary */}
              <div className="service-summary">
                <h3>Service Details</h3>
                <div className="service-detail-item">
                  <span className="service-detail-label">Service</span>
                  <span className="service-detail-value">{service.title}</span>
                </div>
                <div className="service-detail-item">
                  <span className="service-detail-label">Description</span>
                  <span className="service-detail-value">{service.description}</span>
                </div>
                <div className="service-detail-item">
                  <span className="service-detail-label">Duration</span>
                  <span className="service-detail-value">{service.duration || '1-2 hours'}</span>
                </div>
                <div className="service-price-total">
                  <div className="service-detail-item">
                    <span className="service-detail-label">Total Price</span>
                    <span className="service-detail-value" style={{fontSize: '24px', color: '#2563eb'}}>{service.price}</span>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="booking-form">
                <h3>Your Information</h3>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleChange} placeholder="Optional" />
                  </div>
                  
                  <div className="form-group">
                    <label>Vehicle Model *</label>
                    <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g., Toyota Camry" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Vehicle Number *</label>
                    <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="e.g., ABC-1234" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Preferred Time *</label>
                    <select name="bookingTime" value={formData.bookingTime} onChange={handleChange} required>
                      <option value="">Select time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Special Requests</label>
                    <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" placeholder="Any additional notes..." />
                  </div>
                  
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <HomeFooter />
      </div>
    </>
  );
};

export default Booking;