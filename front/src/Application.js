import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from './Main';

export default function Application() {
    return (
        <Router >
            <Main />
        </Router >

    );
}