import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const AboutUs = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to deliver unique solutions that help our users achieve their goals. With a focus on innovation and quality, our team works tirelessly to produce outstanding products and services.
      </Typography>
      <Grid container spacing={4}>
        {/* Example card for a team member or a specific feature of your company */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="Random"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Innovation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                At the heart of our mission is innovation. We're constantly seeking out new technologies and methodologies to deliver better solutions to our users.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Add more <Grid item> blocks here for more cards */}

      </Grid>
    </Box>
  );
};

export default AboutUs;
