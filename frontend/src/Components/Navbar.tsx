import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import {
    AccountCircleRounded,
    ShoppingCartRounded
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu'
import {  withStyles } from '@material-ui/core/styles';
import "../Styles/Navbar.css";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        { ...props }
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function Navbar(){

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className = "menuButton" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" color = "inherit">
                        E-Commerce
                    </Typography>
                    
                    <section className = "menuItems">
                        <MenuItem className = "menuItem">
                            <Link className = "menuItemText" to = "/">Products</Link>
                        </MenuItem>

                        <MenuItem className = "menuItem">
                            <Link className = "menuItemText" to = "/new">Add Products</Link>
                        </MenuItem>
                    </section>
                    
                    <MenuItem>
                        <Link className = "menuItemText" to = "/cart">
                            <ShoppingCartRounded />
                        </Link>
                    </MenuItem>

                    <MenuItem aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <AccountCircleRounded />
                    </MenuItem>
                </Toolbar>
            </AppBar>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleClose}>
                    <Link to = "/login" style = {{ textDecoration: 'none', color: "black" }}>
                        Login
                     </Link>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleClose}>
                    <Link to = "/register" style = {{ textDecoration: 'none', color: "black" }}>
                        Register
                     </Link>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    )
}