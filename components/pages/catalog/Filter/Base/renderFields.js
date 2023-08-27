import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import SimpleAccordion from './SimpleAccordion';
import {toJS} from 'mobx';
import fields from './fields';
import {Skeleton} from '@mui/material';

@inject(({RootStore, RootStore: {ActiveFilterStore}}) => {
  return {
    values: ActiveFilterStore.values || {},
    fieldsLabel: ActiveFilterStore.fieldsLabel,
    unit: ActiveFilterStore.unitPrice,

    setValue: ActiveFilterStore.setValue,
    setPrice: ActiveFilterStore.setPrice,
    setPricePath: ActiveFilterStore.setPricePath,

    checked: toJS(ActiveFilterStore.checked),
    disabled: toJS(ActiveFilterStore.disabled),

    hasKey: ActiveFilterStore.hasKey,

    setRange: ActiveFilterStore.setRange,
    setRangePath: ActiveFilterStore.setRangePath,
  };
}) @observer
class Fields extends Component {
  render() {
    const {
      checked,
      addFields,
      disabled,
      values,
      setValue,
      fieldsLabel,
      setPricePath,
      setPrice,
      hasKey,
      unit,
      setRange,
      setRangePath
    } = this.props;

    if (!Object.keys(values).length) {
      return [0, 1, 2, 3, 4].map((i) =>
        <Skeleton key={i} style={{marginTop: 20}} />);
    }

    console.log('values')
    const filterFields = fields({
      checked, unit, setPricePath, setPrice, disabled, values, setValue,
      setRange,
      setRangePath
    });
    const keys = [...addFields, ...Object.keys(values)];

    return keys.map((key) => (
      <SimpleAccordion
        key={key}
        id={key}
        name={fieldsLabel[key]}
        active={hasKey(key)}
      >
        {filterFields(key)}
      </SimpleAccordion>
    ));
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
