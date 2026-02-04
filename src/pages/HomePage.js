import React from 'react';
import DynamicIslandNav from '../components/DynamicIslandNav';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExpertiseSection from '../components/ExpertiseSection';
import CompaniesSection from '../components/CompaniesSection';
import GlobalPresenceSection from '../components/GlobalPresenceSection';
import LeadershipPhilosophySection from '../components/LeadershipPhilosophySection';
import AchievementsSection from '../components/AchievementsSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <div className="home-page">
      <DynamicIslandNav />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <CompaniesSection />
      <GlobalPresenceSection />
      <LeadershipPhilosophySection />
      <AchievementsSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
