import React, { useEffect, useState } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const [about, setAbout] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchAboutData();
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

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchAboutData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';
      console.log('[AboutSection] Fetching from:', `${API_URL}/api/content/public/all`);
      const response = await fetch(`${API_URL}/api/content/public/all`);
      const data = await response.json();
      console.log('[AboutSection] API Response:', data);
      console.log('[AboutSection] About data:', data.data?.about);

      if (data.success && data.data.about) {
        console.log('[AboutSection] Setting about data');
        setAbout(data.data.about);
      } else {
        console.log('[AboutSection] No about data found or success=false');
      }
    } catch (error) {
      console.error('[AboutSection] Error fetching about data:', error);
    }
  };

  return (
    <section id="about" className={`about-section ${isVisible ? 'visible' : ''}`}>
      <div className="about-pattern"></div>
      <div className="about-gradient"></div>

      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">About</span>
          </div>
          <h2 className="section-title">Visionary Leadership</h2>
        </div>

        {/* Main Content Grid */}
        {about ? (
          <div className="about-content">
            {/* Left: Biography */}
            <div className="about-bio">
              <div className="bio-content">
                {about.biography && about.biography.split('\n\n').map((paragraph, index) => (
                <p key={index} className="bio-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            {about.highlights && about.highlights.length > 0 && (
              <div className="about-highlights">
                {about.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Education & Image */}
          <div className="about-side">
            {/* Profile Image */}
            {about.profileImage && (
              <div className="about-image-frame">
                <div className="image-overlay"></div>
                <img
                  src={about.profileImage}
                  alt="Profile"
                  className="about-profile-image"
                />
                <div className="image-border"></div>
              </div>
            )}

            {/* Education */}
            {about.education && about.education.length > 0 && (
              <div className="about-education">
                <h3 className="education-title">Education</h3>
                <div className="education-list">
                  {about.education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <div className="education-degree">{edu.degree}</div>
                      <div className="education-field">{edu.field}</div>
                      <div className="education-institution">{edu.institution}</div>
                      {edu.year && <div className="education-year">{edu.year}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#a0a0a0' }}>
            <p>Loading content...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
