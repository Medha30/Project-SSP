
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h1>Sales Report</h1>
      <table>
        <thead>
          <tr>
            <th>Sales ID</th>
            <th>Product Name</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
  {Object.entries(productSales).map(([productName, data]) => (
    <React.Fragment key={productName}>
      {data.ids.map(id => (
        <tr key={id}>
          <td>{id}</td>
          <td>{productName}</td>
          <td>{data.totalSales.toFixed(2)}</td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default SalesReport;
