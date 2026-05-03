import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('votex_token'));
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/profile/');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', userData);
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      localStorage.setItem('votex_token', token);
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Registration failed',
        errors: error.response?.data
      };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password
      });
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      localStorage.setItem('votex_token', token);
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed'
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post('http://localhost:8000/api/auth/logout/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('votex_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('http://localhost:8000/api/auth/profile/update/', profileData);
      setUser(response.data.profile);
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Update failed',
        errors: error.response?.data
      };
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/change-password/', {
        old_password: oldPassword,
        new_password: newPassword
      });
      
      // Update token
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('votex_token', newToken);
      axios.defaults.headers.common['Authorization'] = `Token ${newToken}`;
      
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Password change failed'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshProfile: fetchUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
