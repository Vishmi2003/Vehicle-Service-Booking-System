import React from 'react';

const styles = `
  .admin-sidebar {
    width: 280px;
    background: #1f2937;
    color: white;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    transition: all 0.3s;
  }
  
  .sidebar-header {
    padding: 24px;
    border-bottom: 1px solid #374151;
    text-align: center;
  }
  
  .sidebar-logo {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
  }
  
  .sidebar-subtitle {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 5px;
  }
  
  .sidebar-nav {
    padding: 20px 0;
  }
  
  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    color: #d1d5db;
    cursor: pointer;
    transition: all 0.3s;
    border-left: 3px solid transparent;
  }
  
  .sidebar-item:hover {
    background: #374151;
    color: white;
  }
  
  .sidebar-item.active {
    background: #374151;
    color: white;
    border-left-color: #2563eb;
  }
  
  .sidebar-icon {
    font-size: 20px;
    width: 24px;
  }
  
  .sidebar-text {
    font-size: 14px;
    font-weight: 500;
  }
`;

const AdminSidebar = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'bookings', icon: '📅', label: 'Bookings' },
    { id: 'messages', icon: '✉️', label: 'Messages' },
    { id: 'services', icon: '🔧', label: 'Services' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'reports', icon: '📈', label: 'Reports' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">East & Easy</div>
          <div className="sidebar-subtitle">Admin Panel</div>
        </div>
        <div className="sidebar-nav">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;