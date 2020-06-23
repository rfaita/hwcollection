import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Grid, LinearProgress, makeStyles } from '@material-ui/core';
import Car from './Car';
import useCarsSearch from './hooks/useCarsSearch';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
    loading: {
        background: 'linear-gradient(90deg, #FF8E53 30%, #FF2424 90%)',
    },
}));

const Search = (props) => {

    const classes = useStyles();

    const [query, setQuery] = useState(props.query);
    const [page, setPage] = useState(0);

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
            <Grid container spacing={2}>
                {cars.map((car, index) => {
                    return (
                        <Grid ref={cars.length === index + 1 ? lastCarElementRef : null} item xs={12} md={6} lg={3} key={car.id}>
                            <Car car={car} />
                        </Grid>
                    );
                })}

            </Grid>
            {loading && <LinearProgress color="secondary" className={classes.loading} />}
        </div>
    );

}


export default Search;