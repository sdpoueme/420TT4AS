import { useState } from 'react';
import axios from 'axios';

function UserManagementForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur de ce champ lorsqu'il est modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    // Validation du nom d'utilisateur
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (formData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }
    
    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    // Validation de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('https://api.example.com/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      setSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      if (error.response && error.response.data) {
        // Erreurs provenant du serveur
        setErrors({
          ...errors,
          server: error.response.data.message || "Une erreur s'est produite"
        });
      } else {
        setErrors({
          ...errors,
          server: "Impossible de se connecter au serveur"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Afficher un message de succès ou le formulaire
  if (success) {
    return (
      <div className="success-container">
        <h2>Inscription réussie!</h2>
        <p>Vous pouvez maintenant vous connecter avec vos identifiants.</p>
        <button onClick={() => setSuccess(false)}>Retour</button>
      </div>
    );
  }
  
  return (
    <div className="register-container">
      <h2>Inscription</h2>
      
      {errors.server && (
        <div className="error-message">{errors.server}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && <div className="error-text">{errors.username}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
