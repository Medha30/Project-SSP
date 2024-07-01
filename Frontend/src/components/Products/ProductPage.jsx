import React, {useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, List, ListItem, ListItemText, Card, CardMedia, Button, Alert } from '@mui/material';
import axios from 'axios';

const ProductPage = () => {

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [details, setDetails] = useState([]);
  


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get('http://localhost:8080/products/12'); // Replace with your actual product API
        setProduct(productResponse.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get('http://localhost:8080/reviews/Product/12'); // Replace with your actual reviews API
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, []);

useEffect(()=>{
  const productdetails = async () => {
    try {
      const detailsResponse = await axios.get(`https://wordsapiv1.p.mashape.com/words/example/${product.name}`); // Replace with your actual reviews API
      setDetails(detailsResponse.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
},[product])

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart');

    
  };

  const handleAddToWishlist = () => {
    // Add to wishlist logic here
    console.log('Added to wishlist');
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={product.imageUrl} // Replace with your actual image field
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h5" color="primary">
            Rs{product.price}
          </Typography>
          {product.offers && (
            <Typography variant="body1" color="secondary">
              {product.offers}
            </Typography>
          )}
          <Typography variant="body1" paragraph>
            {product.productDescription}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Delivery: {product.deliveryInfo}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Estimated Delivery Date: {product.deliveryDate}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Replacement Policy: {product.replacementPolicy}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            sx={{ mt: 2, mr: 2 }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleAddToWishlist}
            sx={{ mt: 2 }}
          >
            Add to Wishlist
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, ml: 2 }}
          >
            Gift Options
          </Button>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        {reviews.length === 0 ? (
          <Alert severity="info">No reviews available for this product.</Alert>
        ) : (
          <List>
            {reviews.map((review) => (
              <ListItem key={review.id}>
                <ListItemText
                  primary={review.user.username}
                  secondary={review.review}
                />
              </ListItem>
            ))}
            <ListItemText primary={details}/>
          </List>
        )}
      </Box>
    </Container>
  );
};

export default ProductPage;
