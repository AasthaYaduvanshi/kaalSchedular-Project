import React from "react"
import { Box, Container, Grid, Typography, IconButton } from "@mui/material"
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#f9ac06", color: "white", py: 3 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="p" gutterBottom>
              YourBrand
            </Typography>
            <Typography variant="body2" component="p">
              Making the world a better place through innovative technology.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="p" gutterBottom>
              Quick Links
            </Typography>
            {/* Add your quick links here */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="p" gutterBottom>
              Connect with Us
            </Typography>
            <IconButton aria-label="Facebook" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton aria-label="LinkedIn" color="inherit">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          <Typography variant="body2" color="inherit" component="p">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
