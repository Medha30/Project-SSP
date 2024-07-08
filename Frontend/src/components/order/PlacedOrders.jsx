// PlacedOrders.js

import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../utils/axios/axiosInstance';
import { AuthContext } from '../globalContext/AuthContext';
import { Box, Typography, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';

const PlacedOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await axiosInstance.get(`/orders/${user}`);
        setOrders(response.data); // Assuming the API returns orders for a specific user
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]); // Include user in dependency array to fetch orders when user changes

  return (
    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: '800px', width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Placed Orders
        </Typography>
        {orders.length === 0 ? (
          <Typography variant="body1" align="center">No orders placed yet.</Typography>
        ) : (
          <List>
            {orders.map(order => (
              <Box key={order.id}>
                <ListItem alignItems="flex-start">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.primary">
                        <strong>Order ID:</strong> {order.id}<br />
                        <strong>Order Date:</strong> {order.orderDate}<br />
                        <strong>Delivery Date:</strong> {order.deliveryDate}<br />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.primary">
                        <strong>Product Name:</strong> {order.productId.name}<br />
                        <strong>Product Quantity:</strong> {order.quantity}<br />
                        <strong>Price:</strong> {order.productId.price}<br />
                        <strong>Delivery Status:</strong> {order.deliveryStatus}<br />
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider component="li" />
              </Box>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};
export default PlacedOrders;
