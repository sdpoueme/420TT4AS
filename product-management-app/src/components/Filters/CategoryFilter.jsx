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
