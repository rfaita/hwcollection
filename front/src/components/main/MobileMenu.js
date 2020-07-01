import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import RepeatIcon from '@material-ui/icons/Repeat';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';
import { LoginContext } from '../../providers/LoginProvider';
import { signOut } from '../../services/firebase';


const MobileMenu = (props) => {

    const { user } = useContext(LoginContext);
    const history = useHistory();

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
            {!!user ?
                <div>
                    <Link to={"/favorites"}>
                        <MenuItem onClick={props.handleMobileMenuClose} >
                            <IconButton aria-label="favorites" color="inherit">
                                <FavoriteIcon />
                            </IconButton>
                            Favorites
                        </MenuItem>
                    </Link>
                    <Link to={"/collection"}>
                        <MenuItem onClick={props.handleMobileMenuClose} >
                            <IconButton color="inherit">
                                <ListAltIcon />
                            </IconButton>
                            My Collection
                        </MenuItem>
                    </Link>
                    <Link to={`/trades/${user.uid}`}>
                        <MenuItem onClick={props.handleMobileMenuClose} >
                            <IconButton color="inherit">
                                <RepeatIcon />
                            </IconButton>
                            My Trades
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={() => {
                        props.handleMobileMenuClose();
                        signOut().then(() => history.push("/"));
                    }}>
                        <IconButton color="inherit">
                            <ExitToAppIcon />
                        </IconButton>
                        Logout
                    </MenuItem>
                </div>
                :
                <Link to={"/login"}>
                    <MenuItem onClick={props.handleMobileMenuClose} >
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

export default MobileMenu;