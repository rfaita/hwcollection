import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RepeatIcon from '@material-ui/icons/Repeat';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { ListItemAvatar, Avatar, Badge, Chip, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Moment from 'react-moment';


const useStyles = makeStyles((theme) => ({
    wts: {
        background: theme.palette.primary.wts
    },
    wtb: {
        background: theme.palette.primary.wtb
    },
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
        marginRight: theme.spacing(1),
    },
}));


const CarTradeItem = (props) => {

    const classes = useStyles();

    return (
        <Fragment>
            <ListItem>
                <ListItemAvatar>
                    <Badge classes={{ badge: classes[props.trade.type.toLowerCase()] }} overlap="circle"
                        badgeContent={props.trade.type}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }} >
                        <Avatar className={classes.large} >
                            <ImageIcon />
                        </Avatar>
                    </Badge>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Fragment>
                            <Typography variant="button" component="div">
                                {props.trade.title}
                            </Typography>
                            <Chip
                                size="small"
                                color="default"
                                avatar={
                                    <Avatar style={{ height: 20, width: 20 }}>{props.trade.user?.rank}</Avatar>
                                }
                                label={props.trade.user?.email}
                                variant="outlined"
                                onClick={() => console.log("asdasd")}
                            />
                        </Fragment>
                    }
                    secondary={
                        <Typography variant="overline" component="div">
                            <Moment format="MM/DD/YYYY HH:mm">
                                {props.trade.createdAt}
                            </Moment>
                        </Typography>
                    }
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Start trade" >
                        <IconButton aria-label="trade">
                            <RepeatIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </Fragment>
    )
}

export default CarTradeItem;