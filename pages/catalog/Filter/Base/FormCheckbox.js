import React from 'react';
import {FormControlLabel} from '@mui/material';
import s from '../Filter.module.scss';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

const FormCheckbox = (props) => {
  const {checked, onChange, name, id, disabled} = props;

  const handleChecked = (evt) => {
    if (onChange) {
      onChange(evt.target.checked, {name, id});
    }
  };

  return (
    <FormControlLabel
      className={s.checkboxControl}
      key={id}
      control={(
        <Checkbox
          disabled={disabled}
          size={'small'}
          checked={checked}
          onChange={handleChecked}
          name='checkedA'
        />
      )}
      label={name}
    />
  );
};

FormCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number,
  disabled: PropTypes.bool
};

export default FormCheckbox;
