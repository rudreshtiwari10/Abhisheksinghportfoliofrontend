import React, { useEffect, useState } from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchServicesData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchServicesData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';
      const response = await fetch(`${API_URL}/api/content/public/all`);
      const data = await response.json();

      if (data.success && data.data.services) {
        setServices(data.data.services);
      }
    } catch (error) {
      console.error('Error fetching services data:', error);
    }
  };

  return (
    <section id="services" className={`services-section ${isVisible ? 'visible' : ''}`}>
      <div className="services-pattern"></div>
      <div className="services-gradient"></div>

      <div className="services-container">
                <div className="services-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">What We Offer</span>
          </div>
          <h2 className="section-title">Services & Solutions</h2>
          <p className="section-subtitle">
            Comprehensive services designed to drive growth, innovation, and strategic excellence
          </p>
        </div>

                {services && services.length > 0 ? (
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="service-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                                {service.icon && (
                  <div className="service-icon">
                    {service.icon}
                  </div>
                )}

                                {service.category && (
                  <div className="service-category">{service.category}</div>
                )}

                                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                                    {service.features && service.features.length > 0 && (
                    <div className="service-features">
                      <h4 className="features-title">Key Features</h4>
                      <ul className="features-list">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="feature-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M5 12L10 17L20 7"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                                    <a href="#contact" className="service-link">
                    <span>Get Started</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>

                <div className="service-shine"></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
