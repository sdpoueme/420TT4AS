// Fonction pour vérifier si un JWT est expiré
const isTokenExpired = (token) => {
  try {
    // Décoder le payload sans vérification de signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    // Comparer la date d'expiration avec l'heure actuelle
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    // En cas d'erreur de décodage, considérer le token comme expiré
    return true;
  }
};

// Vérifier et rafraîchir le token si nécessaire
const getValidToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    redirectToLogin();
    return null;
  }
  
  if (isTokenExpired(token)) {
    try {
      // Tenter de rafraîchir le token
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('https://api.example.com/auth/refresh', {
        refreshToken
      });
      
      const { newToken } = response.data;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      // Échec du rafraîchissement
      redirectToLogin();
      return null;
    }
  }
  
  return token;
};
