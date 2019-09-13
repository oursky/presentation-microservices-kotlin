import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {

    render(){
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            E-Commerce
                        </Typography>
                        
                        <MenuItem>
                            <Link to = "/" style = {{ textDecoration: 'none', color: "white" }}>Products</Link>
                        </MenuItem>
                    
                        <MenuItem>
                            <Link to = "/new" style = {{ textDecoration: 'none', color: "white" }}>Add Products</Link>
                        </MenuItem>

                        <MenuItem>
                            <Link to = "/cart" style = {{ textDecoration: 'none', color: "white" }}>Shopping Cart</Link>
                        </MenuItem>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}