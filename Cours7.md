# Routage et Intégration HTTP dans REACT

---

# PARTIE 1 : ROUTAGE

## Introduction au Routage

### Qu'est-ce que le routage dans une application React ?

Le routage permet de créer une application web à plusieurs pages sans recharger la page entière.

**Pourquoi utiliser le routage ?**
- Navigation fluide entre les différentes sections de l'application
- Structure d'URL organisée et intuitive
- Amélioration de l'expérience utilisateur

**React Router** est la bibliothèque de routage la plus populaire pour React.

---

## Installation de React Router

### Installation via npm

```bash
npm install react-router-dom
```

### Versions importantes
- React Router v6 (la plus récente) - syntaxe modernisée
- React Router v5 - encore largement utilisée

### Structure d'un projet avec routage
```
src/
  ├── components/
  │     ├── Home.js
  │     ├── About.js
  │     └── ...
  ├── App.js         // Configuration du routage principal
  └── index.js       // Point d'entrée
```

---

## Ajout du Routage

### Configuration de base (React Router v6)

```jsx
// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      {/* BrowserRouter enveloppe toute la logique de routage */}
      <Routes>
        {/* Routes définis les différentes routes disponibles */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Points importants
- `BrowserRouter` : Conteneur principal qui utilise l'API History du navigateur
- `Routes` : Groupe toutes les routes et affiche la première correspondante
- `Route` : Définit une route individuelle avec son chemin et son composant

---

## NavLink et Link

### Composant Link

Pour naviguer entre les pages sans rechargement :

```jsx
// Navigation.js
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/about">À propos</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
```

### Composant NavLink
Extension de Link avec des fonctionnalités supplémentaires :

```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/about"
  className={({ isActive }) => isActive ? "active-link" : ""}
>
  À propos
</NavLink>
```

**Note** : Dans React Router v6, `Switch` a été remplacé par `Routes`.

---

## Propriétés des Routes

### Attributs principaux des routes

```jsx
<Routes>
  {/* Route de base */}
  <Route path="/" element={<Home />} />
  
  {/* Route avec chemin exact */}
  <Route path="/blog" element={<Blog />} />
  
  {/* Route par défaut/404 (*: wildcard) */}
  <Route path="*" element={<NotFound />} />
  
  {/* Route avec layout partagé */}
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>
```

### Propriétés importantes
- `path` : Définit l'URL de la route
- `element` : Composant React à afficher
- `index` : Route par défaut dans une route parente

---

## Passage des Propriétés

### Transmettre des données aux composants routés

```jsx
// Méthode 1 : Via les props directement
<Route path="/dashboard" element={<Dashboard user={currentUser} />} />

// Méthode 2 : Avec un wrapper
<Route 
  path="/dashboard" 
  element={
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  } 
/>

// Méthode 3 : Utiliser un composant personnalisé
function DashboardRoute() {
  const data = useContext(DataContext);
  return <Dashboard data={data} />;
}

<Route path="/dashboard" element={<DashboardRoute />} />
```

### Contexte React
Particulièrement utile pour éviter de passer des props à travers de nombreux composants :

```jsx
// Créer et utiliser un contexte pour passer des données
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          {/* Les composants dans Routes auront accès au contexte */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
```

---

## Paramètres Requis et Optionnels des Routes

### Paramètres de route dynamiques

```jsx
// Route avec paramètre obligatoire
<Route path="/users/:userId" element={<UserProfile />} />

// Composant qui accède au paramètre
import { useParams } from 'react-router-dom';

function UserProfile() {
  // Récupération du paramètre de l'URL
  const { userId } = useParams();
  
  return <div>Profil de l'utilisateur: {userId}</div>;
}
```

### Paramètres optionnels (React Router v6)

```jsx
// Paramètre optionnel avec routes imbriquées
<Route path="products">
  <Route index element={<ProductList />} />
  <Route path=":productId" element={<ProductDetail />} />
</Route>

// On peut aussi utiliser un joker pour rendre un segment optionnel
<Route path="blog/:postId?/*" element={<BlogPost />} />
```

### Utilisation pratique
- Affichage de détails d'un élément spécifique
- Filtrage de listes d'éléments
- Création d'URLs SEO-friendly

---

## Paramètres de Requête

### Utilisation des paramètres de requête (query string)

```jsx
// URL exemple: /search?category=electronics&sort=price
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Récupérer les valeurs
  const category = searchParams.get('category'); // 'electronics'
  const sort = searchParams.get('sort');         // 'price'
  
  // Mettre à jour les paramètres de recherche
  function updateSort(newSort) {
    setSearchParams({ 
      category: category, 
      sort: newSort 
    });
  }
  
  return (
    <div>
      <h2>Résultats pour {category}</h2>
      <select 
        value={sort} 
        onChange={(e) => updateSort(e.target.value)}
      >
        <option value="price">Prix</option>
        <option value="name">Nom</option>
      </select>
      {/* Affichage des résultats */}
    </div>
  );
}
```

### Cas d'utilisation
- Filtres et tri sur des listes
- État de recherche persistant dans l'URL
- Partage de vues filtrées via URL

---

## Redirections

### Types de redirections dans React Router

```jsx
// 1. Redirection déclarative avec l'élément <Navigate>
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // Redirection avec possibilité de remplacement dans l'historique
    return <Navigate to="/login" replace />;
  }
  return children;
}

// 2. Redirection conditionnelle dans une route
<Route 
  path="/pricing" 
  element={
    isPremium ? <PricingPage /> : <Navigate to="/upgrade" />
  } 
/>

// 3. Redirection automatique
<Route path="/old-page" element={<Navigate to="/new-page" />} />
```

### Redirection avec état
```jsx
// Passer des données durant la redirection
<Navigate 
  to="/login" 
  state={{ from: '/dashboard', message: 'Veuillez vous connecter' }}
/>

// Récupérer l'état dans le composant cible
function Login() {
  const location = useLocation();
  const from = location.state?.from || '/';
  const message = location.state?.message;
  
  return (
    <div>
      {message && <p>{message}</p>}
      {/* Formulaire de connexion */}
    </div>
  );
}
```

---

## Navigation Programmatique

### Navigation via le hook useNavigate

```jsx
import { useNavigate } from 'react-router-dom';

function ProductDetail({ product }) {
  const navigate = useNavigate();
  
  function handleDelete() {
    deleteProduct(product.id)
      .then(() => {
        // Navigation après action réussie
        navigate('/products', { 
          replace: true,
          state: { message: 'Produit supprimé avec succès' }
        });
      });
  }
  
  function goBack() {
    // Retour à la page précédente
    navigate(-1);
  }
  
  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={handleDelete}>Supprimer</button>
      <button onClick={goBack}>Retour</button>
    </div>
  );
}
```

### Options de navigation
- `navigate('/route')` - Navigation simple vers une route
- `navigate(-1)` ou `navigate(1)` - Navigation dans l'historique
- `navigate('/route', { replace: true })` - Remplacer l'entrée dans l'historique
- `navigate('/route', { state: {...} })` - Navigation avec données d'état

---

## Routages Imbriqués

### Structure de routage hiérarchique

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Route index pour "/" */}
          <Route index element={<Home />} />
          
          {/* Routes imbriquées pour "/dashboard/*" */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Routes imbriquées pour "/products/*" */}
          <Route path="products" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="add" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Composant Layout avec outlet pour les routes enfants
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <nav>{/* Navigation commune */}</nav>
      </header>
      <main>
        {/* Ici seront rendus les composants des routes enfants */}
        <Outlet />
      </main>
      <footer>{/* Footer commun */}</footer>
    </div>
  );
}
```

### Avantages des routes imbriquées
- Partage de mise en page commune (layouts)
- Organisation hiérarchique des routes
- Gestion simplifiée des sections d'application complexes

---

## Exercices Pratiques - Routage

### Exercice 1 : Configuration de base
Créez une application React avec les routes suivantes :
- Accueil (`/`)
- Liste des produits (`/products`)
- Détail d'un produit (`/products/:id`)
- Page de contact (`/contact`)
- Page 404 pour les routes inexistantes

### Exercice 2 : Navigation et redirections
Ajoutez une barre de navigation avec des liens vers toutes les routes.
Créez une page "ancienne" qui redirige automatiquement vers une page "nouvelle".

### Exercice 3 : Routes protégées
Créez un système de routes protégées :
- Page de connexion (`/login`)
- Tableau de bord (`/dashboard`) accessible uniquement si connecté
- Redirection vers login si non connecté avec retour au dashboard après connexion

### Exercice 4 : Routage imbriqué
Implémentez une structure de dashboard avec sous-routes :
- Vue d'ensemble (`/dashboard`)
- Profil (`/dashboard/profile`)
- Paramètres (`/dashboard/settings`)
Toutes avec une mise en page commune.
