import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Admin login (hardcoded for now)
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', 'Admin');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', 'admin');
      setLoading(false);
      navigate('/admin-dashboard');
      return;
    }

    try {
      // Call your backend API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userRole', data.user.role || 'user');
        localStorage.setItem('token', data.token);
        setLoading(false);
        navigate('/home');
      } else {
        setError(data.message || 'Invalid email or password');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '28px' }}>Welcome Back</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px' }}>Login to your account</p>
            
            {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
            
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} required />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} required />
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <a href="/signup" style={{ color: '#2563eb' }}>Sign Up</a></p>
            
            <div style={{ marginTop: '20px', padding: '12px', background: '#f3f4f6', borderRadius: '8px', fontSize: '12px', textAlign: 'center' }}>
              <strong>Demo User:</strong> Register first via Sign Up page<br/>
              <strong>Admin:</strong> admin@gmail.com / admin
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;