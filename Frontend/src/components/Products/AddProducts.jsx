import React, { useState } from 'react';
import ProductList from './ProductList';
import axiosInstance from '../../utils/axios/axiosInstance';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const AddProducts = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [refreshList, setRefreshList] = useState(0);

    const handleChange = (e) => {
        setCategory(e.target.value);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'price') {
            setPrice(parseFloat(value));
        }
    }

    const handleQuantity = (action) => {
        if (action === 'increment') {
            setQuantity(quantity + 1);
        } else {
            if (quantity > 0) {
                setQuantity(quantity - 1);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation checks
        if (!name) {
            setErrorMessage('Name cannot be blank.');
            return;
        }

        if (price <= 0) {
            setErrorMessage('Price should be above 0.');
            return;
        }

        if (quantity <= 0) {
            setErrorMessage('Quantity should be above 0.');
            return;
        }

        const body = {
            productType: category,
            name: name,
            price: price,
            quantity: quantity
        }

        try {
            const response = await axiosInstance.post(`http://localhost:8080/products`, body);
            if (response.status === 201) {
                setSuccessMessage('Product added successfully!');
                setRefreshList(refreshList + 1);
                setErrorMessage('');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Failed to add product.');
        }
    }

    
    return (
        <>
        {/* <Container component="main" maxWidth="xs"> */}
      
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" margin={8}>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                label="category"
                                id="category"
                                value={category}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                <MenuItem value="fruit">Fruits</MenuItem>
                                <MenuItem value="vegetable">Vegetables</MenuItem>
                                <MenuItem value="grocery">Groceries</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={handleInput}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            variant="outlined"
                            value={price}
                            onChange={handleInput}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} container alignItems="center">
                        <Button variant="outlined" onClick={() => handleQuantity('decrement')}>-</Button>
                        <Typography variant="body1" style={{ margin: '0 10px' }}>{quantity}</Typography>
                        <Button variant="outlined" onClick={() => handleQuantity('increment')}>+</Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button type="submit" variant="contained" color="primary">Add Product</Button>
                    </Grid>
                </Grid>
            </form>
            <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
            <ProductList refreshList={refreshList}/>
            {successMessage && <Typography variant="body1" style={{ color: 'green' }}>{successMessage}</Typography>}
            {errorMessage && <Typography variant="body1" style={{ color: 'red' }}>{errorMessage}</Typography>}
        </Box>
        {/* </Container> */}
        </>
    )
}

export default AddProducts;
