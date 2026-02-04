import React, { useEffect, useState } from 'react';
import './AchievementsSection.css';

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchAchievementsData();
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

    const element = document.getElementById('certifications');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const fetchAchievementsData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';
      const response = await fetch(`${API_URL}/api/content/public/all`);
      const data = await response.json();

      if (data.success && data.data.achievements) {
        setAchievements(data.data.achievements);
      }
    } catch (error) {
      console.error('Error fetching achievements data:', error);
    }
  };

  // Get unique categories
  const categories = achievements && achievements.length > 0
    ? ['All', ...new Set(achievements.map(a => a.category).filter(Boolean))]
    : [];

  // Filter achievements by category
  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <section id="certifications" className={`achievements-section ${isVisible ? 'visible' : ''}`}>
      <div className="achievements-pattern"></div>
      <div className="achievements-gradient"></div>

      <div className="achievements-container">
        {/* Section Header */}
        <div className="achievements-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">Milestones & Recognition</span>
          </div>
          <h2 className="section-title">Key Achievements</h2>
          <p className="section-subtitle">
            Celebrating milestones that shaped our journey to excellence
          </p>
        </div>

        {/* Content Area */}
        {achievements && achievements.length > 0 ? (
          <>
            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="category-filter">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Achievements Timeline */}
            <div className="achievements-timeline">
              {filteredAchievements.map((achievement, index) => (
                <div
                  key={achievement._id}
                  className="achievement-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot"></div>

                  {/* Achievement Card */}
                  <div className="achievement-card">
                    {/* Year Badge */}
                    {achievement.year && (
                      <div className="achievement-year">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>{achievement.year}</span>
                      </div>
                    )}

                    {/* Category Badge */}
                    {achievement.category && (
                      <div className="achievement-category">{achievement.category}</div>
                    )}

                    {/* Content */}
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <p className="achievement-description">{achievement.description}</p>

                    {/* Icon */}
                    <div className="achievement-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="achievement-shine"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
