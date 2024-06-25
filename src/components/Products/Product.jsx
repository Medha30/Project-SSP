// src/components/Product.js
import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

const Product = ({ addProduct }) => {
  const [product, setProduct] = useState({ name: '', price: '0', category: '', quantity: 1 });
  const [availableProducts, setAvailableProducts] = useState([]);
  const [productPrices] = useState({
    Apple: 1.99,
    Banana: 0.99,
    Orange: 1.49,
    Carrot: 0.79,
    Broccoli: 1.29,
    Spinach: 0.99,
    Rice: 2.99,
    Beans: 1.49,
    Flour: 1.99,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setProduct({ ...product, [name]: value, name: '' });
      const data=await getProductsForCategory(value);
       setAvailableProducts(data);
    } else if (name === 'name') {
      setProduct({ ...product, [name]: value, price: productPrices[value] * product.quantity });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const getProductsForCategory = async (category) => {

    if (category !=null){
      return await fetchProductList(category);
    }
    else{
      return [];
    }
  };

    const fetchProductList = async (category) => {
    try {
      const response = await axios.get('http://localhost:8080/' + category);
       const newdata = response.data.map(item => item.name);
      return newdata;

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const handleIncrement = () => {
    setProduct({ ...product, quantity: product.quantity + 1, price: productPrices[product.name] * (product.quantity + 1) });
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      setProduct({ ...product, quantity: product.quantity - 1, price: productPrices[product.name] * (product.quantity - 1) });
    }
  };

  const handleEdit = (productName) => {
    const price = productPrices[productName];
    setProduct({ name: productName, price, category: getCategoryForProduct(productName), quantity: 1 });
    setAvailableProducts([]);
  };

  const handleDelete = (productName) => {
    console.log(`Deleting product: ${productName}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    const filteredProducts = Object.keys(productPrices).filter((productName) =>
      productName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAvailableProducts(filteredProducts);
  };

  const getCategoryForProduct = (productName) => {
    const categories = ['fruits', 'vegetables', 'groceries'];
    for (const category of categories) {
      if (getProductsForCategory(category).includes(productName)) {
        return category;
      }
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, category, quantity } = product;
    if (name && price && category && quantity) {
      addProduct({ name, price, category, quantity });
      setProduct({ name: '', price: '0', category: '', quantity: 1 });
      setAvailableProducts([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Select Category"
        required
      >
        <option value="">Select Category</option>
        <option value="fruits">Fruits</option>
        <option value="vegetables">Vegetables</option>
        <option value="groceries">Groceries</option>
      </select>
      <select
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Select Product"
        required
      >
        <option value="">Select Product</option>
        {availableProducts.map((productName) => (
          <option key={productName} value={productName}>{productName}</option>
        ))}
      </select>
      <input
        type="text"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Product Price"
        required
        readOnly
      />
      <div>
        <button type="button" onClick={handleDecrement}>-</button>
        <span>{product.quantity}</span>
        <button type="button" onClick={handleIncrement}>+</button>
      </div>
      <button type="submit">Add Product</button>
      <button type="button" onClick={() => handleEdit(product.name)}>Edit</button>
      <button type="button" onClick={() => handleDelete(product.name)}>Delete</button>
    </form>
  );
};

export default Product;
