import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../providers/LoginProvider';

const useFavoriteCar = (favorited) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const didMount = useRef(false);

    const { token } = useContext(LoginContext);

    useEffect(() => {
        if (didMount.current) {
            setLoading(true);
            setError();

            axios({
                method: favorited.favorited ? 'POST' : 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
                url: `${process.env.REACT_APP_API_URL}/api/favorite/${favorited.carId}`
            }).then(res => {

                setLoading(false);

            }).catch(e => {
                setError(e);
                setLoading(false);

            });

            return () => { };
        } else {
            if (!!favorited && !!token) {
                didMount.current = true;
            }
        }
    }, [favorited, token]);

    return { loading, error };
}

export default useFavoriteCar;