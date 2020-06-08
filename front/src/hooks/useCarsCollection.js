import { useEffect, useState } from 'react';
import axios from 'axios';

const useCarsCollection = (userId, page) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cars, setCars] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setCars([]);
    }, [userId])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;

        if (!!userId) {

            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/api/collection/${userId}`,
                params: { page, size: 20 },
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
        }
        return () => { };

    }, [userId, page]);

    return { loading, error, cars, hasMore };
}

export default useCarsCollection;