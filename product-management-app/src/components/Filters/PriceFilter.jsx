// src/components/Filters/PriceFilter.jsx
import React, { useState } from 'react';

const PriceFilter = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000
  });

  const handleChange = (type) => (event) => {
    const value = parseInt(event.target.value) || 0;
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onChange && onChange(newRange);
  };

  return (
    <div className="price-filter">
      <h3>Price Range</h3>
      <div className="price-inputs">
        <div>
          <label htmlFor="min-price">Min Price:</label>
          <input
            type="number"
            id="min-price"
            value={priceRange.min}
            onChange={handleChange('min')}
            min="0"
          />
        </div>
        <div>
          <label htmlFor="max-price">Max Price:</label>
          <input
            type="number"
            id="max-price"
            value={priceRange.max}
            onChange={handleChange('max')}
            min={priceRange.min}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
