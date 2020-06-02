import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const DefaultMenu = (props) => {



    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isMenuOpen}
            onClose={props.handleMenuClose}
        >
            <MenuItem onClick={props.handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={props.handleMenuClose}>My account</MenuItem>
        </Menu>
    );
}

export default DefaultMenu;