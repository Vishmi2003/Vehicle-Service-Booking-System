import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboardPage from './admin/AdminDashboardPage';
import AdminBookingsPage from './admin/AdminBookingsPage';
import AdminUsersPage from './admin/AdminUsersPage';
import AdminServicesPage from './admin/AdminServicesPage';
import AdminMessagesPage from './admin/AdminMessagesPage';
import AdminReportsPage from './admin/AdminReportsPage';
import AdminSettingsPage from './admin/AdminSettingsPage';

const styles = `
  .admin-main {
    flex: 1;
    margin-left: 280px;
    background: #f0f2f5;
  }
  
  .admin-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    color: white;
  }
  
  .header-title {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header-title span {
    background: rgba(255,255,255,0.2);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 14px;
  }
  
  .admin-info {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .admin-name {
    color: white;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .admin-avatar {
    width: 35px;
    height: 35px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .logout-btn {
    background: rgba(255,255,255,0.2);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .logout-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }
  
  .admin-content {
    padding: 30px;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    margin-bottom: 30px;
  }
  
  .stat-card {
    background: white;
    padding: 25px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }
  
  .stat-info h3 {
    font-size: 32px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 5px;
  }
  
  .stat-info p {
    color: #6b7280;
    font-size: 14px;
  }
  
  .stat-icon {
    font-size: 48px;
    opacity: 0.8;
  }
  
  .calendar-section {
    margin-bottom: 30px;
  }
  
  .calendar-card {
    background: white;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    transition: all 0.3s;
  }
  
  .calendar-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .calendar-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .calendar-nav {
    display: flex;
    gap: 10px;
  }
  
  .calendar-nav-btn {
    background: #f3f4f6;
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s;
  }
  
  .calendar-nav-btn:hover {
    background: #667eea;
    color: white;
  }
  
  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 10px;
  }
  
  .weekday {
    padding: 10px;
    font-weight: 600;
    color: #6b7280;
    font-size: 14px;
  }
  
  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    position: relative;
    background: #f9fafb;
    font-weight: 500;
  }
  
  .calendar-day:hover {
    background: #667eea;
    color: white;
    transform: scale(1.02);
  }
  
  .calendar-day.today {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(102,126,234,0.3);
  }
  
  .calendar-day.selected {
    background: #10b981;
    color: white;
  }
  
  .booking-badge {
    font-size: 10px;
    margin-top: 3px;
    background: #ef4444;
    color: white;
    padding: 2px 6px;
    border-radius: 20px;
    font-weight: bold;
  }
  
  .calendar-day.today .booking-badge {
    background: #fbbf24;
    color: #1f2937;
  }
  
  .calendar-day:hover .booking-badge {
    background: white;
    color: #667eea;
  }
  
  .selected-date-bookings {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #e5e7eb;
  }
  
  .selected-date-title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .booking-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 250px;
    overflow-y: auto;
  }
  
  .booking-item-small {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f9fafb;
    border-radius: 10px;
    transition: all 0.3s;
  }
  
  .booking-item-small:hover {
    background: #eef2ff;
    transform: translateX(5px);
  }
  
  .booking-time-small {
    font-size: 12px;
    font-weight: bold;
    color: #667eea;
    min-width: 60px;
  }
  
  .booking-name-small {
    font-size: 13px;
    color: #1f2937;
    flex: 1;
  }
  
  .booking-status-small {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 12px;
  }
  
  .no-bookings {
    text-align: center;
    padding: 20px;
    color: #6b7280;
    font-size: 13px;
  }
  
  .calendar-summary {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
  }
  
  .summary-item {
    text-align: center;
    flex: 1;
  }
  
  .summary-label {
    font-size: 11px;
    color: #6b7280;
  }
  
  .summary-value {
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
  }
  
  .charts-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    margin-bottom: 30px;
  }
  
  .chart-card {
    background: white;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    transition: all 0.3s;
  }
  
  .chart-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .chart-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
  }
  
  .chart-subtitle {
    font-size: 12px;
    color: #6b7280;
  }
  
  .chart-value {
    font-size: 20px;
    font-weight: bold;
    color: #10b981;
  }
  
  .canvas-chart-container {
    width: 100%;
    height: 280px;
    position: relative;
    margin-top: 10px;
  }
  
  canvas {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 12px;
  }
  
  .chart-tooltip {
    position: fixed;
    background: #1f2937;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    pointer-events: none;
    z-index: 1000;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .pie-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .pie-chart {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 20px auto;
    transition: transform 0.3s;
  }
  
  .pie-chart:hover {
    transform: scale(1.05);
  }
  
  .pie-legend {
    margin-top: 20px;
    width: 100%;
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
  
  .recent-section {
    background: white;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
  }
  
  .view-all {
    color: #667eea;
    cursor: pointer;
    font-size: 14px;
  }
  
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px;
    border-radius: 12px;
    transition: all 0.3s;
  }
  
  .activity-item:hover {
    background: #f9fafb;
    transform: translateX(5px);
  }
  
  .activity-icon {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: white;
  }
  
  .activity-details {
    flex: 1;
  }
  
  .activity-text {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 5px;
  }
  
  .activity-time {
    font-size: 12px;
    color: #6b7280;
  }
  
  .activity-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
  }
  
  .status-completed {
    background: #d1fae5;
    color: #059669;
  }
  
  .status-pending {
    background: #fef3c7;
    color: #d97706;
  }
  
  .status-confirmed {
    background: #dbeafe;
    color: #2563eb;
  }
  
  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .charts-container {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weeklyChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: '' });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalMessages: 0,
    totalRevenue: 0
  });
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    const userRole = localStorage.getItem('userRole');
    
    if (isAdmin !== 'true' && userRole !== 'admin') {
      navigate('/login');
      return;
    }
    
    loadData();
  }, [navigate]);

  useEffect(() => {
    if (bookings.length > 0) {
      drawWeeklyChart();
      drawRevenueChart();
    }
  }, [bookings]);

  const loadData = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
    
    const savedBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    setBookings(savedBookings);
    
    const savedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    setMessages(savedMessages);
    
    const totalRevenue = savedBookings.reduce((sum, b) => sum + parseInt(b.servicePrice?.replace(/[^0-9]/g, '') || 0), 0);
    
    setStats({
      totalUsers: savedUsers.length,
      totalBookings: savedBookings.length,
      pendingBookings: savedBookings.filter(b => b.status === 'pending').length,
      completedBookings: savedBookings.filter(b => b.status === 'completed').length,
      totalMessages: savedMessages.length,
      totalRevenue: totalRevenue
    });
  };

  const drawWeeklyChart = () => {
    const canvas = weeklyChartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    canvas.width = width;
    canvas.height = height;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = days.map(day => ({
      day,
      count: bookings.filter(b => {
        const date = new Date(b.createdAt);
        return date.getDay() === days.indexOf(day) + 1;
      }).length
    }));
    
    const maxCount = Math.max(...data.map(d => d.count), 1);
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const stepX = chartWidth / (data.length - 1);
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * chartHeight / 4);
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0.02)');
    
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = padding + i * stepX;
      const y = padding + chartHeight - (d.count / maxCount) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding + (data.length - 1) * stepX, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    data.forEach((d, i) => {
      const x = padding + i * stepX;
      const y = padding + chartHeight - (d.count / maxCount) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    data.forEach((d, i) => {
      const x = padding + i * stepX;
      const y = padding + chartHeight - (d.count / maxCount) * chartHeight;
      
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#667eea';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#667eea';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = '#667eea';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.count.toString(), x, y - 12);
    });
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      const x = padding + i * stepX;
      ctx.fillText(d.day, x, height - padding + 20);
    });
    
    for (let i = 0; i <= 4; i++) {
      const value = Math.round((maxCount / 4) * i);
      const y = padding + chartHeight - (i * chartHeight / 4);
      ctx.fillText(value.toString(), padding - 10, y + 3);
    }
    
    canvas.points = data.map((d, i) => ({
      x: padding + i * stepX,
      y: padding + chartHeight - (d.count / maxCount) * chartHeight,
      value: d.count,
      day: d.day
    }));
  };

  const drawRevenueChart = () => {
    const canvas = revenueChartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    canvas.width = width;
    canvas.height = height;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map(month => ({
      month,
      revenue: bookings.filter(b => {
        const date = new Date(b.createdAt);
        return months[date.getMonth()] === month;
      }).reduce((sum, b) => sum + parseInt(b.servicePrice?.replace(/[^0-9]/g, '') || 0), 0)
    }));
    
    const maxRevenue = Math.max(...data.map(d => d.revenue), 1);
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length * 0.6;
    const barSpacing = chartWidth / data.length;
    
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * chartHeight / 4);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    data.forEach((d, i) => {
      const barHeight = (d.revenue / maxRevenue) * chartHeight;
      const x = padding + i * barSpacing + (barSpacing - barWidth) / 2;
      const y = padding + chartHeight - barHeight;
      
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(1, '#059669');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
      
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Rs ${(d.revenue / 1000).toFixed(1)}k`, x + barWidth / 2, y - 5);
      
      ctx.beginPath();
      ctx.arc(x + barWidth / 2, y - 2, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + barWidth / 2, y - 2, 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    });
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      const x = padding + i * barSpacing + barSpacing / 2;
      ctx.fillText(d.month, x, height - padding + 20);
    });
    
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const value = Math.round((maxRevenue / 4) * i / 1000);
      const y = padding + chartHeight - (i * chartHeight / 4);
      ctx.fillText(`Rs ${value}k`, padding - 10, y + 3);
    }
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date && date.toDateString() === selectedDate.toDateString();
  };

  const getBookingsForDate = (date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.toDateString() === date.toDateString();
    });
  };

  const getBookingCountForDate = (date) => {
    return getBookingsForDate(date).length;
  };

  const getTotalBookingsInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.getFullYear() === year && bookingDate.getMonth() === month;
    }).length;
  };

  const getAverageBookingsPerDay = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const total = getTotalBookingsInMonth();
    return (total / daysInMonth).toFixed(1);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleCanvasMouseMove = (e, canvas) => {
    if (!canvas || !canvas.points) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    let closestPoint = null;
    let minDist = 20;
    
    canvas.points.forEach(point => {
      const dist = Math.sqrt((mouseX - point.x) ** 2 + (mouseY - point.y) ** 2);
      if (dist < minDist) {
        minDist = dist;
        closestPoint = point;
      }
    });
    
    if (closestPoint) {
      setTooltip({
        show: true,
        x: e.clientX + 10,
        y: e.clientY - 20,
        text: `${closestPoint.day}: ${closestPoint.value} bookings`
      });
    } else {
      setTooltip({ show: false, x: 0, y: 0, text: '' });
    }
  };

  const handleCanvasMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, text: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
    loadData();
    alert(`Booking status updated to ${newStatus}`);
  };

  const deleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
      loadData();
      alert('Booking deleted successfully');
    }
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      loadData();
      alert('User deleted successfully');
    }
  };

  const deleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId);
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      loadData();
      alert('Message deleted successfully');
    }
  };

  const getStatusDistribution = () => {
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const total = bookings.length || 1;
    
    return {
      pending: { count: pending, percent: Math.round((pending / total) * 100) },
      confirmed: { count: confirmed, percent: Math.round((confirmed / total) * 100) },
      completed: { count: completed, percent: Math.round((completed / total) * 100) }
    };
  };

  const statusData = getStatusDistribution();
  const pieChartStyle = {
    background: `conic-gradient(
      #f59e0b 0deg ${statusData.pending.percent * 3.6}deg,
      #10b981 ${statusData.pending.percent * 3.6}deg ${(statusData.pending.percent + statusData.confirmed.percent) * 3.6}deg,
      #3b82f6 ${(statusData.pending.percent + statusData.confirmed.percent) * 3.6}deg 360deg
    )`
  };

  const pageTitles = {
    dashboard: 'Dashboard',
    bookings: 'Bookings Management',
    messages: 'Contact Messages',
    services: 'Services Management',
    users: 'Users Management',
    reports: 'Reports & Analytics',
    settings: 'System Settings'
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);
  const totalBookingsThisMonth = getTotalBookingsInMonth();
  const avgBookingsPerDay = getAverageBookingsPerDay();
  const busyDays = bookings.filter(b => {
    const date = new Date(b.date);
    return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
  }).length;

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <h3>{stats.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
                <div className="stat-icon">👥</div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>{stats.totalBookings}</h3>
                  <p>Total Bookings</p>
                </div>
                <div className="stat-icon">📅</div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>{stats.pendingBookings}</h3>
                  <p>Pending Bookings</p>
                </div>
                <div className="stat-icon">⏳</div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Rs {stats.totalRevenue.toLocaleString()}</h3>
                  <p>Total Revenue</p>
                </div>
                <div className="stat-icon">💰</div>
              </div>
            </div>
            
            <div className="calendar-section">
              <div className="calendar-card">
                <div className="calendar-header">
                  <div className="calendar-title">📅 Booking Calendar</div>
                  <div className="calendar-nav">
                    <button className="calendar-nav-btn" onClick={() => changeMonth(-1)}>◀</button>
                    <span className="calendar-month">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                    <button className="calendar-nav-btn" onClick={() => changeMonth(1)}>▶</button>
                  </div>
                </div>
                <div className="calendar-weekdays">
                  {weekdays.map(day => <div key={day} className="weekday">{day}</div>)}
                </div>
                <div className="calendar-days">
                  {getMonthDays().map((date, index) => {
                    const bookingCount = date ? getBookingCountForDate(date) : 0;
                    return (
                      <div key={index} className={`calendar-day ${date && isToday(date) ? 'today' : ''} ${date && isSelected(date) ? 'selected' : ''}`} onClick={() => date && setSelectedDate(date)}>
                        {date ? date.getDate() : ''}
                        {bookingCount > 0 && <span className="booking-badge">{bookingCount}</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="selected-date-bookings">
                  <div className="selected-date-title">📋 Bookings for {selectedDate.toLocaleDateString()}</div>
                  {selectedDateBookings.length > 0 ? (
                    <div className="booking-list">
                      {selectedDateBookings.map(booking => (
                        <div key={booking.id} className="booking-item-small">
                          <div className="booking-time-small">{booking.time}</div>
                          <div className="booking-name-small">{booking.customerName} - {booking.serviceName}</div>
                          <div className={`booking-status-small status-${booking.status}`}>{booking.status}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-bookings">No bookings on this date</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="charts-container">
              <div className="chart-card">
                <div className="chart-header">
                  <div><h3 className="chart-title">Weekly Bookings</h3><p className="chart-subtitle">Last 7 days activity</p></div>
                  <div className="chart-value">📈 Trend</div>
                </div>
                <div className="canvas-chart-container">
                  <canvas ref={weeklyChartRef} style={{ width: '100%', height: '100%', cursor: 'crosshair' }} onMouseMove={(e) => handleCanvasMouseMove(e, weeklyChartRef.current)} onMouseLeave={handleCanvasMouseLeave}></canvas>
                </div>
              </div>
              <div className="chart-card">
                <div className="chart-header">
                  <div><h3 className="chart-title">Booking Status</h3><p className="chart-subtitle">Distribution</p></div>
                  <div className="chart-value">🥧 Stats</div>
                </div>
                <div className="pie-chart-container">
                  <div className="pie-chart" style={pieChartStyle}></div>
                  <div className="pie-legend">
                    <div className="legend-item"><div className="legend-color" style={{ background: '#f59e0b' }}></div><span className="legend-label">Pending</span><span className="legend-value">{statusData.pending.count}</span><span className="legend-percent">({statusData.pending.percent}%)</span></div>
                    <div className="legend-item"><div className="legend-color" style={{ background: '#10b981' }}></div><span className="legend-label">Confirmed</span><span className="legend-value">{statusData.confirmed.count}</span><span className="legend-percent">({statusData.confirmed.percent}%)</span></div>
                    <div className="legend-item"><div className="legend-color" style={{ background: '#3b82f6' }}></div><span className="legend-label">Completed</span><span className="legend-value">{statusData.completed.count}</span><span className="legend-percent">({statusData.completed.percent}%)</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="recent-section">
              <div className="section-header"><h3 className="section-title">Recent Activity</h3><span className="view-all" onClick={() => setActivePage('bookings')}>View All →</span></div>
              <div className="activity-list">
                {bookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="activity-item">
                    <div className="activity-icon">{booking.status === 'completed' ? '✅' : booking.status === 'confirmed' ? '📌' : '⏳'}</div>
                    <div className="activity-details"><div className="activity-text">{booking.customerName} - {booking.serviceName}</div><div className="activity-time">{booking.date} at {booking.time}</div></div>
                    <div className={`activity-status status-${booking.status}`}>{booking.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'bookings':
        return <AdminBookingsPage bookings={bookings} onUpdateStatus={updateBookingStatus} onDelete={deleteBooking} />;
      case 'users':
        return <AdminUsersPage users={users} onDelete={deleteUser} />;
      case 'services':
        return <AdminServicesPage />;
      case 'messages':
        return <AdminMessagesPage messages={messages} onDelete={deleteMessage} />;
      case 'reports':
        return <AdminReportsPage bookings={bookings} users={users} stats={stats} />;
      case 'settings':
        return <AdminSettingsPage />;
      default:
        return <AdminDashboardPage bookings={bookings} stats={stats} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      {tooltip.show && <div className="chart-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>📊 {tooltip.text}</div>}
      <div style={{ display: 'flex' }}>
        <AdminSidebar activePage={activePage} onPageChange={setActivePage} />
        <div className="admin-main">
          <div className="admin-header">
            <div className="header-title">📊 {pageTitles[activePage]} <span>{new Date().toLocaleDateString()}</span></div>
            <div className="admin-info"><div className="admin-name"><div className="admin-avatar">A</div>Admin</div><button className="logout-btn" onClick={handleLogout}>Logout</button></div>
          </div>
          <div className="admin-content">{renderPage()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;