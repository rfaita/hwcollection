import React from 'react';
import Car from './Car';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Cars = (props) => {

    const classes = useStyles();

    let key = 0;

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {props.cars.map(car => {
                    return (
                        <Grid item xs={12} md={6} lg={3} key={key++}>
                            <Car car={car} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default Cars;