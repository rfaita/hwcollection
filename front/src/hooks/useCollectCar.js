import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const useCollectCar = (collected) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const didMount = useRef(false);


    useEffect(() => {
        if (didMount.current) {
            setLoading(true);
            setError(false);
            
            axios({
                method: collected.collected ? 'POST' : 'DELETE',
                url: `${process.env.REACT_APP_API_URL}/api/collection/${collected.carId}`
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
    }, [collected]);

    return { loading, error };
}

export default useCollectCar;