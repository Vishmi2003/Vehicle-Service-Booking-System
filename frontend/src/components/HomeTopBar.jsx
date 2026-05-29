import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .home-topbar {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .home-topbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }
  
  .home-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  .home-logo-text {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
  }
  
  .home-logo-sub {
    color: #6b7280;
    display: none;
  }
  
  @media (min-width: 640px) {
    .home-logo-sub {
      display: inline;
    }
  }
  
  .home-nav-links {
    display: none;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .home-nav-links {
      display: flex;
    }
  }
  
  .home-nav-link {
    color: #374151;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
    font-weight: 500;
    background: none;
    border: none;
    font-size: 16px;
    padding: 8px 0;
  }
  
  .home-nav-link:hover {
    color: #2563eb;
  }
  
  /* Active link style */
  .home-nav-link.active {
    color: #2563eb;
    border-bottom: 2px solid #2563eb;
  }
  
  .home-actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  
  .my-booking-btn {
    background: transparent;
    border: 1px solid #2563eb;
    color: #2563eb;
    padding: 8px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .my-booking-btn:hover {
    background: #2563eb;
    color: white;
  }
  
  .book-service-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s;
  }
  
  .book-service-btn:hover {
    background: #1d4ed8;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-name {
    color: #374151;
    font-weight: 500;
  }
  
  .user-avatar {
    width: 35px;
    height: 35px;
    background: #2563eb;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .logout-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }
  
  .logout-btn:hover {
    background: #dc2626;
  }
`;

const HomeTopBar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Customer';
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const getInitial = () => {
    return userName.charAt(0).toUpperCase();
  };

  const isActive = (path) => {
    return currentPath === path ? 'active' : '';
  };

  return (
    <>
      <style>{styles}</style>
      <div className="home-topbar">
        <div className="home-topbar-container">
          <div className="home-logo" onClick={() => navigate('/home')}>
            <span className="home-logo-text">East & Easy</span>
            <span className="home-logo-sub">Vehicle Service</span>
          </div>

          <div className="home-nav-links">
            <button 
              className={`home-nav-link ${isActive('/home')}`} 
              onClick={() => navigate('/home')}
            >
              Home
            </button>
            <button 
              className={`home-nav-link ${isActive('/services')}`} 
              onClick={() => navigate('/services')}
            >
              Services
            </button>
            <button 
              className={`home-nav-link ${isActive('/about')}`} 
              onClick={() => navigate('/about')}
            >
              About Us
            </button>
            <button 
              className={`home-nav-link ${isActive('/contact')}`} 
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>
          </div>

          <div className="home-actions">
            <button className="my-booking-btn" onClick={() => navigate('/my-bookings')}>
              My Booking
            </button>
            <button className="book-service-btn" onClick={() => navigate('/services')}>
              Book Service
            </button>
            <div className="user-info">
              <div className="user-avatar">{getInitial()}</div>
              <span className="user-name">{userName}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTopBar;