import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "@hooks/useAuth";
import Container from "@mui/system/Container";
import { ColorModeContext } from "@contexts/DarkModeContext";
import companyLogo from '@assets/images/brand.png'


import {
  APPBAR_DESKTOP,
  APPBAR_MOBILE,
  BRAND_NAME,
} from "components/data/constrain";
import { SubmitButton } from "@pages/auth/common";



const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  color: "#000",
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: 0,
  },
}));

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { darkMode, setDarkMode } = useContext(ColorModeContext)

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const AppbarStyle = styled(AppBar)({
    boxShadow: 'none',
    background: darkMode ? '#121212' : '#fff',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    width: '100%',
    '@media print': {
      display: 'none',
    },
  });


  return (
    <AppbarStyle>
      <Container>
        <ToolbarStyle>
          <img src={companyLogo} alt={BRAND_NAME} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <Typography style={{ fontWeight: 'bold', cursor: 'pointer'}} variant="h6" sx={{ color:darkMode?'white':'black',fontSize: 19, flexGrow: 1 }}>
            {BRAND_NAME}
          </Typography>

          {isAuthenticated ? (
            <Button
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
              onClick={logout}
            >
              logout
            </Button>
          ) : (
            <>
              <Button sx={{ p: 0, marginRight: 4, fontSize: "1rem", fontWeight: "normal" }}>
                <Link style={{ color: 'white',background: 'linear-gradient(58deg, rgba(243, 172, 18, 1) 20%, rgba(241, 196, 15, 1) 100%)',fontWeight: 'bold', cursor: 'pointer', 'border-radius': '30px', padding: '10px 20px', textDecoration: 'none' }} to="/login">Login</Link>
              </Button>

              <SubmitButton
                onClick={toggleDarkMode}
                sx={{
                  px: 5,
                  py: 0.5,
                  fontSize: "1rem",
                  fontWeight: "normal",
                  color: 'white',
                  bgcolor: "#f3ac12",
                  "&:hover": {
                    bgcolor: "#f3ac12",
                  },
                }}
              >
                <Link style={{ color: 'white', textDecoration: 'none' }}>Switch to Dark mode</Link>
              </SubmitButton>
            </>
          )}
        </ToolbarStyle>
      </Container>
    </AppbarStyle>
  );
}
