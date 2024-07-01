import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ProductList = ({ refreshList }) => {
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProductList = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/products`);
            setProducts(response.data);
            setSuccessMessage('');
        } catch (error) {
            console.error('Error fetching product list:', error);
            setErrorMessage('Failed to get list of products.');
        }
    }

    useEffect(() => {
        fetchProductList();
    }, [refreshList]);

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length > 0 && products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="body1" style={{ marginTop: '16px' }}>Total Amount: Rs.{calculateTotal().toFixed(2)}</Typography>
            {successMessage && <Typography variant="body1">{successMessage}</Typography>}
            {errorMessage && <Typography variant="body1" style={{ color: 'red' }}>{errorMessage}</Typography>}
        </div>
    );
};

export default ProductList;
