import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios/axiosInstance';

const VegetableGallery = () => {
  const [vegetableData, setVegetableData]=useState([]);

  const fetchVegetableProduct = async ()=> {
      try {
        const response = await axiosInstance.get('/products/all/vegetable/4');
        setVegetableData(response.data);

      } catch (error) {
        alert(error.response.data);
      }
    };

    useEffect(()=>{
      fetchVegetableProduct();
    },[])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Vegetables
      </Typography>
      <Grid container spacing={2}>
        {vegetableData.map((item) => (
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
      to="/items/vegetable"
      variant="outlined"
      color="secondary"
    >
      See more 
    </Button>
    </Container>
  );
};

export default VegetableGallery;
