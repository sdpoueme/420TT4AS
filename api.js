// services/api.js
import axios from 'axios';

// Créer une instance Axios avec la configuration de base
const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajouter le token JWT à chaque requête
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

// API service avec méthodes CRUD
export const userService = {
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  changePassword: (data) => api.post('/users/me/change-password', data)
};

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

export default api;
