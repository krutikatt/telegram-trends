import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NumberCard = ({ title, number }) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}> {/* Ensures the NumberCard fills its container */}
      <Card
        sx={{
          width: '100%',
          height: '120%',  // Adjust height to 100%
          padding: 2,
          backgroundColor: 'colors.grey[900]',
          color: 'colors.green[500]',
          display: 'flex',         // Add flex for alignment
          justifyContent: 'center', // Centers content vertically
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}> {/* Centers the text */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '1.2rem', // Adjust the font size of the title
              fontWeight: 'bold',  // Makes the title bold
              marginBottom: 1,     // Adds space below the title
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: '2.5rem',   // Adjust the font size of the number
              fontWeight: 'bold',   // Makes the number bold
            }}
          >
            {number}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NumberCard;
