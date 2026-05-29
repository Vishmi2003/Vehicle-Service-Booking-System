import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import HomeFooter from '../components/HomeFooter';

const styles = `
  .about-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }
  
  .about-main {
    flex: 1;
  }
  
  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Hero Section */
  .about-hero {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
    padding: 80px 0;
    text-align: center;
  }
  
  .about-hero-title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .about-hero-subtitle {
    font-size: 20px;
    opacity: 0.95;
    max-width: 700px;
    margin: 0 auto;
  }
  
  /* Story Section */
  .story-section {
    padding: 80px 0;
    background: white;
  }
  
  .story-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 50px;
    align-items: center;
  }
  
  @media (min-width: 768px) {
    .story-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .story-content h2 {
    font-size: 36px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .story-content p {
    color: #6b7280;
    line-height: 1.8;
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .story-image {
    background: linear-gradient(135deg, #3b82f6, #1e3a8a);
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    color: white;
  }
  
  .story-image-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }
  
  /* Mission & Vision */
  .mission-section {
    padding: 80px 0;
    background: #f3f4f6;
  }
  
  .mission-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  @media (min-width: 768px) {
    .mission-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .mission-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }
  
  .mission-card:hover {
    transform: translateY(-5px);
  }
  
  .mission-icon {
    font-size: 60px;
    margin-bottom: 20px;
  }
  
  .mission-card h3 {
    font-size: 28px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .mission-card p {
    color: #6b7280;
    line-height: 1.6;
  }
  
  /* Values Section */
  .values-section {
    padding: 80px 0;
    background: white;
  }
  
  .section-title {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    color: #1f2937;
    margin-bottom: 16px;
  }
  
  .section-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 60px;
    font-size: 18px;
  }
  
  .values-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  @media (min-width: 768px) {
    .values-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .values-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .value-card {
    text-align: center;
    padding: 30px;
    background: #f9fafb;
    border-radius: 12px;
    transition: all 0.3s;
  }
  
  .value-card:hover {
    background: #2563eb;
    color: white;
  }
  
  .value-card:hover .value-title,
  .value-card:hover .value-desc {
    color: white;
  }
  
  .value-icon {
    font-size: 50px;
    margin-bottom: 20px;
  }
  
  .value-title {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 12px;
    transition: color 0.3s;
  }
  
  .value-desc {
    color: #6b7280;
    line-height: 1.5;
    transition: color 0.3s;
  }
  
  /* Team Section */
  .team-section {
    padding: 80px 0;
    background: #f3f4f6;
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  @media (min-width: 768px) {
    .team-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .team-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .team-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }
  
  .team-card:hover {
    transform: translateY(-5px);
  }
  
  .team-image {
    background: linear-gradient(135deg, #3b82f6, #1e3a8a);
    padding: 40px;
  }
  
  .team-avatar {
    font-size: 80px;
  }
  
  .team-info {
    padding: 20px;
  }
  
  .team-name {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 8px;
  }
  
  .team-role {
    color: #2563eb;
    font-weight: 500;
    margin-bottom: 12px;
  }
  
  .team-desc {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
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
  
  .stat-number {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .stat-label {
    font-size: 18px;
    opacity: 0.95;
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
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 14px 40px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .cta-button:hover {
    background: #1d4ed8;
  }
`;

const AboutUs = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const values = [
    { icon: "🔧", title: "Quality Service", desc: "We use only the best tools and equipment" },
    { icon: "⭐", title: "Customer First", desc: "Your satisfaction is our top priority" },
    { icon: "⚡", title: "Fast Response", desc: "Quick turnaround time for all services" },
    { icon: "💎", title: "Transparent", desc: "No hidden charges, honest pricing" }
  ];

  const team = [
    { name: "Nadeesha Perera", role: "Founder & CEO", desc: "15+ years in automotive industry", avatar: "👨‍💼" },
    { name: "Tharindu Silva", role: "Head Mechanic", desc: "Expert in all vehicle types", avatar: "🔧" },
    { name: "Ishara Jayawardena", role: "Service Manager", desc: "Ensures quality service delivery", avatar: "👩‍💼" },
    { name: "Kasun Bandara", role: "Customer Support", desc: "Always ready to help you", avatar: "💬" }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "15000+", label: "Services Done" },
    { number: "50+", label: "Expert Mechanics" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="about-page">
        {isLoggedIn ? <HomeTopBar /> : null}
        
        <main className="about-main">
          {/* Hero Section */}
          <section className="about-hero">
            <div className="about-container">
              <h1 className="about-hero-title">About Us</h1>
              <p className="about-hero-subtitle">
                We are dedicated to providing the best vehicle service experience 
                with professionalism, transparency, and care.
              </p>
            </div>
          </section>

          {/* Story Section */}
          <section className="story-section">
            <div className="about-container">
              <div className="story-grid">
                <div className="story-content">
                  <h2>Our Story</h2>
                  <p>
                    East & Easy Vehicle Service was founded in 2015 with a simple mission: 
                    to provide reliable, transparent, and high-quality vehicle maintenance 
                    services to our community.
                  </p>
                  <p>
                    What started as a small garage with just two mechanics has grown into 
                    a trusted service center serving over 5,000 satisfied customers. We 
                    believe that vehicle maintenance shouldn't be complicated or expensive.
                  </p>
                  <p>
                    Today, we're proud to offer a wide range of services using the latest 
                    technology and equipment, all while maintaining the personal touch and 
                    attention to detail that our customers love.
                  </p>
                </div>
                <div className="story-image">
                  <div className="story-image-icon">🚗</div>
                  <h3>10+ Years of Excellence</h3>
                  <p>Trusted by thousands of vehicle owners</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mission-section">
            <div className="about-container">
              <div className="mission-grid">
                <div className="mission-card">
                  <div className="mission-icon">🎯</div>
                  <h3>Our Mission</h3>
                  <p>
                    To provide exceptional vehicle service that exceeds customer expectations 
                    through quality workmanship, transparent pricing, and timely delivery.
                  </p>
                </div>
                <div className="mission-card">
                  <div className="mission-icon">👁️</div>
                  <h3>Our Vision</h3>
                  <p>
                    To become the most trusted and preferred vehicle service provider in the 
                    region, known for excellence, innovation, and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <div className="about-container">
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle">The principles that guide everything we do</p>
              
              <div className="values-grid">
                {values.map((value, index) => (
                  <div key={index} className="value-card">
                    <div className="value-icon">{value.icon}</div>
                    <h3 className="value-title">{value.title}</h3>
                    <p className="value-desc">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="about-container">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <div className="about-container">
              <h2 className="section-title">Meet Our Team</h2>
              <p className="section-subtitle">Dedicated professionals ready to serve you</p>
              
              <div className="team-grid">
                {team.map((member, index) => (
                  <div key={index} className="team-card">
                    <div className="team-image">
                      <div className="team-avatar">{member.avatar}</div>
                    </div>
                    <div className="team-info">
                      <h3 className="team-name">{member.name}</h3>
                      <div className="team-role">{member.role}</div>
                      <p className="team-desc">{member.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="about-container">
              <h2 className="cta-title">Ready to Experience Quality Service?</h2>
              <p className="cta-text">
                Join thousands of satisfied customers who trust us with their vehicles.
                Book your service today!
              </p>
              <button 
                className="cta-button" 
                onClick={() => isLoggedIn ? navigate('/home') : navigate('/login')}
              >
                Book Your Service Now
              </button>
            </div>
          </section>
        </main>

        <HomeFooter />
      </div>
    </>
  );
};

export default AboutUs;