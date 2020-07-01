import React, { forwardRef, useState, Fragment, useContext, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import RepeatIcon from '@material-ui/icons/Repeat';

import Slide from '@material-ui/core/Slide';
import {  Tooltip, Fab } from '@material-ui/core';

import useTrades from '../../hooks/useTrades';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../providers/LoginProvider';
import CarTradeCreate from './CarTradeCreate';
import CarTradeGrid from './CarTradeGrid';


const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.primary.backgroundGradient,
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
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
}));

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CarTrade = (props) => {

    const classes = useStyles();

    const history = useHistory();
    const { user } = useContext(LoginContext);

    const [openTradeCreate, setOpenTradeCreate] = useState(false);

    const handleCloseTradeCreate = useCallback(() => {
        setOpenTradeCreate(false);
    }, []);

    const [page, setPage] = useState(0);

    const { trades, loading, hasMore, reload } = useTrades(props.car?.id, page);

    const observer = useRef();
    const lastTradeElementRef = useCallback(node => {
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

    const create = () => {
        if (!!user) {
            setOpenTradeCreate(true);
        } else {
            history.push("/login");
        }
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
                        <CarTradeGrid loading={loading} trades={trades} lastTradeElementRef={lastTradeElementRef} /> 
                        <Fab aria-label="trade" color="primary" className={classes.fab} disabled={loading} onClick={create}>
                            <Tooltip title="Create a trade">
                                <RepeatIcon />
                            </Tooltip>
                        </Fab>
                        <CarTradeCreate car={props.car} open={openTradeCreate} handleClose={handleCloseTradeCreate} reloadTrades={reload} />
                    </Dialog>
                </Fragment>

            }
        </div>
    );

}

export default CarTrade;