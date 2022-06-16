import React, {useState} from 'react';
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
    const {checked, onSave, onChange, name, id, disabled} = props;
    let [minPrice, setMinPrice] = useState(checked['minPrice']);
    let [maxPrice, setMaxPrice] = useState(checked['maxPrice']);

    const onBlur = (val, type) => {
        let _val = parseInt(val.replace(/\s+/g, ''), 10);

        if (type === 'minPrice') {
            setMinPrice(_val)
        }

        if (type === 'maxPrice') {
            setMaxPrice(_val)
        }

        onChange(_val, type);
        onSave(_val, type);
    }


    minPrice = formatPrice({price: minPrice, isSquare: false});
    maxPrice = formatPrice({price: maxPrice, isSquare: false});

    return (
        <div className={s.price}>
            <TextField
                onBlur={({target: {value}}) => onBlur(value, 'minPrice')}
                value={minPrice}
                onChange={({target: {value}}) => setMinPrice(value)}
                id="outlined-basic" variant="outlined" placeholder={'1 000'}
            />
            <div className={s.rangeSeparator}/>
            <TextField
                onBlur={({target: {value}}) => onBlur(value, 'maxPrice')}
                value={maxPrice}
                onChange={({target: {value}}) => setMaxPrice(value)}
                id="outlined-basic" variant="outlined" placeholder={'4 200'}/>
        </div>
    );
}


export default Price;
