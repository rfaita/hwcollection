import { useEffect, useState } from 'react';
import axios from 'axios';

const useTop5Query = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchs, setSearchs] = useState([]);
    
    useEffect(() => {

        setLoading(true);
        setError(false);

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/api/public/search/top5`
        }).then(res => {
            setSearchs(res.data);
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);

        });

        return () => { };

    }, []);

    return { loading, error, searchs };
}

export default useTop5Query;