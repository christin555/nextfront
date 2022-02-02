import FormCheckbox from "./FormCheckbox";
import React from "react";
import Price from "./Price";

const isChecked = (checked, key, value) => !!checked[`${key}-${value}`];
const isDisabled = (disabled, key, value) => disabled[`${key}-${value}`];

const fields = ({checked, disabled, values, setValue, setPrice, setPricePath}) => (key) => {
    if(key === 'price') {
       return <Price
            minPrice={checked?.minPrice}
            maxPrice={checked?.maxPrice}
            checked={checked}
            onChange={setPrice}
            onSave={setPricePath}
        />
    }

    if(key === 'isPopular') {
        return  <FormCheckbox
            checked={isChecked(checked,'isPopular', 1)}
            name={'Да'}
            id={1}
            onChange={setValue('isPopular')}
        />
    }

    return values[key]?.map(({id, name}) => (
        <FormCheckbox
            checked={isChecked(checked, key, id)}
            key={id}
            name={name}
            id={id}
            disabled={isDisabled(disabled, key, id)}
            onChange={setValue(key)}
        />
    ));
}


export {
    fields
}
