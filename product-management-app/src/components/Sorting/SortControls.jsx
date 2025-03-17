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