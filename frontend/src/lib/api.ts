/**
 * API client for Honoured Consult backend
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return response.data;
  },
};

// Consultations API
export const consultationsAPI = {
  create: async (data: any) => {
    const response = await api.post('/consultations', data);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/consultations');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/consultations/${id}`);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await api.patch(`/consultations/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/consultations/${id}`);
    return response.data;
  },
};

// Notifications API
export const notificationsAPI = {
  getSettings: async () => {
    const response = await api.get('/notifications/settings');
    return response.data;
  },
  
  updateSettings: async (settings: any) => {
    const response = await api.put('/notifications/settings', settings);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await api.post('/notifications', data);
    return response.data;
  },
  
  getHistory: async () => {
    const response = await api.get('/notifications/history');
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};

// Searches API
export const searchesAPI = {
  create: async (query: string, filters?: any) => {
    const response = await api.post('/searches', { query, filters });
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/searches');
    return response.data;
  },
  
  getAnalytics: async () => {
    const response = await api.get('/searches/analytics');
    return response.data;
  },
};

export default api;
