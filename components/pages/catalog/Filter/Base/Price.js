import React from 'react';
import {FormControlLabel} from '@mui/material';
import s from '../Filter.module.scss';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import TextField from "../../../../TextField";
import formatPrice from "../../../../../src/utils/formatPrice";
//import TextField from '@mui/material/TextField';

const MAX = 4200;
const MIN = 1000;

const Price = (props) => {
    const {checked, onChange, onSave, name, id, disabled} = props;
    const _onChange = (val, type) => {
        let _val = val;

        if (val > MAX) {
            _val = MAX
        }

        onChange(_val, type)
    }
    const onBlur = (val, type) => {
        let _val = parseInt(val.replace(/\s+/g, ''),10);

        if (type === 'minPrice' && (_val < MIN || _val > MAX)) {
            _val = MIN;
            onChange(_val, type)
        }

        if (type === 'maxPrice' && (_val > MAX || _val < MIN)) {
            _val = MAX;
            onChange(_val, type)
        }
        onSave(_val, type)
    }

    const minPrice = formatPrice({price: checked?.minPrice, isSquare: false});
    const maxPrice = formatPrice({price:checked?.maxPrice, isSquare:  false});

    return (
        <div className={s.price}>
            <TextField
                onBlur={({target: {value}}) => onBlur(value, 'minPrice')}
                value={minPrice}
                onChange={({target: {value}}) => _onChange(value, 'minPrice')}
                id="outlined-basic" variant="outlined" placeholder={'1 000'}
            />
            <div className={s.rangeSeparator}/>
            <TextField
                onBlur={({target: {value}}) => onBlur(value, 'maxPrice')}
                value={maxPrice}
                onChange={({target: {value}}) => _onChange(value, 'maxPrice')}
                id="outlined-basic" variant="outlined" placeholder={'4 200'}/>
        </div>
    );
}


export default Price;
