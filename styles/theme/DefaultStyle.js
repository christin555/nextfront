import React from 'react';
import {defaultPalette} from './defaultPalette';
import { createTheme, responsiveFontSizes  } from '@mui/material/styles';

let theme = createTheme({
  palette: defaultPalette,
  typography: {
    'fontFamily': `"Roboto", "Arial", sans-serif`,
    'fontSize': 16,
    'fontWeightLight': 300,
    'fontWeightRegular': 400,
    'fontWeightMedium': 500,
    fontWeightBold: 400,
    'body1': {
      'fontSize': 16,
      fontWeight: 300
    }
  }
})

theme = responsiveFontSizes(theme);
export default theme;
