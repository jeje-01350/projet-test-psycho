import React from "react";

import {
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          mx: { xs: "1rem", md: "3rem" },
          my: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink
              to="/"
              style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#c3c3c3",
                  textDecoration: 'none',
              })}
          >
            <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1.7rem", md: "2.7rem" } }}
            >
                Sensei
            </Typography>
          </NavLink>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
