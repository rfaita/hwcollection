import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefaultMenu from './components/main/DefaultMenu';
import MobileMenu from './components/main/MobileMenu';
import DefaultAppBar from './components/main/DefaultAppBar';

import {
    Switch, Route,
    withRouter,
    useHistory
} from "react-router-dom";
import Collection from './Collection';
import Favorite from './Favorite';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    main: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 90,
        flexGrow: 1,
    }
}));

const Main = (props) => {
    const classes = useStyles();

    const history = useHistory();

    let timeout = 0;

    const handleSearch = (e) => {
        const data = e.target.value;

        if (!!timeout) {
            clearTimeout(timeout)
        };
        timeout = setTimeout(() => {
            if (!!data && data.length >= 3) {
                history.push(`/search?q=${data}`);
            }
        }, 1000);

    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <div className={classes.grow}>
            <DefaultAppBar menuId={menuId} mobileMenuId={mobileMenuId}
                handleMobileMenuOpen={handleMobileMenuOpen} handleProfileMenuOpen={handleProfileMenuOpen}
                handleSearch={handleSearch}
            />
            <MobileMenu mobileMenuId={mobileMenuId} handleMobileMenuOpen={handleMobileMenuOpen}
                mobileMoreAnchorEl={mobileMoreAnchorEl} isMobileMenuOpen={isMobileMenuOpen}
                handleMobileMenuClose={handleMobileMenuClose}
            />
            <DefaultMenu menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen}
                anchorEl={anchorEl} isMenuOpen={isMenuOpen}
                handleMenuClose={handleMenuClose}
            />
            <div className={classes.main}>
                <Switch>
                    <Route exact path="/">
                        <Collection />
                    </Route>
                    <Route path="/collection">
                        <Collection />
                    </Route>
                    <Route path="/favorites">
                        <Favorite />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                </Switch>
            </div>
        </div >
    );
}

export default withRouter(Main)