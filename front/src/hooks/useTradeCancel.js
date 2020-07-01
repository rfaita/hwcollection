import { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { LoginContext } from '../providers/LoginProvider';

const useTradeCancel = (tradeId) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [done, setDone] = useState(false);

    const didMount = useRef(false);

    const { token } = useContext(LoginContext);


    useEffect(() => {
        if (didMount.current) {
            setLoading(true);
            setDone(false);
            setError(null);

            if (!!tradeId) {

                axios({
                    method: 'DELETE',
                    url: `${process.env.REACT_APP_API_URL}/api/trade/${tradeId}`,
                    headers: { 'Authorization': `Bearer ${token}` },
                }).then(res => {
                    setDone(true);
                    setLoading(false);
                }).catch(e => {
                    setError(e);
                    setLoading(false);
                });

                return () => { };
            }
        } else {
            if (!!token) {
                didMount.current = true;
            }
        }

    }, [tradeId, token]);

    return { loading, error, done };
}

export default useTradeCancel;