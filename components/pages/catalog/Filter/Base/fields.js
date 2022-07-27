import FormCheckbox from "./FormCheckbox";
import React from "react";
import Price from "./Price";

const isChecked = (checked, key, value) => !!checked[`${key}-${value}`];
const isDisabled = (disabled, key, value) => disabled[`${key}-${value}`];

// eslint-disable-next-line react/display-name
const Fields = ({checked, disabled, values, setValue, setPrice, setPricePath}) => (key) => {
    if (key === 'price') {
        return <Price
            minPrice={checked?.minPrice}
            maxPrice={checked?.maxPrice}
            checked={checked}
            onChange={setPrice}
            onSave={setPricePath}
        />
    }

    if ( ['isSale', 'substrateThickness', 'isPopular'].includes(key)) {
        return <FormCheckbox
            checked={isChecked(checked, key, 1)}
            name={'Да'}
            id={1}
            onChange={setValue(key)}
        />
    }

    return values[key]?.map(({id, name}) => {
            return <FormCheckbox
                checked={isChecked(checked, key, id)}
                key={id}
                name={name}
                id={id}
                disabled={isDisabled(disabled, key, id)}
                onChange={setValue(key)}
            />
        }
    );
}

export default Fields;
