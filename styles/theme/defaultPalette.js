import variables from '../variables.module.scss';

const defaultPalette = {
    main: variables['main-blue'],
    secondary: {
        main: '#e33371'
    },
    primary: {
        main: '#42a5f5'
    },
    mainblue: variables['main-blue'],
    white: variables.white,
    gray20: variables['gray-20'],
    gray10: variables['gray-10'],
    gray40: variables['gray-40'],
    gray10010: variables['gray-100-10'],
    gray10040: variables['gray-100-40'],
    gray300: variables['gray-300'],
    gray400: variables['gray-400'],
    gray500: variables['gray-500'],
    black: variables.black,
    mainblue40: variables['main-blue-40'],
    maingreen: variables['main-green'],
    green100: variables['green-100']
};

export {
    defaultPalette
};
