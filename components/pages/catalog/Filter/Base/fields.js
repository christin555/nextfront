import FormCheckbox from './FormCheckbox';
import React from 'react';
import Price from './Price';

const isChecked = (checked, key, value) => !!checked[`${key}-${value}`];
const isDisabled = (disabled, key, value) => disabled[`${key}-${value}`];

// eslint-disable-next-line react/display-name
const Fields = ({checked, unit, disabled, values, setValue, setPrice, setPricePath}) => (key) => {
  if (key === 'price') {
    return (
      <Price
        checked={checked}
        onChange={setPrice}
        onSave={setPricePath}
        unit={unit}
      />
    );
  }

  return values[key]?.map(({id, name, img}) => (
    <FormCheckbox
      img={img}
      checked={isChecked(checked, key, id)}
      key={id}
      name={name}
      id={id}
      disabled={isDisabled(disabled, key, id)}
      onChange={setValue(key)}
    />
  ));
};

export default Fields;
