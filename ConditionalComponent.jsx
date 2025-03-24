import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Affiche le contenu seulement si l'utilisateur est authentifié
function AuthenticatedOnly({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) return <div>Chargement...</div>;
  
  return isAuthenticated ? children : null;
}

// Affiche le contenu seulement si l'utilisateur n'est PAS authentifié
function UnauthenticatedOnly({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) return <div>Chargement...</div>;
  
  return !isAuthenticated ? children : null;
}
