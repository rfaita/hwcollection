import React, { useState, useContext, useRef, useCallback } from 'react';

import useCarsFavorite from '../hooks/useCarsFavorite';
import { LoginContext } from '../providers/LoginProvider';
import CarGrid from '../components/main/CarGrid';

const Favorite = () => {

    const [page, setPage] = useState(0);

    const { user } = useContext(LoginContext);

    const {
        loading,
        cars, hasMore
    } = useCarsFavorite(user?.uid, page);


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
            emptyMessage="Your favorites is empty, start adding some cars" />
    );

}

export default Favorite;