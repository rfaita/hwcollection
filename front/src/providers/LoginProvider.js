import React, { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";

export const LoginContext = createContext({ user: null, token: null });

const LoginProvider = (props) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();


    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            if (!!userAuth) {
                userAuth.getIdToken().then((token) => {
                    setUser(userAuth);
                    setToken(token);
                });
            } else {
                setUser(null);
            }
        });

    }, []);

    return (
        <LoginContext.Provider value={{ user, token }}>
            {props.children}
        </LoginContext.Provider>
    );

}

export default LoginProvider;