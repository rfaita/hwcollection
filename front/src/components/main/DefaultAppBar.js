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
import RepeatIcon from '@material-ui/icons/Repeat';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { LoginContext } from '../../providers/LoginProvider';

import { Link } from "react-router-dom";
import { Tooltip } from '@material-ui/core';
import { deepPurple, deepOrange, blue, cyan, green, red, yellow } from '@material-ui/core/colors';

import useTop5Query from '../../hooks/useTop5Query';

const useStyles = makeStyles((theme) => ({
    logo: {
        height: 18,
        marginRight: 10,
        [theme.breakpoints.up('sm')]: {
            height: 50,
            marginRight: 0,
        },
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
        color: theme.palette.common.white,
        fontSize: 12,
        marginTop: 3,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        height: 15,
        overflow: 'hidden',
    },
    top5a: {
        marginRight: 7,
        fontWeight: 'bold',
    },
    top5t: {
        fontSize: '0.775rem',
        lineHeight: 1
    },
    appBar: {
        background: theme.palette.primary.backgroundGradient,
        minHeight: 70
    },
    mostSearched: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline',
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    cyan: {
        color: theme.palette.getContrastText(cyan[500]),
        backgroundColor: cyan[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    yellow: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
    }
}));

const DefaultAppBar = (props) => {

    const classes = useStyles();

    const { user } = useContext(LoginContext);

    const { searchs, loading } = useTop5Query();

    const colors = ['deepPurple', 'deepOrange', 'blue', 'cyan', 'green', 'red', 'yellow'];

    const randomColor = () => {
        return colors[Math.floor((Math.random() * colors.length))];
    }

    return (
        <AppBar position="fixed" >
            <Toolbar className={classes.appBar}>
                <Link to={"/"}>
                    <img className={classes.logo} src="imgs/hwlogo.png" alt="hwlogo" />
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
                        <span className={classes.mostSearched}>Most searched </span>
                        {loading && <span>loading...</span>}
                        {searchs.map(search => {
                            return (
                                <Link to={`/search?q=${search.query}`} key={search.query} className={classes.top5a}>
                                    <Typography variant="subtitle2" component="span" className={classes.top5t}>
                                        {search.query}
                                    </Typography>
                                </Link>
                            );
                        })}

                    </div>
                </div>


                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    {!!user &&
                        <div>
                            <Link to={"/favorites"}>
                                <Tooltip title="Favorites" aria-label="favorites">
                                    <IconButton aria-label="favorites" color="inherit">
                                        <FavoriteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <Link to={"/collection"}>
                                <Tooltip title="My Collection" aria-label="collection">
                                    <IconButton aria-label="collection" color="inherit">
                                        <ListAltIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <Link to={`/trades/${user.uid}`}>
                                <Tooltip title="My Trades" aria-label="trades">
                                    <IconButton aria-label="collection" color="inherit">
                                        <RepeatIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </div>
                    }
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={props.menuId}
                        aria-haspopup="true"
                        onClick={props.handleProfileMenuOpen}
                        color="inherit"
                    >
                        {!!user ?
                            !!user.photoURL ?
                                <Avatar alt={user.displayName} src={user.photoURL} />
                                : <Avatar className={classes[randomColor()]}>{user.email.slice(0, 2).toUpperCase()}</Avatar>
                            : <AccountCircle />}
                    </IconButton>

                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={props.mobileMenuId}
                        aria-haspopup="true"
                        onClick={props.handleMobileMenuOpen}
                        color="inherit"
                    >
                        {!!user ?
                            !!user.photoURL ?
                                <Avatar alt={user.displayName} src={user.photoURL} />
                                : <Avatar className={classes[randomColor()]}>{user.email.slice(0, 2).toUpperCase()}</Avatar>
                            : <AccountCircle />}
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default DefaultAppBar;