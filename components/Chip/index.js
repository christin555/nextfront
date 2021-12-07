import React from 'react';
import s from './style.module.scss';
import ChipUi from '@mui/material/Chip';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {defaultPalette} from "../../styles/theme/defaultPalette";

const theme = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    '&[class*="MuiChip-colorPrimary"]': {
                        backgroundColor: defaultPalette.gray10010,
                        color: 'black',
                        border: 'none'
                    }
                }
            },
            deleteIcon: {
                color: defaultPalette.gray10040,
                fontSize: '20px'
            }
        }
    }
});

const Chip = ({label, variant, color, onDelete, deleteIcon}) => (
    <ThemeProvider theme={theme}>
        <ChipUi
            className={s.chip}
            color={color}
            variant={variant}
            label={label}
            onDelete={onDelete}
            deleteIcon={deleteIcon}
        />
    </ThemeProvider>
);

export default Chip;
