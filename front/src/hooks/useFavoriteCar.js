import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const useFavoriteCar = (favorited) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const didMount = useRef(false);


    useEffect(() => {
        if (didMount.current) {
            setLoading(true);
            setError(false);
            
            axios({
                method: favorited.favorited ? 'POST' : 'DELETE',
                url: `${process.env.REACT_APP_API_URL}/api/favorite/${favorited.carId}`
            }).then(res => {

                setLoading(false);

            }).catch(e => {
                setError(true);
                setLoading(false);
                
            });

            return () => { };
        } else {
            didMount.current = true;
        }
    }, [favorited]);

    return { loading, error };
}

export default useFavoriteCar;