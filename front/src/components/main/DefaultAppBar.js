import React, { useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';

import ListAltIcon from '@material-ui/icons/ListAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { LoginContext } from '../../providers/LoginProvider';

import { Link } from "react-router-dom";
import { Tooltip, Breadcrumbs } from '@material-ui/core';
import useTop5Query from '../../hooks/useTop5Query';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    top5: {
        color: '#ffffff',
        fontSize: 12,
        marginTop: 3,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        height: 15,
        overflow: 'hidden'
    },
    top5a: {
        marginRight: 10
    },
    appBar: {
        minHeight: 70
    }
}));

const DefaultAppBar = (props) => {

    const classes = useStyles();

    const { user } = useContext(LoginContext);

    const { searchs } = useTop5Query();

    return (
        <AppBar position="fixed" >
            <Toolbar className={classes.appBar}>
                <Link to={"/"}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        HW Collection
                    </Typography>
                </Link>
                <div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search for cars…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={props.handleSearch}
                        />

                    </div>
                    <div className={classes.top5}>

                        {searchs.map(search => {
                            return (
                                <Link to={`/search?q=${search.query}`} className={classes.top5a}>
                                    <Typography variant="span">
                                        {search.query}
                                    </Typography>
                                </Link>
                            );
                        })}

                    </div>
                </div>


                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <Link to={"/favorites"}>
                        <Tooltip title="Favorites" aria-label="add">
                            <IconButton aria-label="favorites" color="inherit">
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link to={"/collection"}>
                        <Tooltip title="My Collection" aria-label="add">
                            <IconButton aria-label="collection" color="inherit">
                                <ListAltIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={props.menuId}
                        aria-haspopup="true"
                        onClick={props.handleProfileMenuOpen}
                        color="inherit"
                    >
                        {!!user.photoURL
                            ? <Avatar alt={user.displayName} src={user.photoURL} />
                            : <AccountCircle />}
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls={props.mobileMenuId}
                        aria-haspopup="true"
                        onClick={props.handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default DefaultAppBar;