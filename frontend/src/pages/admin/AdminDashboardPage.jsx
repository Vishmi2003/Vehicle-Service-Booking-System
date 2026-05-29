import React from 'react';

const styles = `
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .stat-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
  }
  
  .stat-number {
    font-size: 36px;
    font-weight: bold;
    color: #2563eb;
    margin-bottom: 10px;
  }
  
  .stat-label {
    color: #6b7280;
    font-size: 14px;
  }
  
  .charts-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 30px;
  }
  
  @media (min-width: 1024px) {
    .charts-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .chart-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .chart-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .chart-bars {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 250px;
    gap: 10px;
  }
  
  .chart-bar {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .bar {
    width: 100%;
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    border-radius: 8px;
    transition: height 0.5s;
  }
  
  .bar-label {
    font-size: 12px;
    color: #6b7280;
  }
  
  .bar-value {
    font-size: 14px;
    font-weight: bold;
    color: #2563eb;
  }
  
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
`;

const AdminDashboardPage = ({ bookings, stats }) => {
  const bookingData = [
    { day: 'Mon', count: bookings.filter(b => new Date(b.createdAt).getDay() === 1).length },
    { day: 'Tue', count: bookings.filter(b => new Date(b.createdAt).getDay() === 2).length },
    { day: 'Wed', count: bookings.filter(b => new Date(b.createdAt).getDay() === 3).length },
    { day: 'Thu', count: bookings.filter(b => new Date(b.createdAt).getDay() === 4).length },
    { day: 'Fri', count: bookings.filter(b => new Date(b.createdAt).getDay() === 5).length },
    { day: 'Sat', count: bookings.filter(b => new Date(b.createdAt).getDay() === 6).length }
  ];

  const maxCount = Math.max(...bookingData.map(d => d.count), 1);

  const statusData = [
    { label: 'Pending', count: stats.pendingBookings, color: '#f59e0b' },
    { label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length, color: '#10b981' },
    { label: 'Completed', count: stats.completedBookings, color: '#3b82f6' }
  ];

  return (
    <>
      <style>{styles}</style>
      <div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pendingBookings}</div>
            <div className="stat-label">Pending Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalMessages || 0}</div>
            <div className="stat-label">Messages</div>
          </div>
        </div>
        
        <div className="charts-container">
          <div className="chart-card">
            <h3 className="chart-title">Weekly Bookings</h3>
            <div className="chart-bars">
              {bookingData.map((data, idx) => (
                <div key={idx} className="chart-bar">
                  <div className="bar-value">{data.count}</div>
                  <div className="bar" style={{ height: `${(data.count / maxCount) * 200}px` }}></div>
                  <div className="bar-label">{data.day}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-card">
            <h3 className="chart-title">Booking Status Distribution</h3>
            <div className="chart-bars">
              {statusData.map((data, idx) => (
                <div key={idx} className="chart-bar">
                  <div className="bar-value">{data.count}</div>
                  <div className="bar" style={{ height: `${(data.count / Math.max(...statusData.map(s => s.count), 1)) * 200}px`, background: data.color }}></div>
                  <div className="bar-label">{data.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="data-table">
          <h3 className="chart-title" style={{ padding: '20px 20px 0 20px' }}>Recent Bookings</h3>
          <table>
            <thead>
              <tr><th>ID</th><th>Customer</th><th>Service</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map(booking => (
                <tr key={booking.id}>
                  <td>#{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.date}</td>
                  <td><span className={`status-${booking.status}`}>{booking.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;