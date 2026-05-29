import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .home-footer {
    background: #111827;
    color: white;
    padding: 48px 0 24px;
    margin-top: auto;
  }
  
  .home-footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .home-footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 48px;
  }
  
  @media (min-width: 768px) {
    .home-footer-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .home-footer-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    color: white;
  }
  
  .home-footer-text {
    color: #9ca3af;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .home-footer-heading {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    color: white;
  }
  
  .home-footer-links {
    list-style: none;
    padding: 0;
  }
  
  .home-footer-links li {
    margin-bottom: 8px;
  }
  
  .home-footer-link {
    color: #9ca3af;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s;
    background: none;
    border: none;
    font-size: 14px;
    padding: 0;
  }
  
  .home-footer-link:hover {
    color: white;
  }
  
  .home-contact-item {
    margin-bottom: 12px;
    color: #9ca3af;
    font-size: 14px;
  }
  
  .home-contact-icon {
    font-size: 20px;
    margin-right: 10px;
  }
  
  .home-copyright {
    border-top: 1px solid #374151;
    padding-top: 24px;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
  }
  
  .social-links {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }
  
  .social-link {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s;
    font-size: 20px;
  }
  
  .social-link:hover {
    color: white;
  }
`;

const HomeFooter = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <footer className="home-footer">
        <div className="home-footer-container">
          <div className="home-footer-grid">
            <div>
              <h3 className="home-footer-title">East & Easy</h3>
              <p className="home-footer-text">
                Professional Vehicle Service with hassle-free booking experience.
                Quality service by experienced experts.
              </p>
            </div>
            <div>
              <h4 className="home-footer-heading">Quick Links</h4>
              <ul className="home-footer-links">
                <li><button className="home-footer-link" onClick={() => navigate('/home')}>Home</button></li>
                <li><button className="home-footer-link" onClick={() => navigate('/services')}>Services</button></li>
                <li><button className="home-footer-link" onClick={() => navigate('/about')}>About Us</button></li>
                <li><button className="home-footer-link" onClick={() => navigate('/contact')}>Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="home-footer-heading">Our Services</h4>
              <ul className="home-footer-links">
                <li><span className="home-contact-item">Oil Change</span></li>
                <li><span className="home-contact-item">General Service</span></li>
                <li><span className="home-contact-item">Brake Service</span></li>
                <li><span className="home-contact-item">Tyre Replacement</span></li>
                <li><span className="home-contact-item">Battery Check</span></li>
                <li><span className="home-contact-item">Car Wash</span></li>
              </ul>
            </div>
            <div>
              <h4 className="home-footer-heading">Contact Info</h4>
              <div className="home-contact-item">
                <span className="home-contact-icon">📞</span> (123) 456-7890
              </div>
              <div className="home-contact-item">
                <span className="home-contact-icon">✉️</span> hello@vehiclepestservice.com
              </div>
              <div className="home-contact-item">
                <span className="home-contact-icon">📍</span> 123 Anywhere St., Any City, ST 12345
              </div>
              <div className="social-links">
                <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">📘</a>
                <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">🐦</a>
                <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">📷</a>
              </div>
            </div>
          </div>
          <div className="home-copyright">
            <p>&copy; {new Date().getFullYear()} East & Easy Vehicle Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeFooter;