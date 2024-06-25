import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductReport = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Report</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ProductName</th>
            {/* <th>ProductType</th> */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              {/* <td>{product.type}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReport;
