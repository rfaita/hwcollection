import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { LoginContext } from '../../providers/LoginProvider';
import { Link, useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { signOut } from '../../services/firebase';

const DefaultMenu = (props) => {

    const { user } = useContext(LoginContext);
    const history = useHistory();

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
            {!!user ?
                <div>
                    <MenuItem onClick={() => {
                        props.handleMenuClose();
                        signOut().then(() => history.push("/"));
                    }}>Logout</MenuItem>
                </div>
                :
                <Link to={"/login"}>
                    <MenuItem onClick={props.handleMenuClose}>
                        <IconButton color="inherit">
                            <LockOpenIcon />
                        </IconButton>
                        Login
                    </MenuItem>
                </Link>

            }
        </Menu>
    );
}

export default DefaultMenu;