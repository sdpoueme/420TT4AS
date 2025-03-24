// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com'
});

// Fonction pour rediriger vers la page de connexion
const redirectToLogin = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

// Ajouter un intercepteur pour les réponses
api.interceptors.response.use(
  response => response,
  error => {
    // Gérer les erreurs 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      redirectToLogin();
    }
    
    return Promise.reject(error);
  }
);

// Ajouter le token d'authentification à chaque requête
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

export default api;
