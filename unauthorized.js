// Composant pour la page d'accès non autorisé
function Unauthorized() {
  const navigate = useNavigate();
  
  return (
    <div className="unauthorized-page">
      <h1>Accès non autorisé</h1>
      <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      
      <div className="actions">
        <button onClick={() => navigate(-1)}>Retour</button>
        <button onClick={() => navigate('/')}>Accueil</button>
      </div>
    </div>
  );
}
