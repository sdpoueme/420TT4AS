// src/components/Filters/SearchBar.jsx
import React from 'react';

const SearchBar = ({ value, onChange }) => {
  const handleChange = (e) => {
    // Pass the string value directly
    onChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        // Ensure value is a string
        value={value || ''}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
