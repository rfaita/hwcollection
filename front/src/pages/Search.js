import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CarGrid from '../components/main/CarGrid';

import useCarsSearch from '../hooks/useCarsSearch';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Search = (props) => {

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
        <CarGrid cars={cars} loading={loading} lastCarElementRef={lastCarElementRef}
            emptyMessage="Your search do not return cars, try another query" />
    );

}


export default Search;