import React, { useState, useContext } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"
import { Link } from "react-router-dom"
// import useAuth from "@hooks/useAuth"

import { ColorModeContext } from "@contexts/DarkModeContext"
import { BRAND_NAME } from "components/data/constrain"
import useAuth from "@hooks/useAuth"
// const pages = ["Products", "Pricing", "Blog"]
import companyLogo from "@assets/images/brand.png"
const settings = [
  // { title: "Dashboardsssssssssssssssssssss", url: "/user/dashboard" },
  { title: "Profile", url: "/user/profile" },
]
function TestHeader() {
  const { logout } = useAuth()

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { darkMode, setDarkMode } = useContext(ColorModeContext)
  return (
    <AppBar
      style={{
        boxShadow: "none",
        background: darkMode ? "#121212" : "#fff",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        width: "100%",
        "@media print": {
          display: "none",
        },
        paddingLeft: 70,
        paddingRight: 70,
      }}
      position="sticky"
    >
      <Container maxWidth="xl ">
        <Toolbar style={{ color: darkMode ? "#fff" : "#000" }} disableGutters>
          <img
            src={companyLogo}
            alt={BRAND_NAME}
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <Link
            style={{
              textDecoration: "none",
              color: darkMode ? "#fff" : "#000",
            }}
            to={"/"}
          >
            <Typography variant="h6" sx={{ fontSize: 19, flexGrow: 1 }}>
              {BRAND_NAME}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: darkMode ? "#fff" : "#000",
                    }}
                    to={setting.url}
                  >
                    <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                </>
              ))}
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: darkMode ? "#fff" : "#000",
                  }}
                  onClick={logout}
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default TestHeader
