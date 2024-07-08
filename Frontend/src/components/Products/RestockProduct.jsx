import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

const RestockProduct = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleRestock = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products/restock', null, {
        params: {
          productId: productId,
          quantity: quantity
        }
      });
      setMessage(response.data);
      setProductId('');
      setQuantity('');
    } catch (error) {
      setMessage(error.response?.data || 'Error restocking product');
    }
  };

  return (
    <form onSubmit={handleRestock}>
      <div>
        <TextField
          label="Product ID"
          variant="outlined"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          label="Quantity"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Restock
        </Button>
      </div>
      {message && <div>{message}</div>}
    </form>
  );
};

export default RestockProduct;
