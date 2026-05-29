import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const styles = `
  .dashboard {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .dashboard-main {
    flex: 1;
  }
  
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #3b82f6, #1e3a8a);
    color: white;
    padding: 80px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .hero::before {
    content: "🚗";
    position: absolute;
    font-size: 200px;
    opacity: 0.1;
    bottom: -50px;
    right: -50px;
  }
  
  .hero::after {
    content: "🔧";
    position: absolute;
    font-size: 180px;
    opacity: 0.1;
    top: -50px;
    left: -50px;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 16px;
    animation: fadeInUp 0.8s ease;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 32px;
    opacity: 0.95;
    animation: fadeInUp 1s ease;
  }
  
  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;
    animation: fadeInUp 1.2s ease;
  }
  
  .hero-stat {
    text-align: center;
  }
  
  .hero-stat-number {
    font-size: 28px;
    font-weight: bold;
  }
  
  .hero-stat-label {
    font-size: 12px;
    opacity: 0.8;
  }
  
  .book-btn {
    background: white;
    color: #2563eb;
    border: none;
    padding: 14px 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  .book-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (min-width: 768px) {
    .hero-title {
      font-size: 3.5rem;
    }
  }
  
  /* Stats Counter Section */
  .stats-section {
    padding: 60px 0;
    background: white;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .stat-item {
    text-align: center;
    padding: 20px;
  }
  
  .stat-number {
    font-size: 36px;
    font-weight: bold;
    color: #2563eb;
    margin-bottom: 8px;
  }
  
  .stat-label {
    color: #6b7280;
    font-size: 14px;
  }
  
  /* About Us Section */
  .about-section {
    padding: 80px 0;
    background: #f3f4f6;
  }
  
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 50px;
    align-items: center;
  }
  
  @media (min-width: 768px) {
    .about-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .about-content h2 {
    font-size: 32px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .about-content p {
    color: #6b7280;
    line-height: 1.8;
    margin-bottom: 20px;
  }
  
  .about-features {
    list-style: none;
    padding: 0;
  }
  
  .about-features li {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #4b5563;
  }
  
  .about-features li::before {
    content: "✓";
    color: #10b981;
    font-weight: bold;
  }
  
  .about-image {
    background: linear-gradient(135deg, #3b82f6, #1e3a8a);
    border-radius: 20px;
    padding: 50px;
    text-align: center;
    color: white;
  }
  
  .about-icon {
    font-size: 64px;
    margin-bottom: 20px;
  }
  
  /* Features Section */
  .features {
    padding: 80px 0;
    background: white;
  }
  
  .section-title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
    color: #1f2937;
  }
  
  .section-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 60px;
    font-size: 18px;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .feature-card {
    background: #f9fafb;
    padding: 32px;
    border-radius: 16px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    background: white;
  }
  
  .feature-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .feature-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #1f2937;
  }
  
  .feature-desc {
    color: #6b7280;
    line-height: 1.6;
  }
  
  /* Services Preview */
  .services-preview {
    padding: 80px 0;
    background: #f3f4f6;
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
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .service-preview-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .service-preview-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .service-preview-icon {
    font-size: 40px;
    margin-bottom: 12px;
  }
  
  .service-preview-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }
  
  /* Testimonials Section */
  .testimonials {
    background: white;
    padding: 80px 0;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .testimonial-card {
    background: #f9fafb;
    padding: 30px;
    border-radius: 16px;
    transition: all 0.3s;
  }
  
  .testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .rating {
    color: #fbbf24;
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .testimonial-text {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 20px;
    font-style: italic;
  }
  
  .testimonial-author {
    font-weight: 600;
    color: #1f2937;
  }
  
  .testimonial-role {
    font-size: 12px;
    color: #6b7280;
    margin-top: 5px;
  }
  
  /* CTA Section */
  .cta-section {
    padding: 80px 0;
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    text-align: center;
    color: white;
  }
  
  .cta-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .cta-text {
    font-size: 18px;
    margin-bottom: 30px;
    opacity: 0.95;
  }
  
  .cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .cta-btn-primary {
    background: white;
    color: #2563eb;
    border: none;
    padding: 12px 32px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .cta-btn-primary:hover {
    transform: scale(1.05);
  }
  
  .cta-btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
    padding: 12px 32px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .cta-btn-secondary:hover {
    background: white;
    color: #2563eb;
  }
  
  /* Newsletter Section */
  .newsletter-section {
    padding: 60px 0;
    background: #1f2937;
    color: white;
  }
  
  .newsletter-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  .newsletter-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .newsletter-text {
    color: #9ca3af;
    margin-bottom: 20px;
  }
  
  .newsletter-form {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .newsletter-input {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .newsletter-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .newsletter-btn:hover {
    background: #1d4ed8;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    customers: 0,
    services: 0,
    experts: 0,
    years: 0
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  useEffect(() => {
    // Animated counter
    const animateNumbers = () => {
      const targets = { customers: 5000, services: 15000, experts: 50, years: 10 };
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setCounts({
          customers: Math.floor(targets.customers * progress),
          services: Math.floor(targets.services * progress),
          experts: Math.floor(targets.experts * progress),
          years: Math.floor(targets.years * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setCounts(targets);
        }
      }, stepTime);
    };
    
    animateNumbers();
  }, []);

  const previewServices = [
    { icon: "🛢️", name: "Oil Change" },
    { icon: "🔧", name: "General Service" },
    { icon: "🛑", name: "Brake Service" },
    { icon: "🚗", name: "Tyre Replacement" },
    { icon: "🔋", name: "Battery Check" },
    { icon: "🧼", name: "Car Wash" },
    { icon: "❄️", name: "A/C Service" },
    { icon: "⚙️", name: "Wheel Alignment" }
  ];

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterMsg('Thank you for subscribing!');
      setTimeout(() => setNewsletterMsg(''), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        <TopBar />
        
        <main className="dashboard-main">
          {/* Hero Section */}
          <section className="hero">
            <div className="dashboard-container">
              <h1 className="hero-title">Book your Vehicle Service Online</h1>
              <p className="hero-subtitle">in just a few clicks. Hassle-free and reliable.</p>
              <button className="book-btn" onClick={() => navigate('/login')}>
                Book Service Now
              </button>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">10+</div>
                  <div className="hero-stat-label">Years Experience</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">24/7</div>
                  <div className="hero-stat-label">Support</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">100%</div>
                  <div className="hero-stat-label">Guaranteed</div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Counter Section */}
          <section className="stats-section">
            <div className="dashboard-container">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{counts.customers.toLocaleString()}+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counts.services.toLocaleString()}+</div>
                  <div className="stat-label">Services Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counts.experts}+</div>
                  <div className="stat-label">Expert Mechanics</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counts.years}+</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="about-section">
            <div className="dashboard-container">
              <div className="about-grid">
                <div className="about-content">
                  <h2>About East & Easy</h2>
                  <p>
                    Founded in 2015, East & Easy has grown to become one of the most trusted 
                    vehicle service centers. We combine modern technology with traditional values 
                    of honesty, transparency, and quality workmanship.
                  </p>
                  <p>
                    Our team of certified mechanics uses state-of-the-art diagnostic equipment 
                    to ensure your vehicle receives the best possible care.
                  </p>
                  <ul className="about-features">
                    <li>Certified and experienced technicians</li>
                    <li>State-of-the-art diagnostic equipment</li>
                    <li>Genuine parts and quality materials</li>
                    <li>Transparent pricing with no hidden costs</li>
                  </ul>
                </div>
                <div className="about-image">
                  <div className="about-icon">🏆</div>
                  <h3>Award Winning Service</h3>
                  <p>Recognized for excellence in vehicle care</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features">
            <div className="dashboard-container">
              <h2 className="section-title">Why Choose Us?</h2>
              <p className="section-subtitle">We provide the best service experience</p>
              <div className="features-grid">
                <div className="feature-card" onClick={() => navigate('/services')}>
                  <div className="feature-icon">📅</div>
                  <h3 className="feature-title">Easy Booking</h3>
                  <p className="feature-desc">Book your service in just a few steps with our simple online system.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/services')}>
                  <div className="feature-icon">🔧</div>
                  <h3 className="feature-title">Trusted Service</h3>
                  <p className="feature-desc">Quality service by experienced and certified experts.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/services')}>
                  <div className="feature-icon">⏱️</div>
                  <h3 className="feature-title">Save Time</h3>
                  <p className="feature-desc">Quick appointment scheduling and on-time service delivery.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Services Preview */}
          <section className="services-preview">
            <div className="dashboard-container">
              <h2 className="section-title">Our Popular Services</h2>
              <p className="section-subtitle">Comprehensive vehicle care solutions</p>
              <div className="services-grid">
                {previewServices.map((service, index) => (
                  <div key={index} className="service-preview-card" onClick={() => navigate('/services')}>
                    <div className="service-preview-icon">{service.icon}</div>
                    <div className="service-preview-title">{service.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials">
            <div className="dashboard-container">
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-subtitle">Real experiences from real customers</p>
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div className="rating">★★★★★</div>
                  <p className="testimonial-text">
                    "My car has never felt this smooth. The team was professional, transparent, 
                    and completed everything on time. I recommend this service station to anyone 
                    who wants reliable vehicle care."
                  </p>
                  <p className="testimonial-author">- Nadeesha Perera</p>
                  <p className="testimonial-role">Entrepreneur</p>
                </div>
                <div className="testimonial-card">
                  <div className="rating">★★★★★</div>
                  <p className="testimonial-text">
                    "Booking was simple, the staff were friendly, and my vehicle was ready exactly 
                    when promised. I highly recommend their service."
                  </p>
                  <p className="testimonial-author">- Tharindu Silva</p>
                  <p className="testimonial-role">Software Engineer</p>
                </div>
                <div className="testimonial-card">
                  <div className="rating">★★★★★</div>
                  <p className="testimonial-text">
                    "The entire experience was smooth and stress-free. If you need dependable 
                    vehicle maintenance, this is the place I recommend."
                  </p>
                  <p className="testimonial-author">- Ishara Jayawardena</p>
                  <p className="testimonial-role">Marketing Executive</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="dashboard-container">
              <h2 className="cta-title">Ready to Get Started?</h2>
              <p className="cta-text">Join thousands of satisfied customers who trust us with their vehicles</p>
              <div className="cta-buttons">
                <button className="cta-btn-primary" onClick={() => navigate('/login')}>Book Now</button>
                <button className="cta-btn-secondary" onClick={() => navigate('/services')}>View Services</button>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="newsletter-section">
            <div className="dashboard-container">
              <div className="newsletter-container">
                <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
                <p className="newsletter-text">Get latest updates, offers and maintenance tips</p>
                <form className="newsletter-form" onSubmit={handleNewsletter}>
                  <input 
                    type="email" 
                    className="newsletter-input" 
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
                {newsletterMsg && <p style={{ color: '#10b981', marginTop: '10px' }}>{newsletterMsg}</p>}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;