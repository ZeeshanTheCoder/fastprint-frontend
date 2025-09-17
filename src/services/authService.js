import axios from 'axios';
import { BASE_URL } from './baseUrl';

// Use environment variable for BASE_URL
const API_BASE = `${BASE_URL}api/users`;

/**
 * Register a new user.
 * @param {Object} data - { name, email, password }
 */
export const register = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/register/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Registration failed' };
  }
};

/**
 * Login a user.
 * @param {Object} data - { email, password }
 */
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/login/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

/**
 * Request a password reset email.
 * @param {Object} data - { email }
 */
export const requestReset = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/request-reset-password/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Reset request failed' };
  }
};

/**
 * Reset password using uidb64 and token.
 * @param {string} uidb64
 * @param {string} token
 * @param {Object} data - { password }
 */
export const resetPassword = async (uidb64, token, data) => {
  try {
    const response = await axios.post(`${API_BASE}/reset-password/${uidb64}/${token}/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Password reset failed' };
  }
};

/**
 * Verify email from email link.
 * @param {string} uidb64
 * @param {string} token
 */
export const verifyEmail = async (uidb64, token) => {
  try {
    const response = await axios.get(`${API_BASE}/verify-email/${uidb64}/${token}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Verification failed' };
  }
};
