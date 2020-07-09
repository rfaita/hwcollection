import React from 'react';
import LoginProvider from "./providers/LoginProvider";
import Application from './Application';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FF2424',
            backgroundGradient: 'linear-gradient(90deg, #FF8E53 30%, #FF2424 90%)',
            wts: '#d59999',
            backgroundGradientWts: '#d59999',//'linear-gradient(90deg, #d59999 10%, #FF2424 90%)',
            wtb: '#99c599',
            backgroundGradientWtb: ' #99c599',//'linear-gradient(90deg, #99c599 10%, #FF2424 90%)'
        },
        secondary: {
            main: '#FF2424',
        }
    },
});

export default function App() {


    return (
        <ThemeProvider theme={theme}>
            <LoginProvider>
                <Application />
            </LoginProvider>
        </ThemeProvider>
    );
}