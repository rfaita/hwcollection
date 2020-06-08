import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';


const MobileMenu = (props) => {

    return (
        <Menu
            anchorEl={props.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isMobileMenuOpen}
            onClose={props.handleMobileMenuClose}
        >
            <MenuItem>
                <Link to={"/favorites"}>
                    <IconButton aria-label="favorites" color="inherit">
                        <FavoriteIcon />
                        Favorites
                    </IconButton>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to={"/collections"}>
                    <IconButton color="inherit">
                        <ListAltIcon />
                        Collections
                    </IconButton>
                </Link>
            </MenuItem>
            <MenuItem onClick={props.handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
}

export default MobileMenu;