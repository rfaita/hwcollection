import React, { useState, useContext, useRef, useCallback } from 'react';
import { Grid, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import Car from '../components/main/Car';
import useCarsCollection from '../hooks/useCarsCollection';
import { LoginContext } from '../providers/LoginProvider';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles((theme) => ({
    loading: {
        background: theme.palette.primary.backgroundGradient
    },
    sad: {
        marginRight: theme.spacing(1),

    }
}));


const Collection = (props) => {

    const classes = useStyles();

    const [page, setPage] = useState(0);

    const { user } = useContext(LoginContext);

    const {
        loading,
        cars, hasMore
    } = useCarsCollection(user?.uid, page);


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

    return (
        <div>

            <div>
                {cars.length > 0 ?
                    <Grid container spacing={2}>
                        {cars.map((car, index) => {
                            return (
                                <Grid ref={cars.length === index + 1 ? lastCarElementRef : null} item xs={12} md={6} lg={3} key={car.id}>
                                    <Car car={car.car} />
                                </Grid>
                            );
                        })}
                    </Grid>
                    :
                    <div>
                        {!loading &&
                            <Typography variant="body">
                                <SentimentVeryDissatisfiedIcon className={classes.sad} />
                            Your collection is empty, start adding some cars
                        </Typography>
                        }
                    </div>
                }
            </div>

            {loading && <LinearProgress className={classes.loading} />}
        </div>
    );

}

export default Collection;