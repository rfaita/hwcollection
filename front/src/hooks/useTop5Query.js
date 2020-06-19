import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../providers/LoginProvider';

const useTop5Query = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchs, setSearchs] = useState([]);

    const { token } = useContext(LoginContext);


    useEffect(() => {

        setLoading(true);
        setError(false);

        axios({
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            url: `${process.env.REACT_APP_API_URL}/api/search/top5`
        }).then(res => {
            setSearchs(res.data);
            setLoading(false);

        }).catch(e => {
            setError(true);
            setLoading(false);

        });

        return () => { };

    }, [token]);

    return { loading, error, searchs };
}

export default useTop5Query;