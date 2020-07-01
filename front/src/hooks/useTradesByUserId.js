import { useEffect, useState } from 'react';
import axios from 'axios';

const useTradesByUserId = (userId, page) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [trades, setTrades] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [_reload, _setReload] = useState({});

    const reload = () => {
        _setReload({});
    }

    useEffect(() => {
        setTrades([]);
    }, [userId, _reload])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;

        if (!!userId) {

            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/api/public/trade/byUserId/${userId}`,
                params: { page, size: 20 },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setTrades(prevTrades => {
                    return [...prevTrades, ...res.data.content];
                });
                setHasMore(!res.data.last)
                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
                if (axios.isCancel(e)) {
                    return;
                }
            });

            return () => cancel();
        }
        return () => { };

    }, [userId, page, _reload]);

    return { loading, error, trades, hasMore, reload };
}

export default useTradesByUserId;
