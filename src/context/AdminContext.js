import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/admin/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.data.success) {
            setAdmin(response.data.admin);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token, API_URL]);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/admin/auth/login`, {
        username,
        password
      });

      if (response.data.success) {
        const { token: newToken, admin: adminData } = response.data;

        // Save to localStorage
        localStorage.setItem('adminToken', newToken);
        localStorage.setItem('adminData', JSON.stringify(adminData));

        // Update state
        setToken(newToken);
        setAdmin(adminData);

        return { success: true };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setToken(null);
    setAdmin(null);
  };

  // Check if admin is authenticated
  const isAuthenticated = () => {
    return !!token && !!admin;
  };

  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
