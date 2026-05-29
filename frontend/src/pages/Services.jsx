import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .services-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .services-main {
    flex: 1;
  }
  
  .services-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .services-hero {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
    padding: 60px 0;
    text-align: center;
  }
  
  .services-hero-title {
    font-size: 42px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .services-hero-subtitle {
    font-size: 18px;
    opacity: 0.95;
  }
  
  .services-count {
    margin-top: 16px;
    font-size: 16px;
  }
  
  /* Cart Sidebar */
  .cart-sidebar {
    position: fixed;
    right: 0;
    top: 0;
    width: 380px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 10px rgba(0,0,0,0.1);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .cart-sidebar.open {
    transform: translateX(0);
  }
  
  .cart-header {
    padding: 20px;
    background: #1f2937;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .cart-title {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .close-cart {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }
  
  .cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 10px;
  }
  
  .cart-item-info {
    flex: 1;
  }
  
  .cart-item-title {
    font-weight: bold;
    color: #1f2937;
  }
  
  .cart-item-price {
    font-size: 12px;
    color: #2563eb;
  }
  
  .cart-item-remove {
    background: #fee2e2;
    color: #dc2626;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
  }
  
  .cart-footer {
    padding: 20px;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  
  .cart-total {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .cart-buttons {
    display: flex;
    gap: 10px;
  }
  
  .clear-cart-btn {
    flex: 1;
    background: #e5e7eb;
    color: #374151;
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .checkout-btn {
    flex: 2;
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .cart-icon {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #2563eb;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999;
    transition: transform 0.2s;
  }
  
  .cart-icon:hover {
    transform: scale(1.05);
  }
  
  .cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }
  
  .category-filter {
    padding: 30px 0;
    background: white;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
  
  .filter-btn {
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 8px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .filter-btn.active {
    background: #2563eb;
    color: white;
  }
  
  .services-grid-section {
    padding: 50px 0;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  @media (min-width: 768px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .service-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
    position: relative;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
  }
  
  .service-card.selected {
    border: 2px solid #10b981;
    box-shadow: 0 4px 12px rgba(16,185,129,0.2);
  }
  
  .service-image {
    background: linear-gradient(135deg, #3b82f6, #1e3a8a);
    padding: 30px;
    text-align: center;
  }
  
  .service-icon {
    font-size: 50px;
  }
  
  .service-content {
    padding: 20px;
  }
  
  .service-title {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 10px;
  }
  
  .service-description {
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: 12px;
    font-size: 14px;
  }
  
  .service-features {
    list-style: none;
    padding: 0;
    margin-bottom: 15px;
  }
  
  .service-features li {
    color: #4b5563;
    font-size: 13px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .service-features li::before {
    content: "✓";
    color: #10b981;
  }
  
  .service-price {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
    margin-bottom: 5px;
  }
  
  .service-price-sub {
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 15px;
  }
  
  .add-to-cart-btn {
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .add-to-cart-btn.added {
    background: #10b981;
  }
  
  .add-to-cart-btn:hover {
    background: #1d4ed8;
  }
  
  .view-cart-section {
    padding: 20px 0;
    background: white;
    position: sticky;
    top: 70px;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .view-cart-wrapper {
    display: flex;
    justify-content: center;
  }
  
  .view-cart-btn {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 40px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 12px rgba(37,99,235,0.3);
  }
  
  .view-cart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37,99,235,0.4);
  }
  
  .cart-badge {
    background: #ef4444;
    color: white;
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 12px;
    margin-left: 5px;
  }
  
  .why-choose-us {
    padding: 60px 0;
    background: #f3f4f6;
  }
  
  .section-title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: #1f2937;
    margin-bottom: 12px;
  }
  
  .section-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 40px;
    font-size: 16px;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  
  .feature-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
  
  .feature-title {
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 8px;
  }
  
  .feature-desc {
    color: #6b7280;
    font-size: 12px;
  }
  
  .cta-section {
    padding: 60px 0;
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    text-align: center;
    color: white;
  }
  
  .cta-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .cta-text {
    font-size: 16px;
    margin-bottom: 24px;
  }
  
  .cta-button {
    background: white;
    color: #2563eb;
    border: none;
    padding: 12px 32px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .cart-sidebar {
      width: 100%;
    }
    
    .view-cart-section {
      top: 60px;
    }
    
    .services-hero-title {
      font-size: 32px;
    }
  }
`;

const Services = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'repair', name: 'Repairs' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'inspection', name: 'Inspection' },
    { id: 'performance', name: 'Performance' }
  ];

  // 33+ Services Data (Same as Admin)
  const allServices = [
    // Maintenance Services (1-10)
    { id: 1, category: 'maintenance', icon: '🛢️', title: 'Oil Change', description: 'Complete engine oil and filter replacement', features: ['Premium quality oil', 'Oil filter replacement', 'Engine inspection', 'Fluid top-up'], price: 'Rs 4,500', duration: '30-45 min' },
    { id: 2, category: 'maintenance', icon: '🔧', title: 'General Service', description: 'Full vehicle inspection and maintenance', features: ['Engine tuning', 'Brake inspection', 'Tire pressure check', 'Fluid levels check'], price: 'Rs 9,500', duration: '2-3 hours' },
    { id: 3, category: 'maintenance', icon: '🔋', title: 'Battery Check & Replacement', description: 'Complete battery health check and replacement', features: ['Battery testing', 'Terminal cleaning', 'Charge system check', 'Replacement service'], price: 'Rs 3,500', duration: '20-30 min' },
    { id: 4, category: 'maintenance', icon: '⚙️', title: 'Wheel Alignment', description: 'Professional steering and wheel alignment', features: ['Computerized alignment', 'Camber adjustment', 'Toe adjustment', 'Test drive'], price: 'Rs 4,000', duration: '45-60 min' },
    { id: 5, category: 'maintenance', icon: '🌡️', title: 'Coolant Flush', description: 'Engine coolant system service', features: ['Coolant drain', 'System flush', 'New coolant fill', 'Leak inspection'], price: 'Rs 5,500', duration: '1 hour' },
    { id: 6, category: 'maintenance', icon: '⚡', title: 'Transmission Service', description: 'Automatic transmission fluid change', features: ['Fluid drain & fill', 'Filter replacement', 'Gasket check', 'Performance test'], price: 'Rs 12,000', duration: '2-3 hours' },
    { id: 7, category: 'maintenance', icon: '⛽', title: 'Fuel System Cleaning', description: 'Complete fuel system cleaning service', features: ['Fuel injector cleaning', 'Throttle body cleaning', 'Fuel filter replacement', 'Performance test'], price: 'Rs 6,500', duration: '1-2 hours' },
    { id: 8, category: 'maintenance', icon: '🌊', title: 'Radiator Flush', description: 'Complete radiator flush and coolant replacement', features: ['Coolant drain', 'System flush', 'New coolant fill', 'Pressure test'], price: 'Rs 4,500', duration: '1 hour' },
    { id: 9, category: 'maintenance', icon: '🔄', title: 'Power Steering Service', description: 'Power steering fluid change and inspection', features: ['Fluid drain', 'System flush', 'New fluid fill', 'Leak check'], price: 'Rs 3,500', duration: '45 min' },
    { id: 10, category: 'maintenance', icon: '⚙️', title: 'Differential Service', description: 'Differential fluid change and inspection', features: ['Fluid drain', 'Gasket inspection', 'New fluid fill', 'Performance test'], price: 'Rs 8,500', duration: '1-2 hours' },

    // Repair Services (11-20)
    { id: 11, category: 'repair', icon: '🛑', title: 'Brake Service', description: 'Complete brake inspection and repair', features: ['Brake pad replacement', 'Brake disc inspection', 'Brake fluid check', 'Performance test'], price: 'Rs 7,500', duration: '1-2 hours' },
    { id: 12, category: 'repair', icon: '🚗', title: 'Tyre Replacement', description: 'Professional tyre check and replacement', features: ['New tyre fitting', 'Wheel balancing', 'Tyre alignment check', 'Pressure setting'], price: 'Rs 8,500', duration: '45-60 min' },
    { id: 13, category: 'repair', icon: '❄️', title: 'A/C Service', description: 'Air conditioning inspection and gas refill', features: ['AC performance check', 'Gas refill', 'Filter cleaning', 'Leak detection'], price: 'Rs 6,500', duration: '1-2 hours' },
    { id: 14, category: 'repair', icon: '🔌', title: 'Electrical Repair', description: 'Complete wiring, lights, and fuse repairs', features: ['Wiring diagnosis', 'Light replacement', 'Fuse check', 'Electrical testing'], price: 'Rs 4,500', duration: '1-3 hours' },
    { id: 15, category: 'repair', icon: '🔊', title: 'AC & Heating Repair', description: 'Complete AC and heating system repair', features: ['Full diagnosis', 'Component repair', 'Gas refill', 'Performance test'], price: 'Rs 8,000', duration: '2-3 hours' },
    { id: 16, category: 'repair', icon: '🚙', title: 'Suspension Repair', description: 'Shock absorbers and struts replacement', features: ['Shock absorber check', 'Strut replacement', 'Bushing inspection', 'Test drive'], price: 'Rs 15,000', duration: '3-4 hours' },
    { id: 17, category: 'repair', icon: '🔧', title: 'Engine Tuning', description: 'Engine performance optimization', features: ['Spark plug replacement', 'Fuel system cleaning', 'Air filter change', 'ECU reset'], price: 'Rs 6,000', duration: '2 hours' },
    { id: 18, category: 'repair', icon: '🚗', title: 'Clutch Repair', description: 'Clutch plate and bearing replacement', features: ['Clutch inspection', 'Pressure plate check', 'Release bearing replacement', 'Test drive'], price: 'Rs 18,000', duration: '4-5 hours' },
    { id: 19, category: 'repair', icon: '⏱️', title: 'Timing Belt Replacement', description: 'Timing belt inspection and replacement', features: ['Belt inspection', 'Tensioner check', 'Water pump check', 'Full replacement'], price: 'Rs 12,000', duration: '3-4 hours' },
    { id: 20, category: 'repair', icon: '🔋', title: 'Hybrid Battery Service', description: 'Hybrid battery inspection and service', features: ['Battery health check', 'Cell balancing', 'Cooling fan cleaning', 'Performance test'], price: 'Rs 22,000', duration: '2-3 hours' },

    // Cleaning Services (21-26)
    { id: 21, category: 'cleaning', icon: '🧼', title: 'Car Wash', description: 'Complete interior and exterior cleaning', features: ['Exterior wash', 'Interior vacuum', 'Window cleaning', 'Dashboard polish'], price: 'Rs 2,500', duration: '30-45 min' },
    { id: 22, category: 'cleaning', icon: '✨', title: 'Premium Detailing', description: 'Complete car detailing service', features: ['Paint correction', 'Interior deep clean', 'Engine bay cleaning', 'Ceramic coating'], price: 'Rs 15,000', duration: '4-6 hours' },
    { id: 23, category: 'cleaning', icon: '🧽', title: 'Engine Degreasing', description: 'Complete engine bay cleaning', features: ['Engine degreasing', 'Component cleaning', 'Wire protection', 'Finish polish'], price: 'Rs 3,000', duration: '1-2 hours' },
    { id: 24, category: 'cleaning', icon: '💡', title: 'Headlight Restoration', description: 'Professional headlight restoration', features: ['Sanding', 'Polishing', 'UV protection coating', 'Brightness test'], price: 'Rs 2,000', duration: '45-60 min' },
    { id: 25, category: 'cleaning', icon: '🦠', title: 'AC Disinfection', description: 'Complete AC system disinfection', features: ['Filter cleaning', 'Duct disinfection', 'Odor removal', 'Bacteria elimination'], price: 'Rs 3,500', duration: '1 hour' },
    { id: 26, category: 'cleaning', icon: '💎', title: 'Ceramic Coating', description: 'Premium ceramic coating protection', features: ['Paint correction', 'Ceramic application', 'Hydrophobic coating', 'UV protection'], price: 'Rs 35,000', duration: '2-3 days' },

    // Inspection Services (27-29)
    { id: 27, category: 'inspection', icon: '🔍', title: 'Pre-Purchase Inspection', description: 'Complete vehicle inspection before buying', features: ['Engine check', 'Transmission test', 'Body inspection', 'Test drive report'], price: 'Rs 5,000', duration: '2 hours' },
    { id: 28, category: 'inspection', icon: '📋', title: 'Diagnostic Scan', description: 'Computerized diagnostic check', features: ['ECU scan', 'Error code reading', 'Sensor check', 'Detailed report'], price: 'Rs 2,500', duration: '30-45 min' },
    { id: 29, category: 'inspection', icon: '🔬', title: 'Comprehensive Vehicle Check', description: '72-point vehicle inspection', features: ['Full system check', 'Safety inspection', 'Component testing', 'Maintenance report'], price: 'Rs 7,500', duration: '3 hours' },

    // Performance Services (30-33)
    { id: 30, category: 'performance', icon: '🏎️', title: 'Performance Tuning', description: 'ECU remapping for better performance', features: ['ECU remapping', 'Power optimization', 'Torque increase', 'Fuel efficiency tune'], price: 'Rs 25,000', duration: '4-5 hours' },
    { id: 31, category: 'performance', icon: '💨', title: 'Exhaust System Upgrade', description: 'Performance exhaust installation', features: ['Muffler replacement', 'Pipe upgrade', 'Sound tuning', 'Performance gain'], price: 'Rs 20,000', duration: '3-4 hours' },
    { id: 32, category: 'performance', icon: '🔄', title: 'Turbo Installation', description: 'Turbocharger installation and tuning', features: ['Turbo fitting', 'Intercooler setup', 'Boost control', 'Dyno tuning'], price: 'Rs 50,000', duration: '8-10 hours' },
    { id: 33, category: 'performance', icon: '💻', title: 'Chip Tuning', description: 'ECU chip tuning for power boost', features: ['Custom mapping', 'Dyno testing', 'Power curve optimization', 'Fuel efficiency tuning'], price: 'Rs 30,000', duration: '3-4 hours' }
  ];

  useEffect(() => {
    const loadServices = () => {
      setServices(allServices);
      setLoading(false);
    };
    loadServices();
  }, []);

  const featuresList = [
    { icon: "🔧", title: "Expert Mechanics", desc: "Certified professionals" },
    { icon: "⭐", title: "Quality Parts", desc: "Genuine premium parts" },
    { icon: "⚡", title: "Fast Service", desc: "Quick turnaround" },
    { icon: "💎", title: "Best Price", desc: "Competitive pricing" },
    { icon: "🔒", title: "Warranty", desc: "Service warranty" },
    { icon: "📞", title: "24/7 Support", desc: "Round the clock" }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const addToCart = (service) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      alert('Please login to book services');
      navigate('/login');
      return;
    }
    
    const existingItem = cart.find(item => item.id === service.id);
    if (existingItem) {
      alert(`${service.title} is already in your cart`);
      return;
    }
    
    setCart([...cart, service]);
    alert(`${service.title} added to cart`);
  };

  const removeFromCart = (serviceId) => {
    setCart(cart.filter(item => item.id !== serviceId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + price;
    }, 0);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Please add services to your cart first');
      return;
    }
    navigate('/multi-booking', { state: { services: cart } });
  };

  if (loading) {
    return (
      <div className="services-page">
        <HomeTopBar />
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <p>Loading services...</p>
        </div>
        <HomeFooter />
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="services-page">
        <HomeTopBar />
        
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          🛒
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
        
        <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <div className="cart-title">🛒 Your Cart ({cart.length} items)</div>
            <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>
          
          <div className="cart-items">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Your cart is empty</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-price">{item.price}</div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total Amount:</span>
                <span style={{ color: '#2563eb', fontSize: '24px' }}>Rs {getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="cart-buttons">
                <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>
                <button className="checkout-btn" onClick={proceedToCheckout}>Proceed to Book</button>
              </div>
            </div>
          )}
        </div>
        
        <main className="services-main">
          <section className="services-hero">
            <div className="services-container">
              <h1 className="services-hero-title">Our Services</h1>
              <p className="services-hero-subtitle">Select multiple services and book them together</p>
              <div className="services-count">🚗 {services.length}+ Professional Services Available</div>
            </div>
          </section>

          <section className="category-filter">
            <div className="services-container">
              <div className="filter-buttons">
                {categories.map(category => (
                  <button 
                    key={category.id} 
                    className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`} 
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="view-cart-section">
            <div className="services-container">
              <div className="view-cart-wrapper">
                <button className="view-cart-btn" onClick={() => setIsCartOpen(true)}>
                  🛒 View Cart
                  {cart.length > 0 && <span className="cart-badge">{cart.length} items • Rs {getTotalPrice().toLocaleString()}</span>}
                </button>
              </div>
            </div>
          </section>

          <section className="services-grid-section">
            <div className="services-container">
              <div className="services-grid">
                {filteredServices.map(service => {
                  const isInCart = cart.some(item => item.id === service.id);
                  return (
                    <div key={service.id} className={`service-card ${isInCart ? 'selected' : ''}`}>
                      <div className="service-image">
                        <div className="service-icon">{service.icon}</div>
                      </div>
                      <div className="service-content">
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                        <ul className="service-features">
                          {service.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                        <div className="service-price">{service.price}</div>
                        <div className="service-price-sub">Duration: {service.duration}</div>
                        <button 
                          className={`add-to-cart-btn ${isInCart ? 'added' : ''}`}
                          onClick={() => addToCart(service)}
                          disabled={isInCart}
                        >
                          {isInCart ? '✓ Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="why-choose-us">
            <div className="services-container">
              <h2 className="section-title">Why Choose Us?</h2>
              <p className="section-subtitle">We provide the best service experience</p>
              <div className="features-grid">
                {featuresList.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="services-container">
              <h2 className="cta-title">Ready to Book Multiple Services?</h2>
              <p className="cta-text">Add multiple services to cart and book them all at once</p>
              <button className="cta-button" onClick={() => setIsCartOpen(true)}>
                View Cart ({cart.length} items)
              </button>
            </div>
          </section>
        </main>
        
        <HomeFooter />
      </div>
    </>
  );
};

export default Services;