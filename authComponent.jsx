import { useState, useEffect } from 'react';
import { userService } from '../services/api';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userService.getCurrentUser();
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement du profil: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  const handleUpdateProfile = async (updatedData) => {
    try {
      setIsLoading(true);
      const response = await userService.updateProfile(updatedData);
      setProfile(response.data);
      setError(null);
      return true;
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil: ' + err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !profile) {
    return <div>Chargement du profil...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  return (
    <div className="profile-container">
      <h2>Profil utilisateur</h2>
      
      {profile && (
        <div className="profile-info">
          <p><strong>Nom:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Rôle:</strong> {profile.role}</p>
          
          {/* Formulaire de mise à jour du profil */}
          {/* ... */}
        </div>
      )}
    </div>
  );
}
