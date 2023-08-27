import React, {useState} from 'react';
import s from '../Filter.module.scss';
import TextField from '../../../../TextField';
import InputAdornment from '@mui/material/InputAdornment';

const Range = (props) => {
  const {name, checked, onSave, onChange, unit} = props;

  const [minValue, _setMinValue] = useState(checked[name]?.min);
  const [maxValue, _setMaxValue] = useState(checked[name]?.max);

  React.useEffect(() => {
    _setMinValue(checked[name]?.min);
  }, [checked[name]?.min]);
  React.useEffect(() => {
    _setMaxValue(checked[name]?.max);
  }, [checked[name]?.max]);

  const setMin = (val) => _setMinValue(val);
  const setMax = (val) => _setMaxValue(val);

  const onBlur = (val, type) => {
    if (type === 'min') {
      setMin(val);
    }

    if (type === 'max') {
      setMax(val);
    }

    onChange(name, type, val);
    onSave(name, type, val);
  };

  return (
    <div className={s.price}>
      <TextField
        onBlur={({target: {value}}) => onBlur(value, 'min')}
        value={minValue}
        onChange={({target: {value}}) => setMin(value)}
        id='outlined-basic'
        variant='outlined'
        placeholder={'0'}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{unit}</InputAdornment>
        }}
      />
      <div className={s.rangeSeparator} />
      <TextField
        onBlur={({target: {value}}) => onBlur(value, 'max')}
        value={maxValue}
        onChange={({target: {value}}) => setMax(value)}
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

export default Range;
