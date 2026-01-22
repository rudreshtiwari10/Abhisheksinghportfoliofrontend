import React, { useEffect, useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const roles = [
    'Founder & CEO',
    'Cyber Security Expert',
    'Full Stack Developer',
    'Business Strategist',
    'Education Mentor',
    'Startup Accelerator'
  ];

  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="hero-section">
      {/* Animated Background Elements */}
      <div className="hero-bg">
        <div className="floating-shape shape-1" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
        <div className="floating-shape shape-2" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
        <div className="floating-shape shape-3" style={{ transform: `translateY(${scrollY * 0.4}px)` }}></div>
        <div className="floating-dots">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="dot" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <div className="hero-grid">
          {/* Left Side - Text Content */}
          <div className="hero-text">
            <div className="greeting">
              <span className="wave">👋</span>
              <span>Hello, I'm</span>
            </div>

            <h1 className="hero-name">
              Thakur Abhishek Singh
            </h1>

            <div className="role-container">
              <span className="role-label">
                {roles[currentRole]}
              </span>
            </div>

            <p className="hero-tagline">
              Driving global growth through technology, education, and strategic consulting across 6+ countries
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">6+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">2</div>
                <div className="stat-label">Companies</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Exp</div>
              </div>
            </div>

            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                <span>Let's Connect</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L12 6M16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#companies" className="btn btn-secondary">
                <span>Explore Work</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="mailto:abhishek.ceo@countryedu.com" className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <path d="M3 7l9 6 9-6"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.12-9.91-5.04-.42.72-.66 1.55-.66 2.44 0 1.67.85 3.14 2.14 4-.79-.03-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.28 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.56 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hero-image-container">
            <div className="image-backdrop"></div>
            <div className="image-wrapper">
              <img
                src="/images/abhishek-singh.png"
                alt="Abhishek Singh"
                className="hero-image"
              />
              <div className="image-glow"></div>
            </div>

            {/* Floating Badge */}
            <div className="floating-badge badge-1">
              <div className="badge-icon">🚀</div>
              <div className="badge-text">
                <div className="badge-title">Global Reach</div>
                <div className="badge-subtitle">UAE • Canada • Australia</div>
              </div>
            </div>

            <div className="floating-badge badge-2">
              <div className="badge-icon">💼</div>
              <div className="badge-text">
                <div className="badge-title">CountryEdu</div>
                <div className="badge-subtitle">EdTech Leader</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">Scroll to explore</div>
        <div className="scroll-line"></div>
      </div>
    </div>
  );
};

export default HeroSection;
