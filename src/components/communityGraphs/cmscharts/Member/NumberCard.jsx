import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const NumberCard = ({ title, number }) => {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: 'transparent', color: 'colors.green[500]' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {number}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NumberCard;
