import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function MainSection() {
  return (
    <Box sx={{ textAlign: 'left', my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="body1" paragraph>
        Some introductory text about the app, its purpose, and how it can help the user.
      </Typography>
      <Button variant="contained" color="primary">
        Join In
      </Button>
    </Box>
  );
}

export default MainSection;
