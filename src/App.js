import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import DashboardHome from './pages/Admin/DashboardHome';
import ExpertiseManage from './pages/Admin/ExpertiseManage';
import BlogManage from './pages/Admin/BlogManage';
import BlogEditor from './pages/Admin/BlogEditor';
import MessagesManage from './pages/Admin/MessagesManage';
import MessageDetail from './pages/Admin/MessageDetail';
import AboutManage from './pages/Admin/AboutManage';
import CompanyManage from './pages/Admin/CompanyManage';
import ServiceManage from './pages/Admin/ServiceManage';
import GlobalPresenceManage from './pages/Admin/GlobalPresenceManage';
import LeadershipPhilosophyManage from './pages/Admin/LeadershipPhilosophyManage';
import AchievementManage from './pages/Admin/AchievementManage';
import ProtectedRoute from './components/Admin/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

// Global Components
import FloatingContact from './components/FloatingContact';

import './App.css';
// import Ankush from './components/Ankush';

// Layout wrapper to show FloatingContact only on public pages
function AppLayout() {
  const location = useLocation();
  const isPublicPage = !location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Admin Login Route (hidden, accessed by typing URL directly) */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            {/* Default redirect to dashboard */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />

            {/* Dashboard Home */}
            <Route path="dashboard" element={<DashboardHome />} />

            {/* Content Management Routes */}
            <Route path="hero" element={<div style={{padding: '20px'}}>Hero Section Management (Coming Soon)</div>} />
            <Route path="about" element={<AboutManage />} />
            <Route path="blog" element={<BlogManage />} />
            <Route path="blog/create" element={<BlogEditor />} />
            <Route path="blog/edit/:id" element={<BlogEditor />} />
            <Route path="expertise" element={<ExpertiseManage />} />
            <Route path="companies" element={<CompanyManage />} />
            <Route path="services" element={<ServiceManage />} />
            <Route path="global-presence" element={<GlobalPresenceManage />} />
            <Route path="leadership" element={<LeadershipPhilosophyManage />} />
            <Route path="achievements" element={<AchievementManage />} />
            <Route path="sections" element={<div style={{padding: '20px'}}>Custom Sections Management (Coming Soon)</div>} />

            {/* Messages Management Routes */}
            <Route path="messages" element={<MessagesManage />} />
            <Route path="messages/:id" element={<MessageDetail />} />

            {/* Profile Settings */}
            <Route path="profile" element={<div style={{padding: '20px'}}>Profile Settings (Coming Soon)</div>} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Show Floating Contact only on public pages */}
        {isPublicPage && <FloatingContact />}
      </>
    );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <AppLayout />
      </Router>
    </AdminProvider>
  );
}

export default App;
