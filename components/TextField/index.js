import React from 'react';
import TextFieldUi from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard',
            },
            styleOverrides: {
                root: {
                    '& [class*="notchedOutline"]': {
                        border: 'none'
                    },
                    '& [class*="MuiInput-underline"]': {
                        '&:before': {
                            borderBottom: '0.2px solid #575963'
                        },
                        '&:hover:not(:disabled):before, &:after ': {
                            borderBottom: '0.2px solid gray'
                        }
                    },
                    '& [class*="MuiInputBase-input"]': {
                        'padding': '2px 5px',
                        'minHeight': '20px',
                        '&:disabled': {
                            opacity: 0.5
                        },
                        '&::placeholder': {
                            color: 'rgb(213,213,213)',
                            opacity: 1
                        },
                        '&:focus::placeholder': {
                            opacity: 0.7
                        },
                        '&:hover:not(:focus):not(:disabled)': {
                            borderColor: 'rgba(201,15,15,0.99)'
                        },
                        '&:focus, &:focus-visible': {
                            'borderColor': 'none'
                        }
                    },
                    '& [class*="MuiFormHelperText-root"]': {
                        fontSize: '12px',
                        margin: '0px',
                        lineHeight: '16px'
                    },

                    '& [class*="MuiOutlinedInput-root"]': {
                        'padding': '8px 12px',
                        'borderRadius': '10px',
                        'fontSize': '14px',
                        'lineHeight': '20px',
                        backgroundColor: 'white',
                        'border': `1px solid ${'rgb(255,255,255)'}`,
                        '&:hover:not(:focus):not(:disabled)': {
                            borderColor: 'rgba(255,255,255,0.99)'
                        },
                        '&:focus, &:focus-within': {
                            border: `1px solid ${'rgba(217,217,217,0.83)'}`
                        },
                        '& svg': {
                            fontSize: '20px'
                        }
                    }
                },
            },
        },
    },
});


const TextField = (props) => (
 <ThemeProvider theme={theme}>
     <TextFieldUi {...props}/>
 </ThemeProvider>

);

export default TextField;
