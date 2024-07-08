import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios/axiosInstance';
import { Box, Typography, Button, Paper } from '@mui/material';

const PlaceOrder = ({ user, onClose }) => {
  const [customer, setCustomer] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [platformCharge, setPlatformCharge] = useState(50); // Example platform charge
  const [gst, setGst] = useState(0); // GST will be calculated dynamically

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/user/${user}`);
        setCustomer(response.data.customer);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    const fetchCartTotal = async () => {
      try {
        const response = await axiosInstance.get(`/cart/${user}`);
        setCartItems(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error('Error fetching cart total:', error);
      }
    };

    fetchCustomerDetails();
    fetchCartTotal();
  }, [user]);

  const calculateTotals = (items) => {
    let total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    let gstAmount = total * 0.18; // Assuming GST is 18%
    setGst(gstAmount);
    setGrandTotal(total + platformCharge + gstAmount);
  };

  const handlePlaceOrder = async () => {
  

    const products = cartItems.map(item => item.product);
    const orderData = {
        products,
        user: { username :`${user}` },
      };
    console.log(JSON.stringify(orderData));
    try {
        
      await axiosInstance.post('/orders', orderData);
      alert('Order placed successfully!');
      onClose();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h6">Place Order</Typography>
      <Typography variant="body1">Name: {customer.name}</Typography>
      <Typography variant="body1">Address: {customer.address}</Typography>
      <Typography variant="body1">Phone Number: {customer.phoneNumber}</Typography>
      
      <Typography variant="h6" sx={{ marginTop: '20px' }}>Order Summary</Typography>
      {cartItems.map((item) => (
        <Paper key={item.id} elevation={3} sx={{ padding: '10px', marginBottom: '10px' }}>
          <Typography variant="body1">{item.product.name} - {item.quantity} x Rs. {item.product.price}</Typography>
        </Paper>
      ))}

      <Typography variant="body1">Platform Charge: Rs. {platformCharge}</Typography>
      <Typography variant="body1">GST: Rs. {gst.toFixed(2)}</Typography>
      <Typography variant="h6" sx={{ marginTop: '10px' }}>Grand Total: Rs. {grandTotal.toFixed(2)}</Typography>

      <Button variant="contained" onClick={handlePlaceOrder} sx={{ marginTop: '20px' }}>Place Order</Button>
    </Box>
  );
};

export default PlaceOrder;
