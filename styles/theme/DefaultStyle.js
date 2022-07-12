import React from 'react';
import {defaultPalette} from './defaultPalette';
import {createTheme, responsiveFontSizes} from '@mui/material/styles';

let theme = createTheme({
    palette: defaultPalette,
    typography: {
        'fontFamily': `"Roboto", "Arial", sans-serif`,
        'fontSize': 14,
        'fontWeightLight': 400,
        'fontWeightRegular': 400,
        'fontWeightMedium': 500,
        fontWeightBold: 500,
        'h4': {
            fontWeight: 500
        },
        'body1': {
            'fontSize': 14,
            fontWeight: 400
        },
        'body2': {
            'fontSize': 14,
            fontWeight: 400
        },
    }
});

theme = responsiveFontSizes(theme);
export default theme;
