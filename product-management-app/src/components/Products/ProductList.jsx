// src/components/Products/ProductList.jsx
import React from 'react';

const ProductList = ({ products }) => {
  console.log('ProductList received products:', products); // Debug log

  if (!products || products.length === 0) {
    return (
      <div>
        <p>No products found</p>
        <p>Current product count: 0</p>
      </div>
    );
  }

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
};

export default ProductList;
