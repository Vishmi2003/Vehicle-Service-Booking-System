import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .topbar {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .topbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  .logo-text {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
  }
  
  .logo-sub {
    color: #6b7280;
    display: none;
  }
  
  @media (min-width: 640px) {
    .logo-sub {
      display: inline;
    }
  }
  
  .nav-links {
    display: none;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }
  }
  
  .nav-link {
    color: #374151;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
  }
  
  .nav-link:hover {
    color: #2563eb;
  }
  
  .auth-buttons {
    display: flex;
    gap: 12px;
  }
  
  .login-btn {
    color: #374151;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .login-btn:hover {
    color: #2563eb;
  }
  
  .signup-btn {
    background: #2563eb;
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
    transition: background 0.3s;
    cursor: pointer;
  }
  
  .signup-btn:hover {
    background: #1d4ed8;
  }
  
  .book-service-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s;
    margin-left: 10px;
  }
  
  .book-service-btn:hover {
    background: #059669;
  }
`;

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="topbar">
        <div className="topbar-container">
          <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-text">East & Easy</span>
            <span className="logo-sub">Vehicle Service</span>
          </div>

          <div className="nav-links">
            <span className="nav-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link">Services</span>
            <span className="nav-link">About Us</span>
            <span className="nav-link">Contact Us</span>
          </div>

          <div className="auth-buttons">
            <span className="login-btn" onClick={() => navigate('/login')}>Login</span>
            <span className="signup-btn" onClick={() => navigate('/signup')}>Sign up</span>
            <button className="book-service-btn" onClick={() => navigate('/login')}>Book Service</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;