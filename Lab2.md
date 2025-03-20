# Laboratoire Pratique - Application de Gestion de Produits

## Objectif
Créer une application React intégrant le filtrage, l'ordonnancement et les formulaires pour gérer un catalogue de produits.

<img width="669" alt="image" src="https://github.com/user-attachments/assets/7155b3dd-2479-4867-8376-626dcbf6bd08" />


## Mise en place (30 minutes)

### 1. Création du projet
Le code ci-dessous crée une application React. Ensuite nous installons des librairies qui sont nécessaires: 
```bash
npx create-react-app product-management
cd product-management
npm install @heroicons/react classnames
```

### 2. Structure des fichiers
Créer la structure de fichiers ci-dessous. Les composantes vont dans le répertoire `components` et sont classées par type, notamment les Filters, Sorting, Products, Forms, Hooks et Data. 
```
src/
  components/
    Filters/
      SearchBar.jsx
      CategoryFilter.jsx
      PriceFilter.jsx
    Sorting/
      SortControls.jsx
    Products/
      ProductList.jsx
      ProductCard.jsx
    Forms/
      ProductForm.jsx
    hooks/
      useFilters.js
      useSorting.js
      useForm.js
    data/
      products.js
```

### 3. Données de test
```javascript
/a constant list of products  

export const products = [
    {
      id: 1,
      name: "Laptop Pro",
      category: "Electronics",
      price: 1299.99,
      stock: 10,
      rating: 4.5
    },
    // Add 15-20 similar products to the list
    {
      id: 2,
      name: "Smartphone X",
      category: "Electronics",
      price: 799.99,
      stock: 20,
      rating: 4.2
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Sports",
      price: 89.99,
      stock: 30,
      rating: 4.0
    },
    {
      id: 4,
      name: "Coffee Maker",
      category: "Home Appliances",
      price: 49.99,
      stock: 15,
      rating: 4.8
    },
    {
      id: 5,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      stock: 25,
      rating: 4.6
    },
    {
      id: 6,
      name: "Fitness Tracker",
      category: "Sports",
      price: 79.99,
      stock: 40,
      rating: 4.3
    },
    {
      id: 7,
      name: "Blender",
      category: "Home Appliances",
      price: 39.99,
      stock: 18,
      rating: 4.7
    },
    {
      id: 8,
      name: "External Hard Drive",
      category: "Electronics",
      price: 89.99,
      stock: 22,
      rating: 4.4
    },
    {
      id: 9,
      name: "Yoga Mat",
      category: "Sports",
      price: 24.99,
      stock: 35,
      rating: 4.1
    },
    {
      id: 10,
      name: "Toaster",
      category: "Home Appliances",
      price: 29.99,
      stock: 12,
      rating: 4.9
    },
    {
      id: 11,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 59.99,
      stock: 28,
      rating: 4.5
    },
    {
      id: 12,
      name: "Tennis Racket",
      category: "Sports",
      price: 19.99,
      stock: 50,
      rating: 4.2
    },
    {
      id: 13,
      name: "Microwave Oven",
      category: "Home Appliances",
      price: 69.99,
      stock: 14,
      rating: 4.8
    },
    {
      id: 14,
      name: "Gaming Console",
      category: "Electronics",
      price: 399.99,
      stock: 8,
      rating: 4.6
    },
    {
      id: 15,
      name: "Basketball",
      category: "Sports",
      price: 29.99,
      stock: 45,
      rating: 4.3
    },
    {
      id: 16,
      name: "Rice Cooker",
      category: "Home Appliances",
      price: 49.99,
      stock: 20,
      rating: 4.7
    },
    {
      id: 17,
      name: "Digital Camera",
      category: "Electronics",
      price: 599.99,
      stock: 6,
      rating: 4.4
    },
    {
      id: 18,
      name: "Golf Clubs",
      category: "Sports",
      price: 299.99,
      stock: 10,
      rating: 4.1
    },
    {
      id: 19,
      name: "Juicer",
      category: "Home Appliances",
      price: 39.99,
      stock: 25,
      rating: 4.9
    },
    {
      id: 20,
      name: "Portable Charger",
      category: "Electronics",
      price: 29.99,
      stock: 30,
      rating: 4.5
    }
     
  ];
```

## Partie 1 - Système de Filtrage (1 heure)

### Exercice 1.1 - Hook personnalisé pour les filtres
```jsx
// src/hooks/useFilters.js
import { useState, useMemo } from 'react';

export const useFilters = (data = []) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    price: { min: 0, max: 1000 }
  });

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Convert search term to string and lowercase
      const searchTerm = String(filters.search || '').toLowerCase();
      
      // Safely convert item values to strings before calling toLowerCase
      const itemName = String(item?.name || '').toLowerCase();
      const itemDescription = String(item?.description || '').toLowerCase();
      const itemCategory = String(item?.category || '').toLowerCase();

      // Search matching
      const matchesSearch = 
        itemName.includes(searchTerm) || 
        itemDescription.includes(searchTerm);

      // Category matching
      const matchesCategory = 
        filters.category === 'All' || 
        itemCategory === filters.category.toLowerCase();

      // Price matching with safety checks
      const itemPrice = Number(item?.price) || 0;
      const minPrice = Number(filters.price?.min) || 0;
      const maxPrice = Number(filters.price?.max) || Infinity;
      
      const matchesPrice = 
        itemPrice >= minPrice && 
        itemPrice <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [data, filters]);

  return { filters, setFilters, filteredData };
};
```

### Exercice 1.2 - Composants de filtrage
```jsx
// src/components/Filters/SearchBar.jsx
const SearchBar = ({ value, onChange }) => {
    // Implémenter la barre de recherche avec debounce
    return (
      <input
        type="text"
        placeholder="Rechercher..."
        value={value}
        onChange={onChange}
      />
    );

  };

  export default SearchBar;
```
 
```jsx
import React from 'react';

const CategoryFilter = () => {
  const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    // Add more categories as needed
  ];

  return (
    <div className="category-filter">
      <label htmlFor="category">Category:</label>
      <select 
        id="category" 
        name="category"
        onChange={(e) => console.log(e.target.value)}
        defaultValue="All"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
```

```jsx
// src/components/Filters/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ selectedCategory, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const categories = [
    'All',
    'Electronics',
    'Books',
    'Clothing',
    'Home & Garden'
  ];

  return (
    <div className="category-filter">
      <select 
        value={selectedCategory || 'All'}
        onChange={handleChange}
        className="category-select"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
```

## Partie 2 - Système de Tri (1 heure)

Ici nous rajoutons les fonctionnalités pour le tri de la table. 

### Exercice 2.1 - Hook de tri
```jsx
// src/hooks/useSorting.js
import { useState, useMemo } from 'react';

export const useSorting = (data) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  return {
    sortConfig,
    setSortConfig,
    sortedData
  };
};
```

### Exercice 2.2 - Contrôles de tri
```jsx
// src/components/Sorting/SortControls.jsx
const SortControls = ({ sortConfig, onSort }) => {
    // Implémenter les contrôles de tri
    return (
      <div>
        <button onClick={() => onSort('name')}>Trier par nom</button>
        <button onClick={() => onSort('price')}>Trier par prix</button>
        <button onClick={() => onSort('category')}>Trier par catégorie</button>
      </div>
    );
  };

  export default SortControls;
```

## Partie 3 - Formulaire de Produit (1 heure)

### Exercice 3.1 - Hook de formulaire
```jsx
// src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validation à la saisie
    if (touched[name]) {
      const fieldErrors = validate({ 
        ...values, 
        [name]: value 
      });
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name]
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validation au blur
    const fieldErrors = validate(values);
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name]
    }));
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  };
};
```

### Exercice 3.2 - Formulaire de produit
```jsx
// src/components/Forms/ProductForm.jsx
import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new product object
    const newProduct = {
      id: Date.now(), // Simple way to generate unique id
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrl
    };

    // Call the onSubmit prop with the new product
    onSubmit(newProduct);

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: ''
    });
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Garden">Home & Garden</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

```

## Partie 4 - Intégration (30 minutes)
Avant de faire cette partie, rajoutez le component ProductList qui va lire la liste de produits dans products.js pour l'afficher dans la page:

```jsx
//Liste de produits affichés dans une table HTML

import React from 'react';

const ProductList = ({ products }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.rating}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
    
export default ProductList;
```

Esuite on intègre toutes nos fonctions dans le fichier App.js

### Exercice 4.1 - Application principale
```jsx
import './App.css';
import React, { useState } from 'react';
import { products } from './components/data/products';
import { useFilters } from './components/hooks/useFilter';
import { useSorting } from './components/hooks/useSorting';
import SearchBar from './components/Filters/SearchBar';
import CategoryFilter from './components/Filters/CategoryFilter';
import PriceFilter from './components/Filters/PriceFilter';
import ProductList from './components/Products/ProductList';
import ProductForm from './components/Forms/ProductForm';
import SortControls from './components/Sorting/SortControls';

function App() {
  // Initialize with empty array if no initial products

  const { filters, setFilters, filteredData } = useFilters(products);


  return (
    <div className="app-container" style={{ padding: '20px' }}>
      <div className="filters-container">
        <SearchBar 
          value={filters.search || ''}
          onChange={(value) => setFilters(prev => ({
            ...prev,
            search: String(value)
          }))}
        />
        <CategoryFilter 
          selectedCategory={filters.category}
          onChange={(category) => setFilters(prev => ({
            ...prev,
            category: String(category)
          }))}
        />
        <PriceFilter 
          onChange={(priceRange) => setFilters(prev => ({
            ...prev,
            price: {
              min: Number(priceRange.min) || 0,
              max: Number(priceRange.max) || Infinity
            }
          }))}
        />
      </div>

      <ProductList products={filteredData} />

    </div>
  );
}


export default App;
```
