import { useEffect, useState } from 'react';
import axios from 'axios';

const useCarsSearch = (query, page) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cars, setCars] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setCars([]);
    }, [query])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;

        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/car',
            params: { query, page, size: 20 },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setCars(prevCars => {
                return [...prevCars, ...res.data.content];
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
    }, [query, page]);

    return { loading, error, cars, hasMore };
}

export default useCarsSearch;