import React, { useState, useRef, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefaultMenu from './components/main/DefaultMenu';
import MobileMenu from './components/main/MobileMenu';
import DefaultAppBar from './components/main/DefaultAppBar';
import Grid from '@material-ui/core/Grid';
import Car from './Car';
import useCarsSearch from './hooks/useCarsSearch';
import { LoginContext } from './providers/LoginProvider';

import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import Collection from './Collection';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    main: {
        marginTop: 80,
        flexGrow: 1,
    }
}));

const Main = (props) => {
    const classes = useStyles();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const user = useContext(LoginContext);

    const {
        loading, error,
        cars, hasMore
    } = useCarsSearch(query, page);


    const observer = useRef();
    const lastCarElementRef = useCallback(node => {
        if (loading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
        setPage(0);
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
                    <Route path="/collections">
                        <Collection />
                    </Route>
                    <Route path="/favorites">
                        <p>favorites</p>
                    </Route>
                    <Route path="/">
                        <Grid container spacing={3}>
                            {cars.map((car, index) => {
                                return (
                                    <Grid ref={cars.length == index + 1 ? lastCarElementRef : null} item xs={12} md={6} lg={3} key={car.id}>
                                        <Car car={car} userId={user.uid} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Route>
                </Switch>
            </div>
        </div >


    );
}

export default withRouter(Main)