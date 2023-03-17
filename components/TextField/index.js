import React from 'react';
import TextFieldUi from '@mui/material/TextField';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard',
            },
            styleOverrides: {
                root: {
                    '& [class*="MuiInputLabel"]': {
                        //display: 'none',
                        transition: 'none'
                    },
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
                        'padding': '4px 6px',
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
                        fontSize: '14px',
                        margin: '0px',
                        lineHeight: '16px'
                    },

                    '& [class*="MuiOutlinedInput-root"]': {
                        'padding': '5px 4px',
                        'borderRadius': '2px',
                        'fontSize': '16px',
                        'lineHeight': '18px',
                        backgroundColor: 'white',
                        'border': `1px solid ${'rgb(182,182,182)'}`,
                        '&:hover:not(:focus):not(:disabled)': {
                            borderColor: 'rgba(109,109,109,0.99)'
                        },
                        '&:focus, &:focus-within': {
                            border: `1px solid ${'rgba(68,67,67,0.83)'}`
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
     <TextFieldUi {...props} />
 </ThemeProvider>
);

export default TextField;
