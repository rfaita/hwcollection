import React, { Fragment, useState } from 'react';
import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, makeStyles, LinearProgress } from '@material-ui/core';
import CarTradeItem from './CarTradeItem';

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: theme.spacing(9),
        flexGrow: 1,
    },
    wts: {
        background: theme.palette.primary.backgroundGradientWts
    },
    wtb: {
        background: theme.palette.primary.backgroundGradientWtb
    },
    white: {
        color: theme.palette.common.white
    },
    loading: {
        background: theme.palette.primary.backgroundGradient
    },
}));

const CarTradeGrid = (props) => {

    const [showWts, setShowWts] = useState(true);
    const [showWtb, setShowWtb] = useState(true);

    const classes = useStyles();

    return (
        <div className={classes.content}>

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

                        {showWts && !!props.trades &&
                            <Fragment>
                                {props.trades.filter(trade => trade.type === "WTS").map((trade, index) => {
                                    return (
                                        <div ref={props.trades.filter(trade => trade.type === "WTS").length === index + 1 ? props.lastTradeElementRef : null} key={trade.id}>
                                            <CarTradeItem trade={trade} />
                                        </div>
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
                        {showWtb && !!props.trades &&
                            <Fragment>
                                {props.trades.filter(trade => trade.type === "WTB").map((trade, index) => {
                                    return (
                                        <div ref={props.trades.filter(trade => trade.type === "WTB").length === index + 1 ? props.lastTradeElementRef : null} key={trade.id}>
                                            <CarTradeItem trade={trade} />
                                        </div>
                                    );
                                })}
                            </Fragment>
                        }
                    </List>
                </Grid>
            </Grid>
            {props.loading && <LinearProgress className={classes.loading} />}
        </div>
    );
}

export default CarTradeGrid;