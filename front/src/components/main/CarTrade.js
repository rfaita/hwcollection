import React, { forwardRef, useState, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import RepeatIcon from '@material-ui/icons/Repeat';

import Slide from '@material-ui/core/Slide';
import { Grid, Switch, ListItemSecondaryAction, Tooltip, Fab, LinearProgress } from '@material-ui/core';

import CarTradeItem from './CarTradeItem';
import useTrades from '../../hooks/useTrades';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../providers/LoginProvider';
import CarTradeCreate from './CarTradeCreate';


const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.primary.backgroundGradient,
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    wts: {
        background: theme.palette.primary.backgroundGradientWts
    },
    wtb: {
        background: theme.palette.primary.backgroundGradientWtb
    },
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
        marginRight: theme.spacing(3),
    },
    fab: {
        position: 'fixed',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        zIndex: 99999
    },
    content: {
        marginTop: theme.spacing(9),
        flexGrow: 1,
    },
    white: {
        color: theme.palette.common.white
    },
    loading: {
        background: theme.palette.primary.backgroundGradient
    },
}));

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CarTrade = (props) => {

    const classes = useStyles();

    const history = useHistory();
    const { user } = useContext(LoginContext);

    const [showWts, setShowWts] = useState(true);
    const [showWtb, setShowWtb] = useState(true);

    const [openTradeCreate, setOpenTradeCreate] = useState(false);

    const handleCloseTradeCreate = () => {
        setOpenTradeCreate(false);
    };

    const [page, setPage] = useState(0);

    const { trades, loading, hasMore, reload } = useTrades(props.car?.id, page);

    const create = () => {
        if (!!user) {
            setOpenTradeCreate(true);
        } else {
            history.push("/login");
        }
    }


    const reloadTrades = () => {
        reload();
    }


    return (
        <div>
            {!!props.car &&
                <Fragment>
                    <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar} position="fixed">
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    {props.car.name} - Trades
                                </Typography>
                                <IconButton edge="end" color="inherit" onClick={props.handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.content}>
                            {!loading &&
                                <Grid container>
                                    <Grid item xs={12} md={6} lg={6} key="in">
                                        <List>
                                            <ListItem className={classes.wts}>
                                                <ListItemText primary="Want to Sell" className={classes.white} />
                                                <ListItemSecondaryAction>
                                                    <Switch
                                                        edge="end"
                                                        color="default"
                                                        onChange={() => { setShowWts(prev => !prev) }}
                                                        checked={showWts}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>

                                            {showWts && !!trades &&
                                                <Fragment>
                                                    {trades.filter(trade => trade.type === "WTS").map(trade => {
                                                        return (
                                                            <CarTradeItem trade={trade} key={trade.id} />
                                                        );
                                                    })}
                                                </Fragment>
                                            }

                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6} key="out">
                                        <List>
                                            <ListItem className={classes.wtb}>
                                                <ListItemText primary="Want to Buy" className={classes.white} />
                                                <ListItemSecondaryAction>
                                                    <Switch
                                                        edge="end"
                                                        color="default"
                                                        onChange={() => { setShowWtb(prev => !prev) }}
                                                        checked={showWtb}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            {showWtb && !!trades &&
                                                <Fragment>
                                                    {trades.filter(trade => trade.type === "WTB").map(trade => {
                                                        return (
                                                            <CarTradeItem trade={trade} key={trade.id} />
                                                        );
                                                    })}
                                                </Fragment>
                                            }
                                        </List>
                                    </Grid>
                                </Grid>
                            }
                            {loading && <LinearProgress className={classes.loading} />}
                        </div>
                        <Fab aria-label="trade" color="primary" className={classes.fab} disabled={loading} onClick={create}>
                            <Tooltip title="Create a trade">
                                <RepeatIcon />
                            </Tooltip>
                        </Fab>
                        <CarTradeCreate car={props.car} open={openTradeCreate} handleClose={handleCloseTradeCreate} reloadTrades={reloadTrades} />
                    </Dialog>
                </Fragment>

            }
        </div>
    );

}

export default CarTrade;