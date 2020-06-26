import { useEffect, useState } from 'react';
import axios from 'axios';

const useTrades = (carId, page) => {

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
    }, [carId, _reload])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;

        if (!!carId) {

            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/api/public/trade/${carId}`,
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

    }, [carId, page, _reload]);

    return { loading, error, trades, hasMore, reload };
}

export default useTrades;
