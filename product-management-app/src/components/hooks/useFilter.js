// src/hooks/useFilters.js
import { useState, useMemo } from 'react';

export const useFilters = (initialData = []) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    price: { min: 0, max: 1000 }
  });

  const filteredData = useMemo(() => {
    console.log('Initial data:', initialData); // Debug log
    console.log('Current filters:', filters); // Debug log

    if (!Array.isArray(initialData)) {
      console.warn('Data is not an array:', initialData);
      return [];
    }

    const filtered = initialData.filter(item => {
      if (!item) return false;

      // Debug logs
      console.log('Processing item:', item);
      
      const searchTerm = (filters.search || '').toLowerCase();
      const itemName = (item.name || '').toLowerCase();
      
      const matchesSearch = !filters.search || itemName.includes(searchTerm);
      const matchesCategory = !filters.category || filters.category === 'All' || item.category === filters.category;
      const matchesPrice = (!filters.price.min || item.price >= filters.price.min) && 
                         (!filters.price.max || item.price <= filters.price.max);

      // Debug log for matching conditions
      console.log('Match results for', item.name, ':', {
        matchesSearch,
        matchesCategory,
        matchesPrice
      });

      return matchesSearch && matchesCategory && matchesPrice;
    });

    console.log('Filtered results:', filtered); // Debug log
    return filtered;
  }, [initialData, filters]);

  return { filters, setFilters, filteredData };
};
