import React from "react";

import {
    Toolbar,
    AppBar,
} from "@mui/material";
import logo from '../../images/logo-sensei.png';

import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#151515" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                    })}
                >
                    <img src={logo} alt="" style={{height:"50px",marginTop:'10px'}}/>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
