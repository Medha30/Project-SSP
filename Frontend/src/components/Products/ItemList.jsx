// ItemList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container } from '@mui/material';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';

const ItemList = () => {
  const { productType } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from API
    const fetchItems = async () => {
      try {
         const response = await axios.get(`http://localhost:8080/products/all/${productType}/10`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [productType]);

  return (
    <Container>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemList;
