import React from 'react';
import { Container, Typography,  CardContent, Grid, Box } from '@mui/material';
import Advertisement from '../advertisement/Advertisement';
import ProductBasketForProfile from '../Products/ProductBasketForProfile';
import ItemList from '../Products/ItemList';

const Home = () => {

  return (
    <Container>

      <ProductBasketForProfile />
      <ItemList/>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Advertisements
        </Typography>
        <Grid container spacing={2}>
          <CardContent>

            <Advertisement />
          </CardContent>
        </Grid>
      </Box>

    </Container>
  );
};

export default Home;
