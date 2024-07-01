import React from 'react';
import { Container, Typography,  CardContent, Grid, Box } from '@mui/material';
import Advertisement from '../advertisement/Advertisement';
import ProductBasketForProfile from '../Products/ProductBasketForProfile';
import ItemList from '../Products/ItemList';

const Home = () => {

  return (
    <Container>
      <Box sx={{ my: 4 }}>
            {/* <Typography variant="h4" gutterBottom align="center">
                Advertisements
            </Typography> */}
            <Grid container justifyContent="center" alignItems="center">
                {/* <Grid item xs={12} sm={8} md={6}> */}
                    <CardContent>
                        <Advertisement />
                    </CardContent>
                {/* </Grid> */}
            </Grid>
        </Box>
      <ProductBasketForProfile />
      <ItemList/>
      <Box sx={{ my: 4 }}>
            {/* <Typography variant="h4" gutterBottom align="center">
                Advertisements
            </Typography> */}
            <Grid container justifyContent="center" alignItems="center">
                {/* <Grid item xs={12} sm={8} md={6}> */}
                    <CardContent>
                        <Advertisement />
                    </CardContent>
                {/* </Grid> */}
            </Grid>
        </Box>

    </Container>
  );
};

export default Home;
