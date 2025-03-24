function DynamicMenu() {
  const { user } = useContext(AuthContext);
  
  // Définition des items de menu avec des vérifications de permissions
  const menuItems = [
    {
      label: 'Accueil',
      path: '/dashboard',
      permissions: [] // Accessible à tous les utilisateurs authentifiés
    },
    {
      label: 'Profil',
      path: '/profile',
      permissions: [] // Accessible à tous les utilisateurs authentifiés
    },
    {
      label: 'Produits',
      path: '/products',
      permissions: ['view_products']
    },
    {
      label: 'Gestion des utilisateurs',
      path: '/admin/users',
      permissions: ['manage_users']
    },
    {
      label: 'Paramètres système',
      path: '/admin/settings',
      permissions: ['admin']
    }
  ];
  
  // Fonction pour vérifier si l'utilisateur a la permission requise
  const hasPermission = (requiredPermissions) => {
    if (!user || !user.permissions) return false;
    if (requiredPermissions.length === 0) return true;
    
    return requiredPermissions.some(permission => 
      user.permissions.includes(permission)
    );
  };
  
  return (
    <nav className="main-menu">
      <ul>
        {menuItems.map((item, index) => (
          hasPermission(item.permissions) && (
            <li key={index}>
              <a href={item.path}>{item.label}</a>
            </li>
          )
        ))}
      </ul>
    </nav>
  );
}
