import React from 'react';

const styles = `
  .footer {
    background: #111827;
    color: white;
    padding: 48px 0 24px;
    margin-top: auto;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 48px;
  }
  
  @media (min-width: 768px) {
    .footer-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .footer-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .footer-text {
    color: #9ca3af;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .footer-heading {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin-bottom: 8px;
    color: #9ca3af;
    font-size: 14px;
  }
  
  .footer-links a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-links a:hover {
    color: white;
  }
  
  .contact-item {
    margin-bottom: 12px;
  }
  
  .contact-icon {
    font-size: 20px;
    margin-right: 10px;
  }
  
  .copyright {
    border-top: 1px solid #374151;
    padding-top: 24px;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
  }
`;

const Footer = () => {
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-title">East & Easy</h3>
              <p className="footer-text">Professional Vehicle Service with hassle-free booking experience.</p>
            </div>
            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Our Services</h4>
              <ul className="footer-links">
                <li>Oil Change</li>
                <li>General Service</li>
                <li>Brake Service</li>
                <li>Tyre Replacement</li>
                <li>Battery Check</li>
                <li>Car Wash</li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Contact Us</h4>
              <div className="contact-item">
                <span className="contact-icon">📞</span> (123) 456-7890
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span> hello@vehiclepestservice.com
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span> 123 Anywhere St., Any City, ST 12345
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} East & Easy Vehicle Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;