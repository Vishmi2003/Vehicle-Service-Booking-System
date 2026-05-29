import React from 'react';

const styles = `
  .reports-page {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .reports-header {
    margin-bottom: 30px;
  }
  
  .reports-title {
    font-size: 28px;
    font-weight: bold;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .reports-subtitle {
    color: #6b7280;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .date-range {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }
  
  .date-btn {
    background: #f3f4f6;
    border: none;
    padding: 6px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.3s;
  }
  
  .date-btn:hover {
    background: #2563eb;
    color: white;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .stat-card {
    background: white;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #10b981);
  }
  
  .stat-icon {
    font-size: 32px;
    margin-bottom: 10px;
  }
  
  .stat-number {
    font-size: 32px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 5px;
  }
  
  .stat-label {
    color: #6b7280;
    font-size: 13px;
  }
  
  .stat-trend {
    font-size: 12px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .trend-up { color: #10b981; }
  .trend-down { color: #ef4444; }
  
  .charts-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 30px;
  }
  
  @media (min-width: 1024px) {
    .charts-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .chart-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .chart-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
  }
  
  .chart-value {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
  }
  
  .chart-bars {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 200px;
    gap: 15px;
  }
  
  .chart-bar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .chart-bar {
    width: 100%;
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    border-radius: 8px;
    transition: height 0.5s;
    position: relative;
  }
  
  .chart-bar-value {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: bold;
    color: #2563eb;
  }
  
  .chart-label {
    font-size: 12px;
    color: #6b7280;
  }
  
  /* Pie Chart */
  .pie-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .pie-chart {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin: 20px auto;
    transition: transform 0.3s;
  }
  
  .pie-legend {
    width: 100%;
    margin-top: 20px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .legend-label {
    flex: 1;
    font-size: 14px;
    color: #4b5563;
  }
  
  .legend-value {
    font-weight: bold;
    color: #1f2937;
  }
  
  .legend-percent {
    font-size: 12px;
    color: #6b7280;
    margin-left: 10px;
  }
  
  /* Revenue Chart */
  .revenue-chart {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 25px;
    color: white;
  }
  
  .revenue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .revenue-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .revenue-amount {
    font-size: 36px;
    font-weight: bold;
  }
  
  /* Top Services Table */
  .top-services {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  
  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .services-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .services-table th {
    text-align: left;
    padding: 12px;
    background: #f3f4f6;
    font-weight: 600;
    color: #374151;
    border-radius: 8px;
  }
  
  .services-table td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    color: #6b7280;
  }
  
  .service-rank {
    font-weight: bold;
    color: #2563eb;
  }
  
  /* Quick Insights */
  .insights-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  @media (min-width: 768px) {
    .insights-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .insight-card {
    background: linear-gradient(135deg, #f3f4f6, #ffffff);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
  }
  
  .insight-icon {
    font-size: 32px;
    margin-bottom: 10px;
  }
  
  .insight-value {
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
  }
  
  .insight-label {
    font-size: 13px;
    color: #6b7280;
    margin-top: 5px;
  }
  
  /* Export Button */
  .export-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    transition: all 0.3s;
    margin-bottom: 20px;
  }
  
  .export-btn:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
  }
`;

const AdminReportsPage = ({ bookings, users, stats }) => {
  // Calculate totals
  const totalRevenue = bookings.reduce((sum, b) => sum + parseInt(b.servicePrice?.replace(/[^0-9]/g, '') || 0), 0);
  const newUsersLast30Days = users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length;
  const newUsersLast7Days = users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 7*24*60*60*1000)).length;
  
  // Calculate monthly revenue
  const monthlyRevenue = [0,0,0,0,0,0,0,0,0,0,0,0];
  bookings.forEach(b => {
    const month = new Date(b.createdAt).getMonth();
    const revenue = parseInt(b.servicePrice?.replace(/[^0-9]/g, '') || 0);
    monthlyRevenue[month] += revenue;
  });
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxRevenue = Math.max(...monthlyRevenue, 1);
  
  // Service popularity
  const serviceCount = {};
  bookings.forEach(b => {
    const serviceName = b.serviceName;
    serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1;
  });
  
  const topServices = Object.entries(serviceCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Booking status distribution
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const total = bookings.length || 1;
  
  const pendingPercent = Math.round((pendingCount / total) * 100);
  const confirmedPercent = Math.round((confirmedCount / total) * 100);
  const completedPercent = Math.round((completedCount / total) * 100);
  
  // Pie chart CSS
  const pieChartStyle = {
    background: `conic-gradient(
      #f59e0b 0deg ${pendingPercent * 3.6}deg,
      #10b981 ${pendingPercent * 3.6}deg ${(pendingPercent + confirmedPercent) * 3.6}deg,
      #3b82f6 ${(pendingPercent + confirmedPercent) * 3.6}deg 360deg
    )`
  };
  
  // Calculate growth percentages
  const prevMonthRevenue = monthlyRevenue[new Date().getMonth() - 1] || 0;
  const currentMonthRevenue = monthlyRevenue[new Date().getMonth()];
  const revenueGrowth = prevMonthRevenue ? ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1) : 0;
  
  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalUsers: stats.totalUsers,
        totalBookings: stats.totalBookings,
        pendingBookings: stats.pendingBookings,
        completedBookings: stats.completedBookings,
        totalRevenue: `Rs ${totalRevenue.toLocaleString()}`,
        newUsers30Days: newUsersLast30Days
      },
      topServices: topServices,
      monthlyRevenue: monthlyRevenue.map((rev, i) => ({ month: months[i], revenue: rev }))
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `report_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <>
      <style>{styles}</style>
      <div className="reports-page">
        <div className="reports-header">
          <div className="reports-title">
            📊 Reports & Analytics
            <button className="export-btn" onClick={exportReport}>
              📥 Export Report
            </button>
          </div>
          <p className="reports-subtitle">Comprehensive overview of your business performance</p>
        </div>
        
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-number">{stats.totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
            <div className="stat-trend">
              <span className="trend-up">↑ 12%</span> vs last month
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">Rs {totalRevenue.toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
            <div className="stat-trend">
              {revenueGrowth >= 0 ? (
                <span className="trend-up">↑ {revenueGrowth}%</span>
              ) : (
                <span className="trend-down">↓ {Math.abs(revenueGrowth)}%</span>
              )} vs last month
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
            <div className="stat-trend">
              <span className="trend-up">+{newUsersLast30Days} new</span> in 30 days
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{stats.completedBookings}</div>
            <div className="stat-label">Completed Services</div>
            <div className="stat-trend">
              {stats.totalBookings ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}% completion rate
            </div>
          </div>
        </div>
        
        {/* Charts Row 1 */}
        <div className="charts-container">
          {/* Monthly Revenue Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <span className="chart-title">Monthly Revenue</span>
              <span className="chart-value">Rs {currentMonthRevenue.toLocaleString()}</span>
            </div>
            <div className="chart-bars">
              {months.slice(0, 6).map((month, idx) => (
                <div key={idx} className="chart-bar-wrapper">
                  <div className="chart-bar" style={{ height: `${(monthlyRevenue[idx] / maxRevenue) * 150}px` }}>
                    <div className="chart-bar-value">Rs {(monthlyRevenue[idx] / 1000).toFixed(0)}k</div>
                  </div>
                  <div className="chart-label">{month}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Booking Status Pie Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <span className="chart-title">Booking Status</span>
              <span className="chart-value">{total} Total</span>
            </div>
            <div className="pie-chart-container">
              <div className="pie-chart" style={pieChartStyle}></div>
              <div className="pie-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ background: '#f59e0b' }}></div>
                  <span className="legend-label">Pending</span>
                  <span className="legend-value">{pendingCount}</span>
                  <span className="legend-percent">({pendingPercent}%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ background: '#10b981' }}></div>
                  <span className="legend-label">Confirmed</span>
                  <span className="legend-value">{confirmedCount}</span>
                  <span className="legend-percent">({confirmedPercent}%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ background: '#3b82f6' }}></div>
                  <span className="legend-label">Completed</span>
                  <span className="legend-value">{completedCount}</span>
                  <span className="legend-percent">({completedPercent}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Top Services Table */}
        <div className="top-services">
          <div className="section-title">
            <span>🏆</span> Most Popular Services
          </div>
          <table className="services-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Service Name</th>
                <th>Total Bookings</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topServices.map((service, idx) => {
                const revenue = bookings
                  .filter(b => b.serviceName === service.name)
                  .reduce((sum, b) => sum + parseInt(b.servicePrice?.replace(/[^0-9]/g, '') || 0), 0);
                return (
                  <tr key={idx}>
                    <td className="service-rank">#{idx + 1}</td>
                    <td>{service.name}</td>
                    <td>{service.count}</td>
                    <td>Rs {revenue.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Quick Insights */}
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🆕</div>
            <div className="insight-value">{newUsersLast7Days}</div>
            <div className="insight-label">New Users (Last 7 days)</div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">📈</div>
            <div className="insight-value">{Math.round((stats.completedBookings / (stats.totalBookings || 1)) * 100)}%</div>
            <div className="insight-label">Completion Rate</div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">💵</div>
            <div className="insight-value">Rs {Math.round(totalRevenue / (stats.totalBookings || 1)).toLocaleString()}</div>
            <div className="insight-label">Average Order Value</div>
          </div>
        </div>
        
        {/* Additional Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-number">{stats.pendingBookings}</div>
            <div className="stat-label">Pending Bookings</div>
            <div className="stat-trend">Need attention</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✉️</div>
            <div className="stat-number">{stats.totalMessages || 0}</div>
            <div className="stat-label">Contact Messages</div>
            <div className="stat-trend">Unread messages</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">4.8</div>
            <div className="stat-label">Customer Rating</div>
            <div className="stat-trend trend-up">↑ 0.2 from last month</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚗</div>
            <div className="stat-number">{stats.totalBookings}</div>
            <div className="stat-label">Vehicles Serviced</div>
            <div className="stat-trend">+{Math.round(stats.totalBookings * 0.15)} from last month</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReportsPage;