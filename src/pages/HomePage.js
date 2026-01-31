import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navigation />
      <HeroSection />

      {/* Other sections will be added here */}
      {/* <AboutSection /> */}
      {/* <ExpertiseSection /> */}
      {/* <CompaniesSection /> */}
      {/* <AchievementsSection /> */}
    </div>
  );
};

export default HomePage;
