import React from 'react';

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
  
  .delete-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
  }
  
  .section-title {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
`;

const AdminUsersPage = ({ users, onDelete }) => {
  return (
    <>
      <style>{styles}</style>
      <div>
        <h2 className="section-title">All Users</h2>
        <div className="data-table">
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Registered Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td><button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;