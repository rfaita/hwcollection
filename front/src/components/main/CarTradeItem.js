import React, { Fragment, useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RepeatIcon from '@material-ui/icons/Repeat';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { ListItemAvatar, Avatar, Badge, Chip, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../providers/LoginProvider';
import useTradeCancel from '../../hooks/useTradeCancel';


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


const CarTradeItem = ({trade, reloadTrades}) => {

    const classes = useStyles();

    const { user } = useContext(LoginContext);

    const [tradeId, setTradeId] = useState();

    const { loading, error, done } = useTradeCancel(tradeId);

    const cancel = () => {
        setTradeId(trade.id);
    }

    useEffect(() => {
        if (done) {
            reloadTrades();
        }
    }, [done, reloadTrades]);


    return (
        <Fragment>
            <ListItem>
                <ListItemAvatar>
                    <Badge classes={{ badge: classes[trade.type.toLowerCase()] }} overlap="circle"
                        badgeContent={trade.type}
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
                                {trade.title}
                            </Typography>
                            <Link to={`/search?q=${!!trade.car.key ? trade.car.key : trade.car.name}`}>
                                <Typography variant="button" component="div">
                                    {trade.car.name}
                                </Typography>
                            </Link>
                            <Link to={`/trades/${trade.userId}`}>
                                <Chip
                                    size="small"
                                    color="default"
                                    avatar={
                                        <Avatar style={{ height: 20, width: 20 }}>{trade.user?.rank}</Avatar>
                                    }
                                    label={trade.user?.email}
                                    variant="outlined"
                                    onClick={() => console.log("asdasd")}
                                />
                            </Link>
                        </Fragment>
                    }
                    secondary={
                        <Typography variant="overline" component="div">
                            <Moment format="MM/DD/YYYY HH:mm">
                                {trade.createdAt}
                            </Moment>
                        </Typography>
                    }
                />
                <ListItemSecondaryAction>
                    {trade.user.uid !== user?.uid ?
                        <Tooltip title="Start trade" >
                            <IconButton aria-label="trade">
                                <RepeatIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Remove trade" >
                            <IconButton aria-label="trade" disabled={loading} onClick={cancel}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </Fragment>
    )
}

export default CarTradeItem;