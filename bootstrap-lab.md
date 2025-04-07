# Laboratoire de personnalisation avec React et Bootstrap

## Contexte général
Ce laboratoire porte sur la personnalisation d'une application React de gestion de produits en utilisant CSS et Bootstrap. L'application contient plusieurs composants : une page de connexion, un formulaire d'ajout de produits et une table de produits.

## Objectif pédagogique
Maîtriser les techniques de personnalisation des composants React Bootstrap tout en conservant leur fonctionnalité et leur réactivité.

## Prérequis
- Connaissances de base en React, CSS et Bootstrap
- Node.js et npm installés
- Un éditeur de code (VS Code recommandé)
- L'application de gestion des produits React du cours

## Configuration initiale
1. Si nécessaire, créez une nouvelle application React :
   ```bash
   npx create-react-app gestion-produits
   cd gestion-produits
   ```

2. Installez les dépendances nécessaires :
   ```bash
   npm install react-bootstrap bootstrap react-router-dom
   ```

3. Configurez Bootstrap dans votre application en ajoutant l'import dans le fichier `src/index.js` :
   ```javascript
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

## Exercice 1 : Personnalisation de la page de connexion

### Objectif
Créer et personnaliser un composant de page de connexion React en modifiant le style par défaut de Bootstrap.

### Étapes à suivre

1. **Créer le composant Login** :
   - Créez un dossier `components` dans le dossier `src`
   - Dans ce dossier, créez un fichier `Login.jsx` :

```jsx
// src/components/Login.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ici vous ajouteriez la logique d'authentification
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="login-card">
            <Card.Header>
              <h3 className="text-center">Connexion</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom d'utilisateur</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    label="Se souvenir de moi"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Se connecter
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
```

2. **Créer un fichier CSS personnalisé** :
   - Dans le dossier `components`, créez un fichier `Login.css` :

```css
/* src/components/Login.css */
body {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  min-height: 100vh;
}

.login-card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem 0;
}

.card-header h3 {
  color: #5a5a5a;
  font-weight: 600;
}

.form-control {
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #ddd;
  transition: border-color 0.3s;
}

.form-control:focus {
  box-shadow: none;
  border-color: #a777e3;
}

.form-label {
  color: #5a5a5a;
  font-weight: 500;
}

.form-check-input:checked {
  background-color: #a777e3;
  border-color: #a777e3;
}

.btn-primary {
  background: linear-gradient(to right, #6e8efb, #a777e3);
  border: none;
  padding: 12px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(to right, #5a7cf0, #9866d3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
```

3. **Intégrer le composant dans l'application** :
   - Modifiez le fichier `App.js` pour intégrer le composant Login :

```jsx
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Autres routes seront ajoutées plus tard */}
      </Routes>
    </Router>
  );
}

export default App;
```

### Résultat attendu
Un composant de connexion React visuellement attrayant avec une cohérence des couleurs, des animations subtiles et une meilleure expérience utilisateur tout en conservant la fonctionnalité Bootstrap.

## Exercice 2 : Création d'un formulaire d'ajout de produits

### Objectif
Créer et personnaliser un composant de formulaire d'ajout de produits en utilisant React Bootstrap et CSS personnalisé.

### Étapes à suivre

1. **Créer le composant AddProduct** :
   - Dans le dossier `components`, créez un fichier `AddProduct.jsx` :

```jsx
// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    productCode: '',
    productPrice: '',
    productQuantity: '',
    productCategory: '',
    productDescription: '',
    productAvailable: false
  });

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product to add:', product);
    // Ici vous ajouteriez la logique pour sauvegarder le produit
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire ou naviguer vers une autre page
    setProduct({
      productName: '',
      productCode: '',
      productPrice: '',
      productQuantity: '',
      productCategory: '',
      productDescription: '',
      productAvailable: false
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Ajouter un nouveau produit</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nom du produit</Form.Label>
                  <Form.Control
                    type="text"
                    id="productName"
                    value={product.productName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Code produit</Form.Label>
                  <Form.Control
                    type="text"
                    id="productCode"
                    value={product.productCode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Prix (€)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    id="productPrice"
                    value={product.productPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Quantité en stock</Form.Label>
                  <Form.Control
                    type="number"
                    id="productQuantity"
                    value={product.productQuantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                id="productCategory"
                value={product.productCategory}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="electronics">Électronique</option>
                <option value="clothing">Vêtements</option>
                <option value="food">Alimentation</option>
                <option value="other">Autre</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="productDescription"
                value={product.productDescription}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="productAvailable"
                label="Disponible à la vente"
                checked={product.productAvailable}
                onChange={handleChange}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleCancel}>
                Annuler
              </Button>
              <Button variant="primary" type="submit">
                Ajouter le produit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
```

2. **Créer un fichier CSS personnalisé** :
   - Dans le dossier `components`, créez un fichier `AddProduct.css` :

```css
/* src/components/AddProduct.css */
:root {
  --primary-color: #4e73df;
  --secondary-color: #858796;
  --success-color: #1cc88a;
  --info-color: #36b9cc;
  --light-bg: #f8f9fc;
  --border-color: #e3e6f0;
}

body {
  background-color: var(--light-bg);
  font-family: 'Nunito', sans-serif;
}

h2 {
  color: var(--primary-color);
  font-weight: 700;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
  position: relative;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: var(--primary-color);
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.card-body {
  padding: 2rem;
}

.form-control, .form-select {
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 12px;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(78, 115, 223, 0.1);
}

.form-label {
  color: var(--secondary-color);
  font-weight: 600;
  margin-bottom: 8px;
}

.form-check-input:checked {
  background-color: var(--success-color);
  border-color: var(--success-color);
}

.form-check-label {
  font-weight: 500;
}

.btn {
  padding: 10px 24px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #3a5fc8;
  border-color: #3a5fc8;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(78, 115, 223, 0.2);
}

.btn-secondary {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.btn-secondary:hover {
  background-color: #717484;
  border-color: #717484;
}

.form-control:hover, .form-select:hover {
  border-color: #cbd0e0;
}

.form-check-input:hover {
  cursor: pointer;
}
```

3. **Mettre à jour le fichier App.js pour inclure le nouveau composant** :

```jsx
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        {/* Autres routes seront ajoutées plus tard */}
      </Routes>
    </Router>
  );
}

export default App;
```

### Résultat attendu
Un composant de formulaire d'ajout de produits React moderne, avec un style cohérent et des interactions utilisateur améliorées, tout en conservant la fonctionnalité responsive de React Bootstrap.

## Exercice 3 : Personnalisation de la table des produits

### Objectif
Améliorer visuellement un composant React de table des produits en utilisant CSS et React Bootstrap pour une meilleure présentation des données.

### Étapes à suivre

1. **Créer le composant ProductList** :
   - Dans le dossier `components`, créez un fichier `ProductList.jsx` :

```jsx
// src/components/ProductList.jsx
import React, { useState } from 'react';
import { Container, Card, Table, Badge, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données d'exemple pour la table
  const productsData = [
    {
      id: 1,
      name: 'Smartphone Galaxy S21',
      code: 'SGS21-BLK',
      category: 'Électronique',
      price: 799.99,
      stock: 24,
      status: 'Disponible'
    },
    {
      id: 2,
      name: 'T-shirt Col V',
      code: 'TS-CV-BLU-M',
      category: 'Vêtements',
      price: 19.99,
      stock: 50,
      status: 'Disponible'
    },
    {
      id: 3,
      name: 'Café Arabica Premium',
      code: 'CAF-ARA-250',
      category: 'Alimentation',
      price: 12.50,
      stock: 0,
      status: 'Rupture'
    },
    {
      id: 4,
      name: 'Écouteurs Bluetooth',
      code: 'EB-WIRELESS',
      category: 'Électronique',
      price: 49.99,
      stock: 15,
      status: 'Stock faible'
    },
    {
      id: 5,
      name: 'Veste en cuir',
      code: 'VL-NOIR-XL',
      category: 'Vêtements',
      price: 129.99,
      stock: 8,
      status: 'Disponible'
    }
  ];

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Disponible': return 'success';
      case 'Rupture': return 'danger';
      case 'Stock faible': return 'warning';
      default: return 'secondary';
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNew = () => {
    navigate('/add-product');
  };

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des produits</h2>
        <div className="d-flex">
          <InputGroup className="me-3 search-group">
            <Form.Control
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="outline-secondary">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
          <Button variant="primary" onClick={handleAddNew}>
            <i className="bi bi-plus-lg"></i> Nouveau
          </Button>
        </div>
      </div>
      
      <Card className="product-card">
        <Card.Body>
          <div className="table-responsive">
            <Table hover className="product-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom du produit</th>
                  <th>Code</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.code}</td>
                    <td>{product.category}</td>
                    <td>{product.price.toFixed(2)} €</td>
                    <td>{product.stock}</td>
                    <td>
                      <Badge bg={getBadgeVariant(product.status)} className={`status-badge status-${getBadgeVariant(product.status)}`}>
                        {product.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="info" size="sm" className="action-btn">
                        <i className="bi bi-eye"></i>
                      </Button>
                      <Button variant="warning" size="sm" className="action-btn">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button variant="danger" size="sm" className="action-btn">
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <Pagination className="justify-content-end">
              <Pagination.Prev disabled />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductList;
```

2. **Créer un fichier CSS personnalisé** :
   - Dans le dossier `components`, créez un fichier `ProductList.css` :

```css
/* src/components/ProductList.css */
:root {
  --primary-color: #4e73df;
  --light-blue: #f8f9fc;
  --border-color: #e3e6f0;
  --success-color: #1cc88a;
  --warning-color: #f6c23e;
  --danger-color: #e74a3b;
  --info-color: #36b9cc;
}

body {
  background-color: #f0f2f8;
  font-family: 'Nunito', sans-serif;
  color: #5a5c69;
}

h2 {
  color: #4e73df;
  font-weight: 700;
}

.search-group .form-control {
  border-right: none;
  border-radius: 8px 0 0 8px;
}

.search-group .btn-outline-secondary {
  border-left: none;
  border-radius: 0 8px 8px 0;
  color: #6e707e;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(78, 115, 223, 0.15);
}

.btn-primary:hover {
  background-color: #3a5fc8;
  border-color: #3a5fc8;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(78, 115, 223, 0.2);
}

.product-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.product-table {
  margin-bottom: 0;
}

.product-table thead {
  background-color: #f8f9fc;
}

.product-table thead th {
  border-bottom: 2px solid #e3e6f0;
  color: #6e707e;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  vertical-align: middle;
  padding: 1rem 0.75rem;
}

.product-table tbody td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
  border-color: #e3e6f0;
}

.status-badge {
  font-weight: 600;
  padding: 0.4em 0.8em;
  border-radius: 8px;
}

.status-success {
  background-color: rgba(28, 200, 138, 0.1) !important;
  color: var(--success-color) !important;
  border: 1px solid var(--success-color);
}

.status-danger {
  background-color: rgba(231, 74, 59, 0.1) !important;
  color: var(--danger-color) !important;
  border: 1px solid var(--danger-color);
}

.status-warning {
  background-color: rgba(246, 194, 62, 0.1) !important;
  color: var(--warning-color) !important;
  border: 1px solid var(--warning-color);
}

.action-btn {
  border-radius: 6px;
  margin-right: 5px;
  padding: 0.4rem 0.6rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-info {
  background-color: var(--info-color);
  border-color: var(--info-color);
  color: white;
}

.btn-warning {
  background-color: var(--warning-color);
  border-color: var(--warning-color);
  color: white;
}

.btn-danger {
  background-color: var(--danger-color);
  border-color: var(--danger-color);
}

.pagination {
  margin-top: 20px;
  margin-bottom: 0;
}

.page-item.active .page-link {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.page-link {
  color: var(--primary-color);
  border-radius: 5px;
  margin: 0 3px;
}

.page-link:hover {
  color: var(--primary-color);
  background-color: rgba(78, 115, 223, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.product-table tbody tr {
  animation: fadeIn 0.3s ease;
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
  }
  
  .search-group {
    margin-bottom: 15px;
    width: 100%;
  }
  
  .btn-primary {
    width: 100%;
  }
  
  .table-responsive {
    font-size: 0.9rem;
  }
}
```

3. **Installer Bootstrap Icons** :
   - Vous pouvez installer les Bootstrap Icons avec npm ou les inclure via CDN dans votre fichier public/index.html :

```bash
npm install bootstrap-icons
```

Puis importez-les dans votre fichier `index.js` :

```javascript
// src/index.js
import 'bootstrap-icons/font/bootstrap-icons.css';
```

4. **Mettre à jour le fichier App.js pour inclure le nouveau composant** :

```jsx
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Résultat attendu
Un composant React de liste de produits moderne, avec une mise en page professionnelle, des statuts clairement différenciés par couleur, des actions facilement accessibles et une expérience utilisateur améliorée, tout en conservant la fonctionnalité responsive de React Bootstrap.

## Évaluation

Chaque exercice sera évalué selon les critères suivants :

1. **Respect des consignes** (30%) :
   - Utilisation correcte de React et React Bootstrap
   - Implémentation de toutes les fonctionnalités demandées

2. **Qualité du code** (30%) :
   - Organisation et structure des composants React
   - Utilisation appropriée des hooks React
   - Respect des bonnes pratiques
   - Commentaires et lisibilité

3. **Esthétique et ergonomie** (30%) :
   - Cohérence visuelle
   - Expérience utilisateur
   - Responsivité sur différents appareils

4. **Créativité et originalité** (10%) :
   - Ajout de fonctionnalités ou d'améliorations visuelles supplémentaires
   - Utilisation créative des animations et transitions

## Astuce de développement

Pour tester rapidement vos composants, vous pouvez modifier le fichier App.js pour afficher directement le composant sur lequel vous travaillez :

```jsx
import React from 'react';
import Login from './components/Login';
// import AddProduct from './components/AddProduct';
// import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <Login />
      {/* <AddProduct /> */}
      {/* <ProductList /> */}
    </div>
  );
}

export default App;
```
