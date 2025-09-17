'use client';

import React, { createContext, useState, useEffect } from 'react';
import * as authService from '@/services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load auth state from localStorage on mount (client-side only)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('accessToken');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
    
  }, []);

  // Sync auth state across tabs/windows
  useEffect(() => {
    const syncAuth = () => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('accessToken');
      setUser(savedUser ? JSON.parse(savedUser) : null);
      setToken(savedToken || null);
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const signup = async (formData) => {
    return authService.register(formData);
  };

  const login = async (formData) => {
    const res = await authService.login(formData);
    setUser(res.user);
    setToken(res.access);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('accessToken', res.access);
    return res.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};