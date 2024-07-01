import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/sales');
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, []);

    const productSales = salesData.reduce((acc, curr) => {
        if (!acc[curr.productName]) {
            acc[curr.productName] = { totalSales: 0, ids: [] };
        }
        acc[curr.productName].totalSales += curr.totalSales;
        acc[curr.productName].ids.push(curr.id);
        return acc;
    }, {});

    return (
        <div>
            <Typography variant="h4" gutterBottom>Sales Report</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sales ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Total Sales</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(productSales).map(([productName, data]) => (
                            <React.Fragment key={productName}>
                                {data.ids.map(id => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{productName}</TableCell>
                                        <TableCell>{data.totalSales.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SalesReport;
