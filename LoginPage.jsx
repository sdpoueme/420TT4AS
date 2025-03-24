// LoginPage.js
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer l'URL vers laquelle rediriger après la connexion
  const from = location.state?.from || '/dashboard';
  
  const handleLogin = async (credentials) => {
    try {
      // Logique de connexion...
      
      // Après connexion réussie, rediriger vers la page demandée
      navigate(from, { replace: true });
      
    } catch (error) {
      // Gérer les erreurs...
    }
  };
  
  // Reste du composant...
}
