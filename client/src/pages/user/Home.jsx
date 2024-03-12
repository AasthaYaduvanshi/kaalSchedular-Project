import React, { useEffect, useState, useContext } from "react";
import { Typography, Container, Grid, Button, Box } from "@mui/material";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import hero from "@assets/images/hero.png";
import MuiCarousel from './Carousel';
import Features from './Features';
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import { SubmitButton } from "@pages/auth/common";
import { ColorModeContext } from "@contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const api = useAxiosPrivate();
  const [info, setInfo] = useState(null);
  const { darkMode, setDarkMode } = useContext(ColorModeContext)
  const nav = useNavigate()
  useEffect(() => {
    api
      .get("/api/user/profile")
      .then(({ data }) => {
        setInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={2} sx={{ minHeight: '500px', alignItems: 'center' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 900, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Welcome to KaalScheduler
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.0rem' } }}>
          Why do you use the making time table by itself It's 2024 , try it by using our advanced algorithms.           </Typography>
          <SubmitButton onClick={() => { info ? nav('/user/profile') : nav('/signup') }} variant="contained" style={{ marginTop: '20px' }} sx={{ mt: 2, padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
            {
              info ? ("Explore") : ("Register")
            }
          </SubmitButton>
        </Grid>
        <Grid item xs={12} md={6} sx={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '300px' }} />
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          More than just a tool
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 5 }}>
          Explore what we can do
        </Typography>
      </Box>
      <MuiCarousel />
      <Features />
      <Testimonials />
      <Contact />

    </Container>
  );
};

export default Profile;