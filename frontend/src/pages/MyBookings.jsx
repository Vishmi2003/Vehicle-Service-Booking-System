import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .my-bookings-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .bookings-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
    flex: 1;
  }
  
  .bookings-title {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: #1f2937;
    margin-bottom: 16px;
  }
  
  .bookings-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 40px;
    font-size: 18px;
  }
  
  /* Notifications Section */
  .notifications-section {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .notifications-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification-badge {
    background: #ef4444;
    color: white;
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 12px;
  }
  
  .clear-all-btn {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    font-size: 12px;
  }
  
  .notifications-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .notification-item {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: #fef3c7;
    border-radius: 12px;
    border-left: 4px solid #f59e0b;
    transition: transform 0.2s;
  }
  
  .notification-item.read {
    background: #f9fafb;
    border-left-color: #9ca3af;
    opacity: 0.8;
  }
  
  .notification-icon {
    font-size: 24px;
  }
  
  .notification-content {
    flex: 1;
  }
  
  .notification-message {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 5px;
  }
  
  .notification-date {
    font-size: 11px;
    color: #6b7280;
  }
  
  .notification-booking {
    font-size: 12px;
    color: #2563eb;
    margin-top: 5px;
  }
  
  .mark-read-btn {
    background: none;
    border: none;
    color: #2563eb;
    cursor: pointer;
    font-size: 12px;
  }
  
  .no-notifications {
    text-align: center;
    padding: 30px;
    color: #6b7280;
  }
  
  /* Booking Cards */
  .no-bookings {
    text-align: center;
    padding: 60px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .no-bookings-icon {
    font-size: 64px;
    margin-bottom: 20px;
  }
  
  .no-bookings p {
    color: #6b7280;
    margin-bottom: 20px;
  }
  
  .book-now-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px 32px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  }
  
  .book-now-btn:hover {
    background: #1d4ed8;
  }
  
  .bookings-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .booking-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }
  
  .booking-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .booking-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .booking-service {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
  }
  
  .status-pending {
    background: #fef3c7;
    color: #d97706;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-confirmed {
    background: #d1fae5;
    color: #059669;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-completed {
    background: #dbeafe;
    color: #2563eb;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-cancelled {
    background: #fee2e2;
    color: #dc2626;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .payment-pending {
    background: #fef3c7;
    color: #d97706;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .payment-completed {
    background: #d1fae5;
    color: #059669;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .booking-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .booking-detail-item {
    display: flex;
    flex-direction: column;
  }
  
  .booking-detail-label {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 5px;
  }
  
  .booking-detail-value {
    font-size: 14px;
    color: #1f2937;
    font-weight: 500;
  }
  
  .admin-message {
    margin-top: 15px;
    padding: 12px;
    background: #eef2ff;
    border-radius: 8px;
    border-left: 4px solid #8b5cf6;
  }
  
  .admin-message-label {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .admin-message-text {
    font-size: 14px;
    color: #1f2937;
  }
  
  .payment-section {
    margin-top: 15px;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .payment-pending-section {
    background: #fef3c7;
    border-left: 4px solid #d97706;
  }
  
  .payment-completed-section {
    background: #d1fae5;
    border-left: 4px solid #059669;
  }
  
  .pay-now-button {
    background: #10b981;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .pay-now-button:hover {
    background: #059669;
    transform: translateY(-2px);
  }
  
  .refresh-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  .refresh-btn:hover {
    background: #1d4ed8;
  }
  
  /* Invoice Button */
  .invoice-btn {
    background: #8b5cf6;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    margin-left: 10px;
  }
  
  .invoice-btn:hover {
    background: #7c3aed;
  }
`;

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(null);

  const loadBookings = () => {
    setLoading(true);
    const userEmail = localStorage.getItem('userEmail');
    
    // Get all bookings
    const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    const myBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    
    // Merge and filter
    let allUserBookings = [...allBookings, ...myBookings];
    const uniqueBookings = allUserBookings.filter((booking, index, self) => 
      index === self.findIndex(b => b.id === booking.id)
    );
    const userBookings = uniqueBookings.filter(b => b.customerEmail === userEmail);
    userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Add payment status to each booking
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const bookingsWithPayment = userBookings.map(booking => {
      const payment = payments.find(p => p.serviceName === booking.serviceName && p.amount === booking.servicePrice);
      return {
        ...booking,
        paymentStatus: payment ? 'completed' : 'pending',
        paymentDetails: payment || null
      };
    });
    
    setBookings(bookingsWithPayment);
    
    // Load notifications for this user
    const allNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    const userNotifications = allNotifications.filter(n => n.userEmail === userEmail);
    setNotifications(userNotifications);
    
    setLoading(false);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }
    
    loadBookings();
    
    const interval = setInterval(loadBookings, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    
    const allNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    const updatedAll = allNotifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem('userNotifications', JSON.stringify(updatedAll));
  };

  const clearAllNotifications = () => {
    const userEmail = localStorage.getItem('userEmail');
    const allNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    const remainingNotifications = allNotifications.filter(n => n.userEmail !== userEmail);
    localStorage.setItem('userNotifications', JSON.stringify(remainingNotifications));
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getAdminMessageForBooking = (bookingId) => {
    const adminMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
    const message = adminMessages.find(m => m.bookingId === bookingId);
    return message;
  };

  const handlePayNow = (booking) => {
    const service = {
      id: booking.id,
      name: booking.serviceName,
      price: booking.servicePrice,
      category: 'Service Booking'
    };
    navigate('/payment', { state: { service, fromMyBookings: true, bookingId: booking.id } });
  };

  const showInvoiceModal = (booking) => {
    setShowInvoice(booking);
  };

  const closeInvoice = () => {
    setShowInvoice(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="my-bookings-page">
        <HomeTopBar />
        <div className="bookings-container">
          <h1 className="bookings-title">My Bookings</h1>
          <p className="bookings-subtitle">View and track your service bookings</p>
          
          {/* Notifications Section */}
          <div className="notifications-section">
            <div className="notifications-header">
              <div className="notifications-title">
                🔔 Notifications
                {unreadCount > 0 && <span className="notification-badge">{unreadCount} new</span>}
              </div>
              {notifications.length > 0 && (
                <button className="clear-all-btn" onClick={clearAllNotifications}>Clear All</button>
              )}
            </div>
            
            {notifications.length === 0 ? (
              <div className="no-notifications">No notifications yet</div>
            ) : (
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.read ? 'read' : ''}`}>
                    <div className="notification-icon">
                      {notification.type === 'admin_message' ? '📧' : notification.type === 'payment' ? '💰' : 'ℹ️'}
                    </div>
                    <div className="notification-content">
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-date">{notification.date}</div>
                      {notification.bookingId && (
                        <div className="notification-booking">
                          Related to Booking #{notification.bookingId}
                        </div>
                      )}
                    </div>
                    {!notification.read && (
                      <button className="mark-read-btn" onClick={() => markAsRead(notification.id)}>
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button className="refresh-btn" onClick={loadBookings}>
              🔄 Refresh Status
            </button>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p>Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="no-bookings">
              <div className="no-bookings-icon">📅</div>
              <p>No bookings found. Book your first service today!</p>
              <button className="book-now-btn" onClick={() => navigate('/services')}>
                Book Now
              </button>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => {
                const adminMessage = getAdminMessageForBooking(booking.id);
                return (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <span className="booking-service">
                        {booking.serviceIcon} {booking.serviceName}
                      </span>
                      <div>
                        <span className={getStatusBadgeClass(booking.status)}>
                          {getStatusText(booking.status)}
                        </span>
                        {booking.paymentStatus === 'completed' && (
                          <button className="invoice-btn" onClick={() => showInvoiceModal(booking)}>
                            📄 Invoice
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="booking-details">
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Booking ID</span>
                        <span className="booking-detail-value">#{booking.id}</span>
                      </div>
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Date</span>
                        <span className="booking-detail-value">{booking.date}</span>
                      </div>
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Time</span>
                        <span className="booking-detail-value">{booking.time}</span>
                      </div>
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Vehicle</span>
                        <span className="booking-detail-value">
                          {booking.vehicleModel} ({booking.vehicleNumber})
                        </span>
                      </div>
                      <div className="booking-detail-item">
                        <span className="booking-detail-label">Price</span>
                        <span className="booking-detail-value">{booking.servicePrice}</span>
                      </div>
                      {booking.specialRequests && (
                        <div className="booking-detail-item">
                          <span className="booking-detail-label">Special Requests</span>
                          <span className="booking-detail-value">{booking.specialRequests}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Admin Message Display */}
                    {adminMessage && (
                      <div className="admin-message">
                        <div className="admin-message-label">
                          📩 Message from Admin
                        </div>
                        <div className="admin-message-text">
                          {adminMessage.message}
                        </div>
                        <div className="notification-date" style={{ marginTop: '5px' }}>
                          Sent: {adminMessage.date}
                        </div>
                      </div>
                    )}
                    
                    {/* Payment Section */}
                    {booking.status === 'completed' && (
                      <div className={`payment-section ${booking.paymentStatus === 'completed' ? 'payment-completed-section' : 'payment-pending-section'}`}>
                        <div>
                          {booking.paymentStatus === 'completed' ? (
                            <>
                              <span style={{ fontSize: '14px', fontWeight: '500', color: '#059669' }}>✓ Payment Completed</span>
                              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                                Transaction ID: {booking.paymentDetails?.transactionId || 'N/A'}
                              </div>
                            </>
                          ) : (
                            <>
                              <span style={{ fontSize: '14px', fontWeight: '500', color: '#d97706' }}>⚠️ Payment Pending</span>
                              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Please complete payment to confirm your booking</div>
                            </>
                          )}
                        </div>
                        {booking.paymentStatus === 'pending' && (
                          <button className="pay-now-button" onClick={() => handlePayNow(booking)}>
                            Pay Now
                          </button>
                        )}
                      </div>
                    )}
                    
                    {booking.status === 'confirmed' && (
                      <div style={{ 
                        marginTop: '15px', 
                        padding: '10px', 
                        background: '#d1fae5', 
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#059669'
                      }}>
                        ✅ Your booking has been confirmed! We'll see you on {booking.date} at {booking.time}.
                      </div>
                    )}
                    
                    {booking.status === 'cancelled' && (
                      <div style={{ 
                        marginTop: '15px', 
                        padding: '10px', 
                        background: '#fee2e2', 
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#dc2626'
                      }}>
                        ❌ This booking has been cancelled.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <HomeFooter />
      </div>
      
      {/* Invoice Modal */}
      {showInvoice && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={closeInvoice}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px' }}>📄</div>
              <h2 style={{ color: '#1f2937' }}>Payment Invoice</h2>
            </div>
            
            <div style={{ borderTop: '2px solid #e5e7eb', borderBottom: '2px solid #e5e7eb', padding: '15px 0', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#6b7280' }}>Invoice #</span>
                <span style={{ fontWeight: 'bold' }}>INV-{showInvoice.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#6b7280' }}>Date</span>
                <span>{showInvoice.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#6b7280' }}>Service</span>
                <span style={{ fontWeight: 'bold' }}>{showInvoice.serviceName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#6b7280' }}>Vehicle</span>
                <span>{showInvoice.vehicleModel} ({showInvoice.vehicleNumber})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#6b7280' }}>Customer</span>
                <span>{showInvoice.customerName}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px' }}>
              <span style={{ fontWeight: 'bold' }}>Total Amount</span>
              <span style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '24px' }}>{showInvoice.servicePrice}</span>
            </div>
            
            <div style={{ textAlign: 'center', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Thank you for choosing East & Easy!</p>
              <button onClick={closeInvoice} style={{
                marginTop: '15px',
                padding: '8px 24px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBookings;