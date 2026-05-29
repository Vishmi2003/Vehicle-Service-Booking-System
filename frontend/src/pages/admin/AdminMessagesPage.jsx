import React from 'react';

const styles = `
  .message-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .message-sender {
    font-weight: bold;
    color: #1f2937;
  }
  
  .message-date {
    font-size: 12px;
    color: #6b7280;
  }
  
  .message-subject {
    font-weight: 500;
    color: #2563eb;
    margin-bottom: 8px;
  }
  
  .message-text {
    color: #6b7280;
    font-size: 14px;
  }
  
  .delete-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 12px;
  }
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
`;

const AdminMessagesPage = ({ messages, onDelete }) => {
  return (
    <>
      <style>{styles}</style>
      <div>
        <h2 className="section-title">Contact Messages</h2>
        {messages.map(msg => (
          <div key={msg.id} className="message-card">
            <div className="message-header">
              <span className="message-sender">📧 {msg.name} ({msg.email})</span>
              <span className="message-date">{msg.date}</span>
            </div>
            <div className="message-subject">Subject: {msg.subject}</div>
            <div className="message-text">{msg.message}</div>
            <button className="delete-btn" onClick={() => onDelete(msg.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminMessagesPage;