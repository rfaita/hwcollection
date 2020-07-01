import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography, LinearProgress } from '@material-ui/core';
import CarTrade from './CarTrade';
import Car from './Car';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';


const useStyles = makeStyles((theme) => ({
    loading: {
        background: theme.palette.primary.backgroundGradient
    },
    sad: {
        marginRight: theme.spacing(1),
    }
}));

const CarGrid = (props) => {

    const classes = useStyles();

    const [openTrade, setOpenTrade] = useState(false);
    const [carTrade, setCarTrade] = useState();


    useEffect(() => {
        handleCloseTrade();
    }, [props.cars])

    const handleOpenTrade = (car) => {
        setOpenTrade(true);
        setCarTrade(car);
    };

    const handleCloseTrade = () => {
        setOpenTrade(false);
        setCarTrade(null);
    };

    return (
        <div>
            <div>
                {props.cars.length > 0 ?
                    <div>
                        <Grid container spacing={2}>
                            {props.cars.map((car, index) => {
                                return (
                                    <Grid ref={props.cars.length === index + 1 ? props.lastCarElementRef : null} item xs={12} md={6} lg={3} key={car.id}>
                                        <Car car={!!car.car ? car.car : car} handleOpenTrade={handleOpenTrade} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                        {!!carTrade &&
                            <CarTrade car={carTrade} open={openTrade} handleClose={handleCloseTrade} />
                        }
                    </div>
                    :
                    <div>
                        {!props.loading &&
                            <Typography variant="body1">
                                <SentimentVeryDissatisfiedIcon className={classes.sad} />
                                {props.emptyMessage}
                            </Typography>}
                    </div>
                }
            </div>

            {props.loading && <LinearProgress className={classes.loading} />}
        </div>
    );
}

export default CarGrid;