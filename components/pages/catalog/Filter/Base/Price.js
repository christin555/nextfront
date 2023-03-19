import React, {useState} from 'react';
import s from '../Filter.module.scss';
import TextField from '../../../../TextField';
import formatPrice from '../../../../../src/utils/formatPrice';
import InputAdornment from '@mui/material/InputAdornment';

const Price = (props) => {
  const {checked, onSave, onChange, unit} = props;

  const [minPrice, _setMinPrice] = useState(formatPrice({price: checked.minPrice}));
  const [maxPrice, _setMaxPrice] = useState(formatPrice({price: checked.maxPrice}));

  React.useEffect(() => {
    _setMinPrice(formatPrice({price: checked.minPrice}));
  }, [checked.minPrice]);
  React.useEffect(() => {
    _setMaxPrice(formatPrice({price: checked.maxPrice}));
  }, [checked.maxPrice]);

  const setMinPrice = (price) => _setMinPrice(formatPrice({price}));
  const setMaxPrice = (price) => _setMaxPrice(formatPrice({price}));

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
        placeholder={'0'}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{unit}</InputAdornment>
        }}
      />
      <div className={s.rangeSeparator} />
      <TextField
        onBlur={({target: {value}}) => onBlur(value, 'maxPrice')}
        value={maxPrice}
        onChange={({target: {value}}) => setMaxPrice(value)}
        id='outlined-basic'
        variant='outlined'
        placeholder={'0'}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{unit}</InputAdornment>
        }}
      />
    </div>
  );
};

export default Price;
