import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .home-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .home-main {
    flex: 1;
  }
  
  .home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Welcome Banner */
  .welcome-banner {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 30px 0;
    text-align: center;
  }
  
  .welcome-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .welcome-subtitle {
    font-size: 16px;
    opacity: 0.95;
  }
  
  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
    padding: 100px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .hero-section::before {
    content: "🚗";
    position: absolute;
    font-size: 300px;
    opacity: 0.1;
    bottom: -50px;
    right: -50px;
  }
  
  .hero-section::after {
    content: "🔧";
    position: absolute;
    font-size: 250px;
    opacity: 0.1;
    top: -50px;
    left: -50px;
  }
  
  .hero-title {
    font-size: 52px;
    font-weight: bold;
    margin-bottom: 16px;
    animation: fadeInUp 0.8s ease;
  }
  
  .hero-subtitle {
    font-size: 20px;
    opacity: 0.95;
    margin-bottom: 30px;
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
    font-size: 36px;
    font-weight: bold;
  }
  
  .hero-stat-label {
    font-size: 14px;
    opacity: 0.8;
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
  
  /* About Us Section */
  .about-section {
    padding: 80px 0;
    background: white;
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
    font-size: 36px;
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
    margin-top: 20px;
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
    font-size: 18px;
  }
  
  .about-image {
    background: linear-gradient(135deg, #3b82f6, #1e3a8a);
    border-radius: 20px;
    padding: 60px;
    text-align: center;
    color: white;
  }
  
  .about-image-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }
  
  /* Services Section */
  .services-section {
    padding: 80px 0;
    background: #f3f4f6;
  }
  
  .section-title {
    font-size: 36px;
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
  
  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
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
    padding: 30px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  }
  
  .service-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .service-title {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 12px;
  }
  
  .service-description {
    color: #6b7280;
    line-height: 1.6;
  }
  
  /* Why Choose Us */
  .why-choose-us {
    padding: 80px 0;
    background: white;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .feature-card {
    text-align: center;
    padding: 30px;
    background: #f9fafb;
    border-radius: 16px;
    transition: all 0.3s;
  }
  
  .feature-card:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-5px);
  }
  
  .feature-card:hover .feature-title,
  .feature-card:hover .feature-desc {
    color: white;
  }
  
  .feature-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .feature-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 12px;
    transition: color 0.3s;
  }
  
  .feature-desc {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
    transition: color 0.3s;
  }
  
  /* Stats Section */
  .stats-section {
    padding: 80px 0;
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
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
    padding: 20px;
  }
  
  .stat-number {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .stat-label {
    font-size: 16px;
    opacity: 0.9;
  }
  
  /* Testimonials Section */
  .testimonials-section {
    padding: 80px 0;
    background: #f3f4f6;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .testimonials-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .testimonial-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }
  
  .testimonial-card:hover {
    transform: translateY(-5px);
  }
  
  .testimonial-rating {
    color: #fbbf24;
    font-size: 20px;
    margin-bottom: 16px;
  }
  
  .testimonial-text {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 20px;
    font-style: italic;
  }
  
  .testimonial-author {
    font-weight: bold;
    color: #1f2937;
  }
  
  .testimonial-role {
    color: #6b7280;
    font-size: 14px;
    margin-top: 5px;
  }
  
  /* CTA Section */
  .cta-section {
    padding: 80px 0;
    background: white;
    text-align: center;
  }
  
  .cta-title {
    font-size: 36px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .cta-text {
    font-size: 18px;
    color: #6b7280;
    margin-bottom: 30px;
  }
  
  .cta-button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 14px 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .cta-button:hover {
    transform: scale(1.05);
    background: #1d4ed8;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Customer';

  const services = [
    { icon: "🛢️", title: "Oil Change", description: "Professional engine oil and filter replacement service" },
    { icon: "🔧", title: "General Service", description: "Complete vehicle inspection and maintenance" },
    { icon: "🛑", title: "Brake Service", description: "Expert brake inspection and repair" },
    { icon: "🚗", title: "Tyre Replacement", description: "Quality tyre fitting and balancing" },
    { icon: "🔋", title: "Battery Check", description: "Battery health diagnosis and replacement" },
    { icon: "🧼", title: "Car Wash", description: "Premium interior and exterior cleaning" },
    { icon: "❄️", title: "A/C Service", description: "Air conditioning repair and gas refill" },
    { icon: "⚙️", title: "Wheel Alignment", description: "Precision steering and wheel alignment" },
    { icon: "⚡", title: "Electrical Repair", description: "Complete electrical system diagnosis" }
  ];

  const features = [
    { icon: "👨‍🔧", title: "Expert Technicians", desc: "Certified and experienced mechanics" },
    { icon: "🔧", title: "Modern Equipment", desc: "Latest diagnostic tools and equipment" },
    { icon: "⭐", title: "Quality Parts", desc: "Genuine and premium quality parts" },
    { icon: "💎", title: "Best Price", desc: "Competitive and transparent pricing" },
    { icon: "⚡", title: "Fast Service", desc: "Quick turnaround time" },
    { icon: "🔒", title: "Warranty", desc: "Service warranty on all repairs" },
    { icon: "📞", title: "24/7 Support", desc: "Round the clock assistance" },
    { icon: "🎯", title: "100% Satisfaction", desc: "Customer satisfaction guaranteed" }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "15000+", label: "Services Completed" },
    { number: "50+", label: "Expert Mechanics" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  const testimonials = [
    { text: "The team was professional and completed everything on time. Highly recommend!", author: "Nadeesha Perera", role: "Entrepreneur", rating: 5 },
    { text: "Booking was simple, staff were friendly, and my vehicle was ready exactly when promised.", author: "Tharindu Silva", role: "Software Engineer", rating: 5 },
    { text: "Smooth and stress-free experience. Best vehicle service in town!", author: "Ishara Jayawardena", role: "Marketing Executive", rating: 5 },
    { text: "Excellent service at reasonable prices. Will definitely come back!", author: "Kasun Bandara", role: "Business Owner", rating: 5 },
    { text: "Quick response and quality work. They really care about their customers.", author: "Amali Perera", role: "Doctor", rating: 5 },
    { text: "The best vehicle service I've experienced. Professional and reliable.", author: "Nuwan Rajapaksha", role: "Engineer", rating: 5 }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="home-page">
        <HomeTopBar />
        
        <main className="home-main">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="home-container">
              <h2 className="welcome-title">Welcome back, {userName}! 👋</h2>
              <p className="welcome-subtitle">Your trusted partner for vehicle care</p>
            </div>
          </div>

          {/* Hero Section */}
          <section className="hero-section">
            <div className="home-container">
              <h1 className="hero-title">Premium Vehicle Care Services</h1>
              <p className="hero-subtitle">Quality service you can trust, delivered with care</p>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">10+</div>
                  <div className="hero-stat-label">Years Experience</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">5000+</div>
                  <div className="hero-stat-label">Happy Customers</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">24/7</div>
                  <div className="hero-stat-label">Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="about-section">
            <div className="home-container">
              <div className="about-grid">
                <div className="about-content">
                  <h2>About East & Easy</h2>
                  <p>
                    Founded in 2015, East & Easy has grown to become one of the most trusted 
                    vehicle service centers in the region. We combine modern technology with 
                    traditional values of honesty, transparency, and quality workmanship.
                  </p>
                  <p>
                    Our team of certified mechanics uses state-of-the-art diagnostic equipment 
                    to ensure your vehicle receives the best possible care. We believe in 
                    building long-term relationships with our customers through exceptional service.
                  </p>
                  <ul className="about-features">
                    <li>Certified and experienced technicians</li>
                    <li>State-of-the-art diagnostic equipment</li>
                    <li>Genuine parts and quality materials</li>
                    <li>Transparent pricing with no hidden costs</li>
                  </ul>
                </div>
                <div className="about-image">
                  <div className="about-image-icon">🏆</div>
                  <h3>10+ Years of Excellence</h3>
                  <p>Trusted by thousands of vehicle owners</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Services Section */}
          <section className="services-section">
            <div className="home-container">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">Comprehensive vehicle care solutions</p>
              
              <div className="services-grid">
                {services.map((service, index) => (
                  <div key={index} className="service-card" onClick={() => navigate('/services')}>
                    <div className="service-icon">{service.icon}</div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="why-choose-us">
            <div className="home-container">
              <h2 className="section-title">Why Choose Us?</h2>
              <p className="section-subtitle">What makes us different from others</p>
              
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="home-container">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section">
            <div className="home-container">
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-subtitle">Real experiences from real customers</p>
              
              <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="testimonial-rating">{"★".repeat(testimonial.rating)}</div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <div className="testimonial-author">{testimonial.author}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="home-container">
              <h2 className="cta-title">Ready to Experience Quality Service?</h2>
              <p className="cta-text">
                Join thousands of satisfied customers who trust us with their vehicles
              </p>
              <button className="cta-button" onClick={() => navigate('/services')}>
                Explore Our Services
              </button>
            </div>
          </section>
        </main>

        <HomeFooter />
      </div>
    </>
  );
};

export default Home;