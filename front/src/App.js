import React from 'react';
import LoginProvider from "./providers/LoginProvider";
import Application from './Application';

export default function App(props) {
    return (
        <LoginProvider>
            <Application />
        </LoginProvider>
    );
}