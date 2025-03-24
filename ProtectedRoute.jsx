import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const location = useLocation();
  
  if (loading) {
    return <div className="loading">Vérification de l'authentification...</div>;
  }
  
  if (!isAuthenticated) {
    // Rediriger vers la page de connexion en mémorisant l'URL demandée
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Si des rôles sont requis, vérifier que l'utilisateur a le rôle approprié
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      // Rediriger vers une page d'accès refusé
      return <Navigate to="/unauthorized" replace />;
    }
  }
  
  // L'utilisateur est authentifié et a les permissions requises
  return children;
}
