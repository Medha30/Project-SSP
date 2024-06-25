import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FruitGallery = () => { 
const [fruitData, setFruitData]=useState([]);

    const fetchFruitProduct = async ()=> {
        try {
          const response = await axios.get('http://localhost:8080/products/all/fruit/4');
          setFruitData(response.data);

        } catch (error) {
          alert(error.response.data);
        }
      };

      useEffect(()=>{
        fetchFruitProduct();
      },[])


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Fruits
      </Typography>
      <Grid container spacing={2}>
        {fruitData.map((item) => (
          <Grid item xs={6} md={6} key={item.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia component="img" height="150" image={item.imageUrl} alt={item.name} />
              <CardContent>
                <Typography variant="h5" noWrap>{item.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
      component={Link}
      to="/items/fruit"
      variant="outlined"
      color="secondary"
    >
      See more 
    </Button>
    </Container>
  );
};

export default FruitGallery;
