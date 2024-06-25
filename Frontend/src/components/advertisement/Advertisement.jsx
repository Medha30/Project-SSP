import React from 'react';
import { Card, CardMedia, Typography } from '@mui/material';

const Advertisement = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image="https://via.placeholder.com/800x200?text=Advertisement"
        alt="Advertisement Banner"
      />
      <Typography variant="body2" align="center">
        Visit our store for amazing offers!
      </Typography>
    </Card>
  );
};

export default Advertisement;
