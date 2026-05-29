import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .payment-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .payment-main {
    flex: 1;
  }
  
  .payment-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 60px 20px;
  }
  
  .payment-card {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
  
  .payment-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .payment-icon {
    font-size: 60px;
    margin-bottom: 15px;
  }
  
  .payment-title {
    font-size: 28px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 10px;
  }
  
  .payment-subtitle {
    color: #6b7280;
    font-size: 14px;
  }
  
  .service-details {
    background: #f9fafb;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 25px;
  }
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .detail-label {
    color: #6b7280;
    font-weight: 500;
  }
  
  .detail-value {
    color: #1f2937;
    font-weight: 600;
  }
  
  .total-row {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    margin-top: 10px;
    border-top: 2px solid #e5e7eb;
    font-size: 18px;
  }
  
  .total-label {
    font-weight: bold;
    color: #1f2937;
  }
  
  .total-value {
    font-weight: bold;
    color: #2563eb;
    font-size: 24px;
  }
  
  .payment-methods {
    margin-bottom: 25px;
  }
  
  .payment-methods-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #1f2937;
  }
  
  .payment-option {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .payment-option:hover {
    border-color: #667eea;
    background: #f9fafb;
  }
  
  .payment-option.selected {
    border-color: #10b981;
    background: #f0fdf4;
  }
  
  .payment-option-icon {
    font-size: 28px;
    margin-right: 15px;
  }
  
  .payment-option-info {
    flex: 1;
  }
  
  .payment-option-name {
    font-weight: bold;
    color: #1f2937;
  }
  
  .payment-option-desc {
    font-size: 12px;
    color: #6b7280;
  }
  
  .payment-option-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #d1d5db;
  }
  
  .payment-option.selected .payment-option-radio {
    background: #10b981;
    border-color: #10b981;
    position: relative;
  }
  
  .card-details {
    background: #f9fafb;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 25px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 500;
    color: #374151;
  }
  
  .input-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  
  .pay-now-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 16px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .pay-now-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  
  .back-btn {
    width: 100%;
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 12px;
    border-radius: 8px;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);
  
  const service = location.state?.service || {
    name: 'Service Payment',
    price: 'Rs 0',
    category: 'Service'
  };

  const paymentMethods = [
    { id: 'card', icon: '💳', name: 'Credit/Debit Card', desc: 'Pay with Visa, Mastercard, AMEX' },
    { id: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Pay with your PayPal account' },
    { id: 'bank', icon: '🏦', name: 'Bank Transfer', desc: 'Direct bank transfer' }
  ];

  const handlePayment = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Save payment record
      const paymentRecord = {
        id: Date.now(),
        serviceName: service.name,
        amount: service.price,
        method: selectedMethod,
        date: new Date().toLocaleString(),
        status: 'completed',
        transactionId: 'TXN' + Date.now()
      };
      
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      payments.push(paymentRecord);
      localStorage.setItem('payments', JSON.stringify(payments));
      
      // Mark service as paid in admin services
      const adminServices = JSON.parse(localStorage.getItem('adminServices') || '[]');
      const updatedServices = adminServices.map(s => 
        s.id === service.id ? { ...s, paid: true } : s
      );
      localStorage.setItem('adminServices', JSON.stringify(updatedServices));
      
      // Create notification for user
      const userEmail = localStorage.getItem('userEmail');
      const notifications = JSON.parse(localStorage.getItem('userNotifications') || '[]');
      notifications.push({
        id: Date.now(),
        userEmail: userEmail,
        message: `✅ Payment of ${service.price} for ${service.name} was successful!`,
        date: new Date().toLocaleString(),
        type: 'payment',
        read: false
      });
      localStorage.setItem('userNotifications', JSON.stringify(notifications));
      
      setProcessing(false);
      alert('Payment Successful! Thank you for your payment.');
      navigate('/my-bookings');
    }, 2000);
  };

  const getPriceNumber = (price) => {
    return parseInt(price.replace(/[^0-9]/g, '')) || 0;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="payment-page">
        <HomeTopBar />
        <main className="payment-main">
          <div className="payment-container">
            <div className="payment-card">
              <div className="payment-header">
                <div className="payment-icon">💰</div>
                <h1 className="payment-title">Complete Payment</h1>
                <p className="payment-subtitle">Secure payment gateway</p>
              </div>
              
              <div className="service-details">
                <div className="detail-row">
                  <span className="detail-label">Service</span>
                  <span className="detail-value">{service.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">{service.category}</span>
                </div>
                <div className="total-row">
                  <span className="total-label">Total Amount</span>
                  <span className="total-value">{service.price}</span>
                </div>
              </div>
              
              <div className="payment-methods">
                <div className="payment-methods-title">Select Payment Method</div>
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className={`payment-option ${selectedMethod === method.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="payment-option-icon">{method.icon}</div>
                    <div className="payment-option-info">
                      <div className="payment-option-name">{method.name}</div>
                      <div className="payment-option-desc">{method.desc}</div>
                    </div>
                    <div className="payment-option-radio"></div>
                  </div>
                ))}
              </div>
              
              {selectedMethod === 'card' && (
                <div className="card-details">
                  <div className="input-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                    />
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      />
                    </div>
                    <div className="input-group">
                      <label>CVV</label>
                      <input 
                        type="password" 
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                </div>
              )}
              
              <button className="pay-now-btn" onClick={handlePayment} disabled={processing}>
                {processing ? 'Processing...' : `Pay ${service.price}`}
              </button>
              <button className="back-btn" onClick={() => navigate('/my-bookings')}>
                Cancel
              </button>
            </div>
          </div>
        </main>
        <HomeFooter />
      </div>
    </>
  );
};

export default Payment;