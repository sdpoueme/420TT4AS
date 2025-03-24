function useRoleBasedRedirect() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Fonction pour rediriger en fonction du rôle
  const redirectToRoleDashboard = () => {
    if (!user) return;
    
    switch (user.role) {
      case 'admin':
        navigate('/admin/dashboard', { replace: true });
        break;
      case 'manager':
        navigate('/manager/dashboard', { replace: true });
        break;
      case 'customer':
        navigate('/customer/dashboard', { replace: true });
        break;
      default:
        navigate('/dashboard', { replace: true });
    }
  };
  
  return redirectToRoleDashboard;
}

// Utilisation dans le composant de connexion
function LoginPage() {
  const { login } = useContext(AuthContext);
  const redirectToRoleDashboard = useRoleBasedRedirect();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      
      // Rediriger vers le tableau de bord approprié selon le rôle
      redirectToRoleDashboard();
      
    } catch (error) {
      // Gérer les erreurs...
    }
  };
  
  // Reste du composant...
}
