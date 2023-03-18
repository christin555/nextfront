import React, {useState} from 'react';
import {FormControlLabel} from '@mui/material';
import s from '../Filter.module.scss';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import TextField from '../../../../TextField';
import formatPrice from '../../../../../src/utils/formatPrice';
//import TextField from '@mui/material/TextField';

const MAX = 4200;
const MIN = 1000;

const Price = (props) => {
  const {checked, onSave, onChange, unit} = props;

  const [minPrice, _setMinPrice] = useState(formatPrice({price: checked.minPrice, unit}));
  const [maxPrice, _setMaxPrice] = useState(formatPrice({price: checked.maxPrice, unit}));

  const setMinPrice = (price) => _setMinPrice(formatPrice({price, unit}));
  const setMaxPrice = (price) => _setMaxPrice(formatPrice({price, unit}));

  const onBlur = (val, type) => {
    const _val = parseInt(val.replace(/\s+/g, ''), 10);

    if (type === 'minPrice') {
      setMinPrice(_val);
    }

    if (type === 'maxPrice') {
      setMaxPrice(_val);
    }

    onChange(_val, type);
    onSave(_val, type);
  };

  return (
    <div className={s.price}>
      <TextField
        onBlur={({target: {value}}) => onBlur(value, 'minPrice')}
        value={minPrice}
        onChange={({target: {value}}) => setMinPrice(value)}
        id='outlined-basic'
        variant='outlined'
        placeholder={'1 000'}
      />
      <div className={s.rangeSeparator} />
      <TextField
        onBlur={({target: {value}}) => onBlur(value, 'maxPrice')}
        value={maxPrice}
        onChange={({target: {value}}) => setMaxPrice(value)}
        id='outlined-basic'
        variant='outlined'
        placeholder={'4 200'}
      />
    </div>
  );
};

export default Price;
