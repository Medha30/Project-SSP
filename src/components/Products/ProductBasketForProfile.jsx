
import { Box, Grid } from '@mui/material';
import FruitGallery from './FruitData';
import VegetableGallery from './VegetableData';
import GroceryGallery from './GroceryData';
// import Testimonials from '../review/Testimonial';
const ProductBasketForProfile = () => {

    return(
        <>
        <Box sx={{ my: 4 }}>
       
          <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FruitGallery />
          </Grid>
          <Grid item xs={12} md={4}>
            <VegetableGallery />
          </Grid>
          <Grid item xs={12} md={4}>
            <GroceryGallery />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <Testimonials />
          </Grid> */}
        </Grid>
      
      </Box>
      
        </>
    );
}
export default ProductBasketForProfile;