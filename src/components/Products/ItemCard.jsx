// ItemCard.js
import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Alert, Button } from '@mui/material';
import { AuthContext } from '../globalContext/AuthContext';
import axios from 'axios';

const ItemCard = ({ item }) => {
  const { login } = useContext(AuthContext);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const addToCart = async (productId) => {
    console.log(JSON.stringify(login));
    if (login.token) {
      setApiError("Please Login first before adding to cart");
      return false;
    } else {
      const body = { username: login.user, loginToken: login.token };
      try {
        const response = await axios.post('http://localhost:8080/api/validate', body);
        if (response.data === false) {
          setApiError("Please Login first before adding to cart");
          return false;
        }
        else {
          const bodyCart = {
            user: {
              username: login.user
            },    
        product: {
              id: productId
            }
          }
          try {
            const response = await axios.post('http://localhost:8080/cart', bodyCart);
            if (response.status === 201) {
              setApiSuccess("Item added to cart");
            }
          } catch (error) {
            setApiError(error.response.data);
          }

        }
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
          <Button variant="contained" color="primary" onClick={() => addToCart(item.id)}>Add to Cart</Button>
          </CardContent>
      </Card>
    );
  };

  export default ItemCard;
