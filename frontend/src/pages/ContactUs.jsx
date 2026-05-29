import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .contact-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .contact-main {
    flex: 1;
  }
  
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Hero Section */
  .contact-hero {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
    padding: 60px 0;
    text-align: center;
  }
  
  .contact-hero-title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .contact-hero-subtitle {
    font-size: 18px;
    opacity: 0.95;
  }
  
  /* Contact Info Cards */
  .contact-info-section {
    padding: 60px 0 40px 0;
  }
  
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 50px;
  }
  
  @media (min-width: 768px) {
    .contact-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .contact-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }
  
  .contact-card:hover {
    transform: translateY(-5px);
  }
  
  .contact-card-icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .contact-card-title {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 10px;
  }
  
  .contact-card-detail {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Map Section */
  .map-section {
    padding: 0 0 40px 0;
  }
  
  .map-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
  
  .map-header {
    padding: 20px 25px 0 25px;
  }
  
  .map-title {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .map-subtitle {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  .map-container {
    width: 100%;
    height: 450px;
    position: relative;
  }
  
  .map-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .nearby-places {
    padding: 20px 25px;
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
  
  .nearby-title {
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .places-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }
  
  .place-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    background: white;
    border-radius: 8px;
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .place-item:hover {
    background: #eef2ff;
    transform: translateX(5px);
  }
  
  .place-icon {
    font-size: 20px;
  }
  
  .place-name {
    font-size: 13px;
    color: #374151;
    flex: 1;
  }
  
  .place-rating {
    font-size: 12px;
    color: #f59e0b;
  }
  
  /* Contact Form */
  .contact-form-section {
    padding: 0 0 60px 0;
  }
  
  .form-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .form-title {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 10px;
  }
  
  .form-subtitle {
    color: #6b7280;
    margin-bottom: 25px;
    font-size: 14px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
    font-size: 14px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
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
    transition: background 0.3s;
  }
  
  .submit-btn:hover {
    background: #1d4ed8;
  }
  
  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  /* Business Hours */
  .hours-section {
    padding: 0 0 60px 0;
  }
  
  .hours-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .hours-title {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .hours-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .hours-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .hours-day {
    font-weight: 500;
    color: #374151;
  }
  
  .hours-time {
    color: #6b7280;
  }
  
  .hours-sunday {
    background: #fef3c7;
    border-radius: 8px;
  }
  
  /* Success/Error Messages */
  .success-message {
    background: #d1fae5;
    color: #059669;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .error-message {
    background: #fee2e2;
    color: #dc2626;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .map-container {
      height: 300px;
    }
  }
`;

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Nearby places data
  const nearbyPlaces = [
    { name: "Lake Edge Holiday Inn", category: "Hotel", rating: "4.5", icon: "🏨" },
    { name: "My Resort Yala", category: "Resort", rating: "4.8", icon: "🏖️" },
    { name: "Lake Side Cabana", category: "Hotel", rating: "4.3", icon: "🏨" },
    { name: "Hotel Birds View", category: "Hotel", rating: "4.2", icon: "🏨" },
    { name: "Debaruwewa Lake", category: "Attraction", rating: "4.6", icon: "🏞️" },
    { name: "Elegant Lake", category: "Attraction", rating: "4.4", icon: "🏞️" },
    { name: "Yala Safari House", category: "Hotel", rating: "4.9", icon: "🏨" },
    { name: "Refresh Seafood Restaurant", category: "Restaurant", rating: "4.7", icon: "🍽️" },
    { name: "EKHO Safari Tissa", category: "Hotel", rating: "4.4", icon: "🏨" },
    { name: "Serene Park Hotel by ARK", category: "Hotel", rating: "4.3", icon: "🏨" },
    { name: "Smoky Kitchen", category: "Restaurant", rating: "4.5", icon: "🍽️" },
    { name: "La safari inn", category: "Hotel", rating: "4.2", icon: "🏨" },
    { name: "Hathimaluwa Rest.", category: "Restaurant", rating: "4.3", icon: "🍽️" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const newMessage = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toLocaleString(),
      status: 'unread'
    };

    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    setSuccess('Message sent successfully! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setLoading(false);
  };

  // Google Maps embed URL (Tissamaharama area - Yala National Park region)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126792.27377903956!2d81.234567!3d6.284567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae6f5c5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sTissamaharama!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk";

  return (
    <>
      <style>{styles}</style>
      <div className="contact-page">
        <HomeTopBar />
        <main className="contact-main">
          {/* Hero Section */}
          <section className="contact-hero">
            <div className="contact-container">
              <h1 className="contact-hero-title">Contact Us</h1>
              <p className="contact-hero-subtitle">We'd love to hear from you. Get in touch with us!</p>
            </div>
          </section>

          {/* Contact Info Cards */}
          <section className="contact-info-section">
            <div className="contact-container">
              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-card-icon">📞</div>
                  <h3 className="contact-card-title">Phone Number</h3>
                  <p className="contact-card-detail">(123) 456-7890</p>
                  <p className="contact-card-detail">+94 77 123 4567</p>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">✉️</div>
                  <h3 className="contact-card-title">Email Address</h3>
                  <p className="contact-card-detail">hello@eastandeasy.com</p>
                  <p className="contact-card-detail">support@eastandeasy.com</p>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">📍</div>
                  <h3 className="contact-card-title">Our Location</h3>
                  <p className="contact-card-detail">Tissamaharama, Sri Lanka</p>
                  <p className="contact-card-detail">Near Yala National Park</p>
                </div>
              </div>
            </div>
          </section>

          {/* Google Map Section */}
          <section className="map-section">
            <div className="contact-container">
              <div className="map-card">
                <div className="map-header">
                  <div className="map-title">
                    <span>📍</span> Find Us Here
                  </div>
                  <p className="map-subtitle">Located in the heart of Tissamaharama, near Yala National Park</p>
                </div>
                <div className="map-container">
                  <iframe 
                    className="map-iframe"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126792.27377903956!2d81.234567!3d6.284567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae6f2b6b2b6b2b6%3A0x2b6b2b6b2b6b2b6b!2sTissamaharama!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map - East & Easy Vehicle Service"
                  ></iframe>
                </div>
                
                {/* Nearby Places */}
                <div className="nearby-places">
                  <div className="nearby-title">
                    <span>🏪</span> Nearby Places & Landmarks
                  </div>
                  <div className="places-grid">
                    {nearbyPlaces.map((place, index) => (
                      <div key={index} className="place-item">
                        <span className="place-icon">{place.icon}</span>
                        <span className="place-name">{place.name}</span>
                        {place.rating && (
                          <span className="place-rating">★ {place.rating}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="contact-form-section">
            <div className="contact-container">
              <div className="form-card">
                <h2 className="form-title">Send Us a Message</h2>
                <p className="form-subtitle">We'll get back to you within 24 hours</p>
                
                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      placeholder="Booking Inquiry / Support / Feedback"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea 
                      name="message" 
                      rows="5" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tell us about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Business Hours */}
          <section className="hours-section">
            <div className="contact-container">
              <div className="hours-card">
                <h2 className="hours-title">Business Hours</h2>
                <div className="hours-grid">
                  <div className="hours-item">
                    <span className="hours-day">Monday - Friday</span>
                    <span className="hours-time">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="hours-day">Saturday</span>
                    <span className="hours-time">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item hours-sunday">
                    <span className="hours-day">Sunday</span>
                    <span className="hours-time">Closed</span>
                  </div>
                  <div className="hours-item">
                    <span className="hours-day">Emergency Support</span>
                    <span className="hours-time">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <HomeFooter />
      </div>
    </>
  );
};

export default ContactUs;