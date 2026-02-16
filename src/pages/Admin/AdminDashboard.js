import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-dashboard">
            <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <p>Portfolio CMS</p>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/dashboard" className={`admin-nav-item ${isActive('/admin/dashboard')}`}>
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>

          <div className="nav-section-title">Content Management</div>

          <Link to="/admin/hero" className={`admin-nav-item ${isActive('/admin/hero')}`}>
            <span className="nav-icon">🎯</span>
            <span>Hero Section</span>
          </Link>

          <Link to="/admin/about" className={`admin-nav-item ${isActive('/admin/about')}`}>
            <span className="nav-icon">👤</span>
            <span>About Section</span>
          </Link>

          <Link to="/admin/blog" className={`admin-nav-item ${isActive('/admin/blog') || location.pathname.startsWith('/admin/blog/')}`}>
            <span className="nav-icon">📝</span>
            <span>Blog Posts</span>
          </Link>

          <Link to="/admin/expertise" className={`admin-nav-item ${isActive('/admin/expertise')}`}>
            <span className="nav-icon">💡</span>
            <span>Expertise</span>
          </Link>

          <Link to="/admin/companies" className={`admin-nav-item ${isActive('/admin/companies')}`}>
            <span className="nav-icon">🏢</span>
            <span>Companies</span>
          </Link>

          <Link to="/admin/services" className={`admin-nav-item ${isActive('/admin/services')}`}>
            <span className="nav-icon">🚀</span>
            <span>Services</span>
          </Link>

          <Link to="/admin/global-presence" className={`admin-nav-item ${isActive('/admin/global-presence')}`}>
            <span className="nav-icon">🌍</span>
            <span>Global Presence</span>
          </Link>

          <Link to="/admin/leadership" className={`admin-nav-item ${isActive('/admin/leadership')}`}>
            <span className="nav-icon">🎯</span>
            <span>Leadership Philosophy</span>
          </Link>

          <Link to="/admin/achievements" className={`admin-nav-item ${isActive('/admin/achievements')}`}>
            <span className="nav-icon">🏆</span>
            <span>Achievements</span>
          </Link>

          <Link to="/admin/sections" className={`admin-nav-item ${isActive('/admin/sections')}`}>
            <span className="nav-icon">📄</span>
            <span>Custom Sections</span>
          </Link>

          <div className="nav-section-title">Communications</div>

          <Link to="/admin/messages" className={`admin-nav-item ${isActive('/admin/messages') || location.pathname.startsWith('/admin/messages/')}`}>
            <span className="nav-icon">💬</span>
            <span>Messages</span>
          </Link>

          <div className="nav-section-title">Settings</div>

          <Link to="/admin/profile" className={`admin-nav-item ${isActive('/admin/profile')}`}>
            <span className="nav-icon">⚙️</span>
            <span>Profile</span>
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <strong>{admin?.username}</strong>
            <small>{admin?.role}</small>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </aside>

            <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
