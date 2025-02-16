# Laboratoire Pratique - Application de Gestion de Produits

## Objectif
Créer une application React intégrant le filtrage, l'ordonnancement et les formulaires pour gérer un catalogue de produits.

## Mise en place (30 minutes)

### 1. Création du projet
```bash
npx create-react-app product-management
cd product-management
npm install @heroicons/react classnames
```

### 2. Structure des fichiers
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
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299.99,
    stock: 10,
    rating: 4.5
  },
  // Ajouter 15-20 produits similaires
];
```

## Partie 1 - Système de Filtrage (1 heure)

### Exercice 1.1 - Hook personnalisé pour les filtres
```jsx
// src/hooks/useFilters.js
import { useState, useMemo } from 'react';

export const useFilters = (initialData) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    inStock: false
  });

  const filteredData = useMemo(() => {
    return initialData.filter(item => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || 
        item.category === filters.category;
      
      const matchesPrice = item.price >= filters.minPrice && 
        item.price <= filters.maxPrice;
      
      const matchesStock = !filters.inStock || item.stock > 0;
      
      return matchesSearch && matchesCategory && 
             matchesPrice && matchesStock;
    });
  }, [initialData, filters]);

  return {
    filters,
    setFilters,
    filteredData
  };
};
```

### Exercice 1.2 - Composants de filtrage
```jsx
// src/components/Filters/SearchBar.jsx
const SearchBar = ({ value, onChange }) => {
  // Implémenter la barre de recherche avec debounce
};

// src/components/Filters/CategoryFilter.jsx 
const CategoryFilter = ({ selected, options, onChange }) => {
  // Implémenter le filtre de catégories
};

// src/components/Filters/PriceFilter.jsx
const PriceFilter = ({ range, onChange }) => {
  // Implémenter le filtre de prix
};
```

## Partie 2 - Système de Tri (1 heure)

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
};
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
const ProductForm = ({ onSubmit, initialValues = {} }) => {
  const validate = (values) => {
    const errors = {};
    
    if (!values.name) {
      errors.name = 'Le nom est requis';
    }
    
    if (!values.price || values.price <= 0) {
      errors.price = 'Le prix doit être supérieur à 0';
    }
    
    if (!values.category) {
      errors.category = 'La catégorie est requise';
    }
    
    return errors;
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  } = useForm({
    name: '',
    price: '',
    category: '',
    ...initialValues
  }, validate);

  // Implémenter le formulaire
};
```

## Partie 4 - Intégration (30 minutes)

### Exercice 4.1 - Application principale
```jsx
// src/App.jsx
import { useState } from 'react';
import { products } from './data/products';
import { useFilters } from './hooks/useFilters';
import { useSorting } from './hooks/useSorting';

const App = () => {
  const [productData, setProductData] = useState(products);
  const { filters, setFilters, filteredData } = useFilters(productData);
  const { sortConfig, setSortConfig, sortedData } = useSorting(filteredData);

  const handleAddProduct = (newProduct) => {
    setProductData(prev => [...prev, newProduct]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Gestion des Produits</h1>
      
      {/* Filtres */}
      <div className="filters-section">
        <SearchBar 
          value={filters.search}
          onChange={(value) => setFilters(prev => ({
            ...prev,
            search: value
          }))}
        />
        <CategoryFilter />
        <PriceFilter />
      </div>

      {/* Tri */}
      <SortControls 
        sortConfig={sortConfig}
        onSort={setSortConfig}
      />

      {/* Liste des produits */}
      <ProductList products={sortedData} />

      {/* Formulaire */}
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};
```
