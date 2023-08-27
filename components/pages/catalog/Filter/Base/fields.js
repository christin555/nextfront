import FormCheckbox from './FormCheckbox';
import React from 'react';
import Price from './Price';
import Range from './Range';

const isChecked = (checked, key, value) => !!checked[`${key}-${value}`];
const isDisabled = (disabled, key, value) => disabled[`${key}-${value}`];

// eslint-disable-next-line react/display-name
const Fields = ({checked, unit, disabled, values, setValue, setPrice, setPricePath, setRange, setRangePath}) => (key) => {
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

  if (key.includes('Range')) {
    return (
      <Range
        name={key}
        checked={checked}
        onChange={setRange}
        onSave={setRangePath}
        unit={'мм'}
      />
    );
  }

  if (['isSale', 'substrateThickness', 'isPopular', 'forPainting'].includes(key)) {
    return (
      <FormCheckbox
        checked={isChecked(checked, key, 1)}
        name={'Да'}
        id={1}
        onChange={setValue(key)}
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
