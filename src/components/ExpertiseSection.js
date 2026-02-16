import React, { useEffect, useState } from 'react';
import './ExpertiseSection.css';

const ExpertiseSection = () => {
  const [expertises, setExpertises] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchExpertiseData();
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

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchExpertiseData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';
      const response = await fetch(`${API_URL}/api/content/public/all`);
      const data = await response.json();

      if (data.success && data.data.expertises) {
        setExpertises(data.data.expertises);
      }
    } catch (error) {
      console.error('Error fetching expertise data:', error);
    }
  };

  return (
    <section id="skills" className={`expertise-section ${isVisible ? 'visible' : ''}`}>
      <div className="expertise-pattern"></div>
      <div className="expertise-gradient"></div>

      <div className="expertise-container">
                <div className="expertise-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">Core Expertise</span>
          </div>
          <h2 className="section-title">Areas of Excellence</h2>
          <p className="section-subtitle">
            Strategic leadership across technology, business consulting, and global innovation
          </p>
        </div>

                {expertises && expertises.length > 0 ? (
          <div className="expertise-grid">
            {expertises.map((expertise, index) => (
              <div
                key={expertise._id}
                className="expertise-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="expertise-icon">
                  {expertise.icon || '🚀'}
                </div>
                <h3 className="expertise-title">{expertise.title}</h3>
                <p className="expertise-description">{expertise.description}</p>
                <div className="expertise-shine"></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#a0a0a0' }}>
            <p>Loading expertise areas...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpertiseSection;
