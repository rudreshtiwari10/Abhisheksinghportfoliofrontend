import React, { useEffect, useState } from 'react';
import './CompaniesSection.css';

const CompaniesSection = () => {
  const [companies, setCompanies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchCompaniesData();
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

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchCompaniesData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';
      const response = await fetch(`${API_URL}/api/content/public/all`);
      const data = await response.json();

      if (data.success && data.data.companies) {
        setCompanies(data.data.companies);
      }
    } catch (error) {
      console.error('Error fetching companies data:', error);
    }
  };

  return (
    <section id="projects" className={`companies-section ${isVisible ? 'visible' : ''}`}>
      <div className="companies-pattern"></div>
      <div className="companies-gradient"></div>

      <div className="companies-container">
                <div className="companies-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">Portfolio</span>
          </div>
          <h2 className="section-title">Companies & Ventures</h2>
          <p className="section-subtitle">
            Leading innovative organizations across technology, education, and consulting sectors
          </p>
        </div>

                {companies && companies.length > 0 ? (
          <div className="companies-grid">
            {companies.map((company, index) => (
              <div
                key={company._id}
                className="company-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                                {company.logo && (
                  <div className="company-logo">
                    <img src={company.logo} alt={`${company.name} logo`} />
                  </div>
                )}

                                <div className="company-info">
                  <h3 className="company-name">{company.name}</h3>

                  {company.description && (
                    <p className="company-description">{company.description}</p>
                  )}

                                    {company.valueProposition && (
                    <div className="company-value">
                      <div className="value-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>{company.valueProposition}</span>
                    </div>
                  )}

                                    {company.services && company.services.length > 0 && (
                    <div className="company-services">
                      <h4 className="services-title">Services</h4>
                      <div className="services-list">
                        {company.services.map((service, idx) => (
                          <span key={idx} className="service-tag">{service}</span>
                        ))}
                      </div>
                    </div>
                  )}

                                    {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-link"
                    >
                      <span>Visit Website</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                </div>

                <div className="company-shine"></div>
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

export default CompaniesSection;
