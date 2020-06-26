import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import Car from '../components/main/Car';
import useCarsSearch from '../hooks/useCarsSearch';
import CarTrade from '../components/main/CarTrade';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
    loading: {
        background: theme.palette.primary.backgroundGradient
    },
    sad: {
        marginRight: theme.spacing(1),

    }
}));

const Search = (props) => {

    const classes = useStyles();

    const [query, setQuery] = useState(props.query);
    const [page, setPage] = useState(0);

    const [openTrade, setOpenTrade] = useState(false);
    const [carTrade, setCarTrade] = useState();

    const handleOpenTrade = (car) => {
        setOpenTrade(true);
        setCarTrade(car);
    };

    const handleCloseTrade = () => {
        setOpenTrade(false);
        setCarTrade(null);
    };

    const queryParam = useQuery();

    let q = queryParam.get("q");

    useEffect(() => {
        if (!!q) {
            setQuery(q);
        } else {
            setQuery(new Date().getFullYear() + '');
        }
        setPage(0);
    }, [q])

    const {
        loading,
        cars, hasMore
    } = useCarsSearch(query, page);

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
                    <div>
                        <Grid container spacing={2}>
                            {cars.map((car, index) => {
                                return (
                                    <Grid ref={cars.length === index + 1 ? lastCarElementRef : null} item xs={12} md={6} lg={3} key={car.id}>
                                        <Car car={car} handleOpenTrade={handleOpenTrade} />
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
                        {!loading &&
                            <Typography variant="body">
                                <SentimentVeryDissatisfiedIcon className={classes.sad} />
                                Your search do not return cars, try another query
                            </Typography>}
                    </div>
                }
            </div>

            {loading && <LinearProgress className={classes.loading} />}
        </div>
    );

}


export default Search;