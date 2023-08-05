import React from 'react';
import {FormControlLabel} from '@mui/material';
import s from '../Filter.module.scss';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import cn from 'classnames';

const FormCheckbox = (props) => {
  const {checked, onChange, name, id, disabled, img} = props;

  const handleChecked = (evt) => {
    if (onChange) {
      onChange(evt.target.checked, {name, id});
    }
  };

  return !disabled && (
    <FormControlLabel
      className={s.checkboxControl}
      key={id}
      control={(img ? (
        <div
          onClick={() => !disabled && onChange(!checked, {name, id})}
          className={cn(s.imgCheckbox, {[s.checked]: checked, [s.disabled]: disabled})}
        >
          <img src={img} alt={name} />
        </div>
      ) : (
        <Checkbox
          disabled={disabled}
          size={'small'}
          checked={checked}
          onChange={handleChecked}
          name='checkedA'
          style={{padding: '4px 9px'}}
          color={'secondary'}
        />
      )
      )}
      label={name}
    />
  ) || null;

};

FormCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number,
  disabled: PropTypes.bool
};

export default FormCheckbox;
