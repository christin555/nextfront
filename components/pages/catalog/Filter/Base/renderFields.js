import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import SimpleAccordion from './SimpleAccordion';
import {toJS} from 'mobx';
import {fields} from './fields';
import {Skeleton} from "@mui/material";

@inject(({FilterStore}) => {
    return {
        values: FilterStore.values,
        fieldsLabel: FilterStore.fieldsLabel,

        setValue: FilterStore.setValue,
        setPrice: FilterStore.setPrice,
        setPricePath: FilterStore.setPricePath,

        checked: toJS(FilterStore.checked),
        disabled: toJS(FilterStore.disabled),

        hasKey: FilterStore.hasKey
    };
}) @observer
class Fields extends Component {
    render() {
        const {checked, addFields, disabled, values, setValue, fieldsLabel, setPricePath, setPrice, hasKey} = this.props;

        if (!Object.keys(values).length) {
            return [0, 1, 2, 3, 4].map((i) =>
                <Skeleton key={i} style={{ marginTop: 20 }}/>)
        }

        const filterFields = fields({checked, setPricePath, setPrice, disabled, values, setValue});
        const keys = [...addFields, ...Object.keys(values)]


        return (
            <React.Fragment>
                {
                    keys.map((key) => {
                        return (
                            <SimpleAccordion key={key} id={key} name={fieldsLabel[key]} active={hasKey(key)}>
                                {filterFields(key)}
                            </SimpleAccordion>
                        )
                    })
                }
            </React.Fragment>
        );
    }
}

Fields.propTypes = {
    collections: PropTypes.array,
    finishingMaterials: PropTypes.array,
    setCollection: PropTypes.func,
    setFinishingMaterial: PropTypes.func,
    checkedCollections: PropTypes.object
};

export default Fields;
