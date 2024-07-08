// ItemCard.js
import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Alert, Button } from '@mui/material';
import { AuthContext } from '../globalContext/AuthContext';
import axiosInstance from '../../utils/axios/axiosInstance';

const ItemCard = ({ item }) => {
  const { token,user } = useContext(AuthContext);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const addToCart = async (productId) => {
    console.log(JSON.stringify(token));
    if (token == null || user == null) {
      setApiError("Please Login first before adding to cart ");
      return false;
    } else {

      try {
       
        const bodyCart = {
          quantity:1,
          product: {
            id: productId
          }
        }
        try {
          const response = await axiosInstance.post('/cart', bodyCart);
          if (response.status === 201) {
            setApiSuccess("Item added to cart");
          }
        } catch (error) {
          // console.log(error.response.data);
          // setApiError(error);
          if (error.response && error.response.status === 400) {
            setApiError(error.response.data); // Set the error message from backend
        } else {
            setApiError('An unexpected error occurred.'); // Handle other errors
        }

        }

        // }
      }
      catch (error) {
        setApiError(error.response.data);
      }
    }
  }




  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      {apiSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {apiSuccess}
        </Alert>
      )}
      <CardMedia
        component="img"
        height="140"
        image={item.imageUrl}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.productDescription}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Rs {item.price}
        </Typography>
        {item.quantity>0?
        <Button variant="contained" color="primary" onClick={() => addToCart(item.id)}>Add to Cart</Button>
        :<Typography variant="h6" color="text.primary">
        Out of stock
      </Typography>}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
