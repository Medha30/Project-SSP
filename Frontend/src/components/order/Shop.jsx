import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../utils/axios/axiosInstance';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../globalContext/AuthContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axiosInstance.get(`/cart/${user}`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const incrementQuantity = async (id, quantity) => {
        try {
            await axiosInstance.put(`/cart/${id}/${quantity + 1}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    };

    const decrementQuantity = async (id, quantity) => {
        try {
            await axiosInstance.put(`/cart/${id}/${quantity - 1}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axiosInstance.delete(`/cart/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {cartItems.length === 0 ? (
                    <Typography variant="body1">Your cart is empty</Typography>
                ) : (
                    cartItems.map((item) => (
                        <Paper key={item.id} elevation={3} sx={{ padding: '20px', minWidth: '200px' }}>
                            <Typography variant="h6">{item.product.name}</Typography>
                            <Typography variant="body1">Price: Rs. {item.product.price}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                <Typography variant="body1">Quantity:</Typography>
                                <IconButton
                                    onClick={() => decrementQuantity(item.id, item.quantity)}
                                    disabled={item.quantity <= 1}
                                    sx={{ margin: '0 5px' }}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="body1">{item.quantity}</Typography>
                                <IconButton
                                    onClick={() => incrementQuantity(item.id, item.quantity)}
                                    sx={{ margin: '0 5px' }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => deleteItem(item.product.id)}
                                startIcon={<DeleteIcon />}
                            >
                                Remove
                            </Button>
                        </Paper>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default Cart;
