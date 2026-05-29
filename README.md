# 🚗 Vehicle Service Booking System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for booking vehicle services online. Customers can browse services, book appointments, make payments, and track their service history. Admins can manage services, view bookings, update statuses, and generate reports.

## 📸 Screenshots

| Dashboard | Services | Admin Panel |
|-----------|----------|-------------|
| ![Dashboard](https://via.placeholder.com/400x200?text=Dashboard) | ![Services](https://via.placeholder.com/400x200?text=Services) | ![Admin](https://via.placeholder.com/400x200?text=Admin) |

## ✨ Features

### 👤 User Features
- 🔐 User registration and login with JWT authentication
- 📅 Browse and filter services by category
- 🛒 Add multiple services to cart
- 📝 Book appointments with date/time selection
- 💳 Online payment integration
- 📋 View booking history and status
- 🔔 Real-time notifications
- 👤 Profile management

### 👑 Admin Features
- 📊 Interactive dashboard with charts and analytics
- 📈 Real-time statistics (users, bookings, revenue)
- 🔧 CRUD operations for services
- 📅 Calendar view with booking counts
- ✅ Update booking status (pending → confirmed → completed)
- 💰 Mark payments as completed
- 👥 User management (view, delete)
- 📨 Send messages to customers
- 📑 Generate reports and export data
- 📱 Responsive design for all devices

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **CSS3** - Styling with custom components
- **React Router** - Navigation
- **Axios** - API calls
- **Chart.js** - Analytics charts

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing

## 📁 Project Structure
Vehicle-Service-Booking-System/
├── backend/
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── Booking.js
│ │ ├── Service.js
│ │ └── User.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── booking.js
│ │ └── services.js
│ ├── .env
│ ├── package.json
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── AdminSidebar.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── HomeFooter.jsx
│ │ │ ├── HomeTopBar.jsx
│ │ │ └── TopBar.jsx
│ │ ├── pages/
│ │ │ ├── admin/
│ │ │ │ ├── AdminBookingsPage.jsx
│ │ │ │ ├── AdminDashboardPage.jsx
│ │ │ │ ├── AdminMessagesPage.jsx
│ │ │ │ ├── AdminReportsPage.jsx
│ │ │ │ ├── AdminServicesPage.jsx
│ │ │ │ ├── AdminSettingsPage.jsx
│ │ │ │ └── AdminUsersPage.jsx
│ │ │ ├── AboutUs.jsx
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── Booking.jsx
│ │ │ ├── ContactUs.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Home.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── MultiBooking.jsx
│ │ │ ├── MyBookings.jsx
│ │ │ ├── Payment.jsx
│ │ │ ├── Services.jsx
│ │ │ └── SignUp.jsx
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── README.md
└── .gitignore
