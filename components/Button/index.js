import React from 'react';
import PropTypes from 'prop-types';
import ButtonUi from '@mui/material/Button';
import cn from 'classnames';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Bed} from "@mui/icons-material";

const theme = createTheme({
    palette: {
        secondary: {
            main: '#D93310',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    minHeight: '40px',
                    height: 'min-content',
                    lineHeight: '24px',
                    letterSpacing: '.25px',
                    textTransform: 'none',
                    boxSizing: 'border-box',
                    boxShadow: 'none',
                    minWidth: 0,
                    '&:hover, &:active': {
                        boxShadow: 'none'
                    },
                    '& [class*="btnLabel"]': {
                        width: '100%',
                        display: 'inherit',
                        alignItems: 'inherit',
                        justifyContent: 'inherit',
                        whiteSpace: 'nowrap'
                    },
                    '&[class*="contained"]': {
                        padding: '8px 12px',
                        borderRadius: 0,
                        color: 'white'
                    },
                    '&[class*="outlined"]': {
                        color: 'black',
                        border: `black 1px solid`,
                        borderRadius: 0,
                        backgroundColor: 'inherit',
                        padding: '8px 12px',
                        '&[class*="active"]': {
                            color: 'gray',
                            backgroundColor: 'white'
                        },
                        '&:hover': {
                            color: 'black',
                            backgroundColor: 'black'
                        },
                    }
                }
            }
        }
    }
})


const Button = (props) => {
    const {
        children,
        variant,
        className,
        ...elementProps
    } = props;
    const classes = cn(variant, className);

    return (
        <ThemeProvider theme={theme}>
            <ButtonUi
                className={classes}
                variant={variant}
                disableElevation={true}
                disableFocusRipple={true}
                {...elementProps}>
                {children}
            </ButtonUi>
        </ThemeProvider>
    );
};

Button.propTypes = {
    /**
     Вид кнопки
     */
    variant: PropTypes.oneOf([
        'outlined',
        'dark',
        'contained'
    ]),
    /**
     Обработчик события клика на кнопку
     */
    onClick: PropTypes.func,
    /**
     Класс, который добавится к кнопке
     */
    className: PropTypes.string,
    /**
     * Текст кнопки
     */
    children: PropTypes.node
};

export default Button;
