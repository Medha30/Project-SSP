// ItemCard.js
import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Alert, Button } from '@mui/material';
import { AuthContext } from '../globalContext/AuthContext';
import axios from 'axios';

const ItemCard = ({ item }) => {
  const { token, user } = useContext(AuthContext);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const addToCart = async (productId) => {
    console.log(JSON.stringify(token));
    if (token == null) {
      setApiError("Please Login first before adding to cart 1");
      return false;
    } else {

      try {
        // const response = await axios.post('http://localhost:8080/api/validate', body,{
        //       headers: {
        //           Authorization: `Bearer ${token}`
        //       }}
        // );
        // if (response.data === false) {
        //   setApiError("Please Login first before adding to cart 2");
        //   return false;
        // }
        // else {
        const bodyCart = {
          quantity:1,
          user: {
            username: user.name
          },
          product: {
            id: productId
          }
        }
        try {
          console.log(`Bearer ${token}`);
          console.log(JSON. stringify(bodyCart ));
          const response = await axios.post('http://localhost:8080/cart', bodyCart
            // {
            //   headers: {
            //      Authorization: `Bearer ${token}`              }
            // }
          );
          console.log(response.status);
          if (response.status === 201) {
            setApiSuccess("Item added to cart");
          }
        } catch (error) {
          console.log(error.response);
          setApiError(error);
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
        <Button variant="contained" color="primary" onClick={() => addToCart(item.id)}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
