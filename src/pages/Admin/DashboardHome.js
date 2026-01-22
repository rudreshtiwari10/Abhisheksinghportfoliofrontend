import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardHome.css';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    expertises: 0,
    companies: 0,
    achievements: 0
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const [expertises, companies, achievements] = await Promise.all([
          axios.get(`${API_URL}/api/content/admin/expertise`, { headers }),
          axios.get(`${API_URL}/api/content/admin/company`, { headers }),
          axios.get(`${API_URL}/api/content/admin/achievement`, { headers })
        ]);

        setStats({
          expertises: expertises.data.count || 0,
          companies: companies.data.count || 0,
          achievements: achievements.data.count || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_URL, token]);

  return (
    <div className="dashboard-home">
      <h1>Dashboard Overview</h1>
      <p className="dashboard-subtitle">Manage your portfolio content from here</p>

      {loading ? (
        <div className="loading">Loading statistics...</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💡</div>
            <div className="stat-content">
              <h3>{stats.expertises}</h3>
              <p>Expertise Items</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <h3>{stats.companies}</h3>
              <p>Companies</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>{stats.achievements}</h3>
              <p>Achievements</p>
            </div>
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <a href="/admin/hero" className="action-card">
            <span className="action-icon">🎯</span>
            <span>Edit Hero Section</span>
          </a>

          <a href="/admin/about" className="action-card">
            <span className="action-icon">👤</span>
            <span>Edit About Section</span>
          </a>

          <a href="/admin/expertise" className="action-card">
            <span className="action-icon">💡</span>
            <span>Manage Expertise</span>
          </a>

          <a href="/admin/companies" className="action-card">
            <span className="action-icon">🏢</span>
            <span>Manage Companies</span>
          </a>

          <a href="/admin/achievements" className="action-card">
            <span className="action-icon">🏆</span>
            <span>Manage Achievements</span>
          </a>

          <a href="/admin/sections" className="action-card">
            <span className="action-icon">📄</span>
            <span>Custom Sections</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
