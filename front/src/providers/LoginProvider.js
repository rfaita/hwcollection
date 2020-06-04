import React, { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
import axios from 'axios';

export const LoginContext = createContext({ user: null });

const LoginProvider = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setUser(userAuth);
            userAuth.getIdToken().then((token) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            });
        });

    }, []);

    return (
        <LoginContext.Provider value={user}>
            {props.children}
        </LoginContext.Provider>
    );

}

export default LoginProvider;