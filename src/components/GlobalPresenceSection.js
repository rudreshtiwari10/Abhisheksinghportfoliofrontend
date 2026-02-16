import React, { useEffect, useState } from 'react';
import './GlobalPresenceSection.css';

const GlobalPresenceSection = () => {
  const [globalPresence, setGlobalPresence] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchGlobalPresenceData();
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

    const element = document.getElementById('experience');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchGlobalPresenceData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';
      const response = await fetch(`${API_URL}/api/content/public/all`);
      const data = await response.json();

      if (data.success && data.data.globalPresence) {
        setGlobalPresence(data.data.globalPresence);
      }
    } catch (error) {
      console.error('Error fetching global presence data:', error);
    }
  };

  return (
    <section id="experience" className={`global-presence-section ${isVisible ? 'visible' : ''}`}>
      <div className="global-presence-pattern"></div>
      <div className="global-presence-gradient"></div>

      <div className="global-presence-container">
                <div className="global-presence-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">Global Reach</span>
          </div>
          <h2 className="section-title">Worldwide Presence</h2>
          <p className="section-subtitle">
            Building strategic partnerships and driving innovation across continents
          </p>
        </div>

                {globalPresence && globalPresence.length > 0 ? (
          <>
            <div className="countries-grid">
              {globalPresence.map((country, index) => (
                <div
                  key={country._id}
                  className="country-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                                    {country.flagEmoji && (
                    <div className="country-flag">{country.flagEmoji}</div>
                  )}

                                    <div className="country-info">
                    <h3 className="country-name">{country.country}</h3>

                    {country.region && (
                      <div className="country-region">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>{country.region}</span>
                      </div>
                    )}

                    {country.description && (
                      <p className="country-description">{country.description}</p>
                    )}

                                        {country.partnerships && country.partnerships.length > 0 && (
                      <div className="country-partnerships">
                        <h4 className="partnerships-title">Key Partnerships</h4>
                        <ul className="partnerships-list">
                          {country.partnerships.map((partnership, idx) => (
                            <li key={idx} className="partnership-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M5 12L10 17L20 7"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>{partnership}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="country-shine"></div>
                </div>
              ))}
            </div>

                        <div className="global-stats">
              <div className="stat-item">
                <div className="stat-value">{globalPresence.length}+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">
                  {globalPresence.reduce((acc, country) =>
                    acc + (country.partnerships ? country.partnerships.length : 0), 0
                  )}+
                </div>
                <div className="stat-label">Partnerships</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">
                  {new Set(globalPresence.map(c => c.region)).size}
                </div>
                <div className="stat-label">Regions</div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
