import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useTradesByUserId from '../hooks/useTradesByUserId';
import CarTradeGrid from '../components/main/CarTradeGrid';

const Trade = (props) => {

    let { userId } = useParams();

    const [page, setPage] = useState(0);

    const { trades, loading, hasMore, reload } = useTradesByUserId(userId, page);

    const reloadTrades = useCallback(() => {
        setPage(0);
        reload();
    }, [reload]);

    const observer = useRef();
    const lastTradeElementRef = useCallback(node => {
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
        <CarTradeGrid loading={loading} trades={trades} reloadTrades={reloadTrades} lastTradeElementRef={lastTradeElementRef} />
    )
}

export default Trade;