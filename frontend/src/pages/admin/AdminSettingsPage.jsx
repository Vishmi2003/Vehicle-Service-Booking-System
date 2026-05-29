import React, { useState } from 'react';

const styles = `
  .settings-section {
    background: white;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .settings-title {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .setting-label {
    font-weight: 500;
    color: #374151;
  }
  
  .setting-value {
    color: #6b7280;
  }
  
  .toggle-switch {
    width: 50px;
    height: 24px;
    background: #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    transition: background 0.3s;
  }
  
  .toggle-switch.active {
    background: #2563eb;
  }
  
  .toggle-slider {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 3px;
    transition: left 0.3s;
  }
  
  .toggle-switch.active .toggle-slider {
    left: 27px;
  }
  
  .save-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
`;

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoConfirm: true,
    siteName: 'East & Easy',
    contactEmail: 'admin@eastandeasy.com',
    contactPhone: '+94 123 456 789'
  });

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <>
      <style>{styles}</style>
      <div>
        <div className="settings-section">
          <h3 className="settings-title">Notification Settings</h3>
          <div className="setting-item">
            <span className="setting-label">Email Notifications</span>
            <div className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`} onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}>
              <div className="toggle-slider"></div>
            </div>
          </div>
          <div className="setting-item">
            <span className="setting-label">SMS Notifications</span>
            <div className={`toggle-switch ${settings.smsNotifications ? 'active' : ''}`} onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})}>
              <div className="toggle-slider"></div>
            </div>
          </div>
          <div className="setting-item">
            <span className="setting-label">Auto Confirm Bookings</span>
            <div className={`toggle-switch ${settings.autoConfirm ? 'active' : ''}`} onClick={() => setSettings({...settings, autoConfirm: !settings.autoConfirm})}>
              <div className="toggle-slider"></div>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h3 className="settings-title">General Settings</h3>
          <div className="setting-item">
            <span className="setting-label">Site Name</span>
            <input type="text" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
          </div>
          <div className="setting-item">
            <span className="setting-label">Contact Email</span>
            <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
          </div>
          <div className="setting-item">
            <span className="setting-label">Contact Phone</span>
            <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({...settings, contactPhone: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
          </div>
        </div>
        
        <div className="settings-section">
          <h3 className="settings-title">System Information</h3>
          <div className="setting-item">
            <span className="setting-label">Version</span>
            <span className="setting-value">1.0.0</span>
          </div>
          <div className="setting-item">
            <span className="setting-label">Last Backup</span>
            <span className="setting-value">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <button className="save-btn" onClick={handleSave}>Save All Settings</button>
      </div>
    </>
  );
};

export default AdminSettingsPage;