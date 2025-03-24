import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Affiche le contenu seulement si l'utilisateur a le rôle requis
function RoleRequired({ roles, children }) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) return <div>Chargement...</div>;
  
  if (!isAuthenticated || !user) return null;
  
  // Vérifier si l'utilisateur a au moins un des rôles requis
  const hasRequiredRole = Array.isArray(roles)
    ? roles.some(role => user.role === role)
    : user.role === roles;
  
  return hasRequiredRole ? children : null;
}

// Exemple d'utilisation
function AdminDashboard() {
  return (
    <div>
      <h2>Tableau de bord d'administration</h2>
      
      {/* Navigation commune à tous les utilisateurs */}
      <nav>
        <ul>
          <li><a href="/dashboard">Accueil</a></li>
          <li><a href="/profile">Profil</a></li>
          
          {/* Élément visible uniquement aux administrateurs */}
          <RoleRequired roles="admin">
            <li><a href="/admin/users">Gestion des utilisateurs</a></li>
          </RoleRequired>
          
          {/* Élément visible aux administrateurs et modérateurs */}
          <RoleRequired roles={["admin", "moderator"]}>
            <li><a href="/admin/content">Gestion du contenu</a></li>
          </RoleRequired>
        </ul>
      </nav>
      
      {/* Contenu principal */}
    </div>
  );
}
