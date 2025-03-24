// AuthRoutes.jsx - Redirection pour utilisateurs déjà connectés
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AuthRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  // Si l'utilisateur est déjà authentifié, le rediriger vers le dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // L'utilisateur n'est pas authentifié, afficher les composants enfants
  return children;
}

// Utilisation dans les routes
<Route 
  path="/login" 
  element={
    <AuthRoute>
      <Login />
    </AuthRoute>
  } 
/>

<Route 
  path="/register" 
  element={
    <AuthRoute>
      <Register />
    </AuthRoute>
  } 
/>
