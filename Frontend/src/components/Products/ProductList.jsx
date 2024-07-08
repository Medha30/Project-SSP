import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from '@mui/material';
import axiosInstance from '../../utils/axios/axiosInstance';

const ProductList = ({ refreshList }) => {
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [restockQuantities, setRestockQuantities] = useState({});

    const fetchProductList = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/products`);
            setProducts(response.data);
            setSuccessMessage('');
            setErrorMessages({});
        } catch (error) {
            console.error('Error fetching product list:', error);
            setErrorMessages({ global: 'Failed to get list of products.' });
        }
    }

    useEffect(() => {
        fetchProductList();
    }, [refreshList]);

    const handleRestockInput = (productId, value) => {
        setRestockQuantities({
            ...restockQuantities,
            [productId]: parseInt(value, 10)
        });
    };

    const handleRestock = async (productId) => {
        const quantity = restockQuantities[productId];
        if (quantity && quantity > 0) {
            try {
                const body={ id:productId, quantity:quantity };
                console.log(body);
                // console.log(productId,quantity);
                await axiosInstance.post(`/products/restock`,body );
                setSuccessMessage('Product restocked successfully!');
                setErrorMessages({});
                fetchProductList();
            } catch (error) {
                console.error('Error restocking product:', error);
                setErrorMessages({ ...errorMessages, [productId]: 'Failed to restock product.' });
            }
        } else {
            setErrorMessages({ ...errorMessages, [productId]: 'Invalid restock quantity.' });
        }
    };

    const calculateTotal = () => {
        return products.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    return (
        <div>
            <Typography variant="h2">Product List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Restock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length > 0 && products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Typography variant="body1">{product.name}</Typography>
                                    {errorMessages[product.id] && (
                                        <Typography variant="body2" style={{ color: 'red' }}>
                                            {errorMessages[product.id]}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        label="Restock Quantity"
                                        value={restockQuantities[product.id] || ''}
                                        onChange={(e) => handleRestockInput(product.id, e.target.value)}
                                        size="small"
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleRestock(product.id)}
                                        style={{ marginLeft: '8px' }}
                                    >
                                        Restock
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="body1" style={{ marginTop: '16px' }}>Total Amount: Rs.{calculateTotal().toFixed(2)}</Typography>
            {successMessage && <Typography variant="body1">{successMessage}</Typography>}
            {errorMessages.global && <Typography variant="body1" style={{ color: 'red' }}>{errorMessages.global}</Typography>}
        </div>
    );
};

export default ProductList;
