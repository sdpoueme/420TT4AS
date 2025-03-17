import './App.css';
import React, { useState, useEffect } from 'react';
import { useFilters } from './components/hooks/useFilter';
import { useSorting } from './components/hooks/useSorting';
import SearchBar from './components/Filters/SearchBar';
import CategoryFilter from './components/Filters/CategoryFilter';
import PriceFilter from './components/Filters/PriceFilter';
import ProductList from './components/Products/ProductList';
import ProductForm from './components/Forms/ProductForm';
import SortControls from './components/Sorting/SortControls';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data); // Fix: access response.data instead of response
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

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
