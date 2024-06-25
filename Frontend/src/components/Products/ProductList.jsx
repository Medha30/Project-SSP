import React, { useState,useEffect } from 'react';
import axios from 'axios';
const ProductList = ({refreshList}) => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [sortOrder, setSortOrder] = useState('asc');
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const fetchProductList = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products`);
      setProducts(response.data);
      setSuccessMessage('');
      // if (response.status === 201) {
      //     setSuccessMessage('Product added successfully!');
      //     setErrorMessage('');
      //     setTimeout(() => {
      //         setSuccessMessage('');
      //     }, 3000);
      // }

  } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to get list of  product.');
  }
  }

  useEffect(()=>{
    fetchProductList();
  },[refreshList]);


  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const sortedProducts = [...filteredProducts].sort((a, b) => {
  //   if (sortOrder === 'asc') {
  //     return a.name.localeCompare(b.name);
  //   } else {
  //     return b.name.localeCompare(a.name);
  //   }
  // });

  const calculateTotal = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  return (
    <div>
      <div>
        <h2>Product List</h2>
        {/* <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
        {/* <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? 'Sort Z-A' : 'Sort A-Z'}
        </button> */}
        <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length>0 && products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                {/* <td>
                                    <button onClick={() => updateProduct(product)}>Edit</button>
                                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
        <p>Total Amount: Rs.{calculateTotal().toFixed(2)}</p>
      </div>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
    </div>
  );
};

export default ProductList;
