import React, { useState } from 'react';

const styles = `
  .data-table {
    background: white;
    border-radius: 12px;
    overflow-x: auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    background: #f3f4f6;
    padding: 15px;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
  }
  
  td {
    padding: 12px 15px;
    border-bottom: 1px solid #e5e7eb;
    color: #6b7280;
  }
  
  .status-pending {
    background: #fef3c7;
    color: #d97706;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    display: inline-block;
  }
  
  .status-confirmed {
    background: #d1fae5;
    color: #059669;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    display: inline-block;
  }
  
  .status-completed {
    background: #dbeafe;
    color: #2563eb;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    display: inline-block;
  }
  
  .status-cancelled {
    background: #fee2e2;
    color: #dc2626;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    display: inline-block;
  }
  
  .payment-pending {
    background: #fef3c7;
    color: #d97706;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 10px;
    display: inline-block;
    margin-left: 5px;
  }
  
  .payment-completed {
    background: #d1fae5;
    color: #059669;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 10px;
    display: inline-block;
    margin-left: 5px;
  }
  
  .action-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 3px;
    font-size: 12px;
  }
  
  .delete-btn {
    background: #ef4444;
  }
  
  .info-btn {
    background: #10b981;
  }
  
  .pay-btn {
    background: #8b5cf6;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 3px;
    font-size: 12px;
  }
  
  .pay-btn:hover {
    background: #7c3aed;
  }
  
  select {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
  }
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  /* Unavailable Dates Section */
  .unavailable-section {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .unavailable-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .unavailable-title {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .add-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .unavailable-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .unavailable-card {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .unavailable-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .unavailable-date {
    font-weight: bold;
    color: #d97706;
  }
  
  .unavailable-reason {
    font-size: 12px;
    color: #6b7280;
  }
  
  .remove-unavailable {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #ef4444;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 12px;
    padding: 25px;
    width: 90%;
    max-width: 450px;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .modal-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 15px;
  }
  
  .modal-textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 15px;
    resize: vertical;
  }
  
  .modal-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  
  .modal-btn {
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .modal-btn-primary {
    background: #2563eb;
    color: white;
    border: none;
  }
  
  .modal-btn-secondary {
    background: #e5e7eb;
    border: none;
  }
  
  /* Message Row */
  .message-row {
    background: #eef2ff;
  }
  
  .message-text {
    font-size: 12px;
    color: #2563eb;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .send-message-btn {
    background: #8b5cf6;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
  }
  
  /* Payment Modal */
  .payment-details {
    background: #f9fafb;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .payment-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .payment-label {
    font-weight: 500;
    color: #6b7280;
  }
  
  .payment-value {
    font-weight: 600;
    color: #1f2937;
  }
`;

const AdminBookingsPage = ({ bookings, onUpdateStatus, onDelete }) => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState(() => {
    const saved = localStorage.getItem('unavailableDates');
    return saved ? JSON.parse(saved) : [];
  });
  const [newUnavailable, setNewUnavailable] = useState({
    date: '',
    reason: ''
  });
  const [adminMessage, setAdminMessage] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('adminMessages');
    return saved ? JSON.parse(saved) : [];
  });

  // Get payment status for a booking
  const getPaymentStatus = (booking) => {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const payment = payments.find(p => p.serviceName === booking.serviceName && p.amount === booking.servicePrice);
    return payment ? { status: 'completed', transactionId: payment.transactionId, date: payment.date } : { status: 'pending' };
  };

  const addUnavailableDate = () => {
    if (newUnavailable.date) {
      const updated = [...unavailableDates, { 
        ...newUnavailable, 
        id: Date.now(),
        createdAt: new Date().toISOString()
      }];
      setUnavailableDates(updated);
      localStorage.setItem('unavailableDates', JSON.stringify(updated));
      setNewUnavailable({ date: '', reason: '' });
      setShowDateModal(false);
      alert('Unavailable date added successfully!');
    }
  };

  const removeUnavailableDate = (id) => {
    const updated = unavailableDates.filter(d => d.id !== id);
    setUnavailableDates(updated);
    localStorage.setItem('unavailableDates', JSON.stringify(updated));
  };

  const sendMessageToUser = () => {
    if (adminMessage.trim() && selectedBooking) {
      const newMessage = {
        id: Date.now(),
        bookingId: selectedBooking.id,
        customerName: selectedBooking.customerName,
        customerEmail: selectedBooking.customerEmail,
        message: adminMessage,
        date: new Date().toLocaleString(),
        read: false
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));
      
      const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
      userNotifications.push({
        id: Date.now(),
        userEmail: selectedBooking.customerEmail,
        bookingId: selectedBooking.id,
        message: `📩 Admin message regarding your booking #${selectedBooking.id}: ${adminMessage}`,
        date: new Date().toLocaleString(),
        type: 'admin_message',
        read: false
      });
      localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
      
      setAdminMessage('');
      setShowMessageModal(false);
      alert(`Message sent to ${selectedBooking.customerName}`);
    }
  };

  const handleMarkAsPaid = (booking) => {
    // Create payment record
    const paymentRecord = {
      id: Date.now(),
      serviceName: booking.serviceName,
      amount: booking.servicePrice,
      method: 'Cash',
      date: new Date().toLocaleString(),
      status: 'completed',
      transactionId: 'TXN' + Date.now(),
      bookingId: booking.id,
      customerName: booking.customerName
    };
    
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    payments.push(paymentRecord);
    localStorage.setItem('payments', JSON.stringify(payments));
    
    // Create notification for user
    const userNotifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
    userNotifications.push({
      id: Date.now(),
      userEmail: booking.customerEmail,
      bookingId: booking.id,
      message: `✅ Payment of ${booking.servicePrice} for ${booking.serviceName} has been marked as PAID by admin.`,
      date: new Date().toLocaleString(),
      type: 'payment',
      read: false
    });
    localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
    
    setShowPaymentModal(false);
    alert(`Payment marked as completed for ${booking.customerName}`);
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(d => d.date === date);
  };

  const getUnavailableReason = (date) => {
    const item = unavailableDates.find(d => d.date === date);
    return item ? item.reason : '';
  };

  return (
    <>
      <style>{styles}</style>
      <div>
        {/* Unavailable Dates Section */}
        <div className="unavailable-section">
          <div className="unavailable-header">
            <div className="unavailable-title">
              ⚠️ Unavailable Dates & Times
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'normal' }}>
                (Admin can mark dates when service is not available)
              </span>
            </div>
            <button className="add-btn" onClick={() => setShowDateModal(true)}>+ Add Unavailable Date</button>
          </div>
          
          {unavailableDates.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
              No unavailable dates set. Click "Add Unavailable Date" to mark holidays or maintenance days.
            </p>
          ) : (
            <div className="unavailable-grid">
              {unavailableDates.map(date => (
                <div key={date.id} className="unavailable-card">
                  <div className="unavailable-info">
                    <span className="unavailable-date">📅 {date.date}</span>
                    <span className="unavailable-reason">{date.reason || 'No service available'}</span>
                  </div>
                  <button className="remove-unavailable" onClick={() => removeUnavailableDate(date.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookings Table */}
        <h2 className="section-title">All Bookings</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Admin Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => {
                const isUnavailable = isDateUnavailable(booking.date);
                const unavailableReason = getUnavailableReason(booking.date);
                const bookingMessage = messages.find(m => m.bookingId === booking.id);
                const paymentStatus = getPaymentStatus(booking);
                
                return (
                  <tr key={booking.id} className={isUnavailable ? 'message-row' : ''}>
                    <td>#{booking.id}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.serviceName}</td>
                    <td style={isUnavailable ? { color: '#dc2626', fontWeight: 'bold' } : {}}>
                      {booking.date}
                      {isUnavailable && (
                        <div style={{ fontSize: '10px', color: '#dc2626' }}>⚠️ Unavailable</div>
                      )}
                    </td>
                    <td>{booking.time}</td>
                    <td>{booking.servicePrice}</td>
                    <td>
                      <span className={`status-${booking.status}`}>{booking.status}</span>
                    </td>
                    <td>
                      {booking.status === 'completed' && (
                        paymentStatus.status === 'completed' ? (
                          <span className="payment-completed">✓ Paid</span>
                        ) : (
                          <span className="payment-pending">⚠️ Pending</span>
                        )
                      )}
                    </td>
                    <td>
                      {bookingMessage ? (
                        <div className="message-text" title={bookingMessage.message}>
                          💬 {bookingMessage.message.substring(0, 30)}...
                        </div>
                      ) : (
                        <button 
                          className="send-message-btn"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowMessageModal(true);
                          }}
                        >
                          Send Message
                        </button>
                      )}
                    </td>
                    <td>
                      <select 
                        onChange={(e) => {
                          if (isUnavailable && e.target.value === 'confirmed') {
                            alert(`⚠️ Cannot confirm booking on ${booking.date}. ${unavailableReason}`);
                            return;
                          }
                          onUpdateStatus(booking.id, e.target.value);
                        }} 
                        value={booking.status}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed" disabled={isUnavailable}>Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button className="action-btn info-btn" onClick={() => {
                        setSelectedBooking(booking);
                        setShowMessageModal(true);
                      }}>💬</button>
                      {booking.status === 'completed' && paymentStatus.status === 'pending' && (
                        <button className="pay-btn" onClick={() => {
                          setSelectedBooking(booking);
                          setShowPaymentModal(true);
                        }}>
                          💰 Mark as Paid
                        </button>
                      )}
                      <button className="action-btn delete-btn" onClick={() => onDelete(booking.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Unavailable Date Modal */}
        {showDateModal && (
          <div className="modal-overlay" onClick={() => setShowDateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Mark Unavailable Date</h3>
              <input 
                type="date" 
                className="modal-input"
                value={newUnavailable.date}
                onChange={(e) => setNewUnavailable({...newUnavailable, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
              <textarea 
                className="modal-textarea"
                placeholder="Reason (e.g., Public Holiday, Maintenance, Staff Training...)"
                rows="3"
                value={newUnavailable.reason}
                onChange={(e) => setNewUnavailable({...newUnavailable, reason: e.target.value})}
              />
              <div className="modal-buttons">
                <button className="modal-btn modal-btn-secondary" onClick={() => setShowDateModal(false)}>Cancel</button>
                <button className="modal-btn modal-btn-primary" onClick={addUnavailableDate}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Send Message Modal */}
        {showMessageModal && selectedBooking && (
          <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Send Message to {selectedBooking.customerName}</h3>
              <div style={{ marginBottom: '15px', padding: '10px', background: '#f3f4f6', borderRadius: '8px' }}>
                <p><strong>Booking Details:</strong></p>
                <p>Service: {selectedBooking.serviceName}</p>
                <p>Date: {selectedBooking.date} at {selectedBooking.time}</p>
              </div>
              <textarea 
                className="modal-textarea"
                placeholder="Write your message here... (e.g., Sorry, this date is unavailable. Please reschedule.)"
                rows="4"
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
              />
              <div className="modal-buttons">
                <button className="modal-btn modal-btn-secondary" onClick={() => setShowMessageModal(false)}>Cancel</button>
                <button className="modal-btn modal-btn-primary" onClick={sendMessageToUser}>Send Message</button>
              </div>
            </div>
          </div>
        )}

        {/* Mark as Paid Modal */}
        {showPaymentModal && selectedBooking && (
          <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Confirm Payment</h3>
              <div className="payment-details">
                <div className="payment-row">
                  <span className="payment-label">Customer:</span>
                  <span className="payment-value">{selectedBooking.customerName}</span>
                </div>
                <div className="payment-row">
                  <span className="payment-label">Service:</span>
                  <span className="payment-value">{selectedBooking.serviceName}</span>
                </div>
                <div className="payment-row">
                  <span className="payment-label">Amount:</span>
                  <span className="payment-value">{selectedBooking.servicePrice}</span>
                </div>
                <div className="payment-row">
                  <span className="payment-label">Date:</span>
                  <span className="payment-value">{selectedBooking.date}</span>
                </div>
              </div>
              <p style={{ marginBottom: '20px', color: '#6b7280', fontSize: '14px' }}>
                Mark this booking as paid? This action cannot be undone.
              </p>
              <div className="modal-buttons">
                <button className="modal-btn modal-btn-secondary" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                <button className="modal-btn modal-btn-primary" onClick={() => handleMarkAsPaid(selectedBooking)}>
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBookingsPage;