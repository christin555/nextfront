import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import FormCheckbox from '../Base/FormCheckbox';
import SimpleAccordion from '../Base/SimpleAccordion';
import {toJS} from 'mobx';

@inject(({FilterStore}) => {
  return {
    collections: FilterStore.collections,
    brands: FilterStore.brands,
    finishingMaterials: FilterStore.finishingMaterials,
    setValue: FilterStore.setValue,
    isCollectionActive: FilterStore.isCollectionActive,
    isFinishingMaterialActive: FilterStore.isFinishingMaterialActive,
    checked: toJS(FilterStore.checked),
    isBrandActive: FilterStore.isBrandActive,

    disabled: toJS(FilterStore.disabled),
  };
})
class Fields extends Component {
  get brands() {
    return this.props.brands?.map(({id, name}) => (
        <FormCheckbox
            checked={this.isChecked('brandId', id)}
            key={id}
            name={name}
            id={id}
            onChange={this.props.setValue('brandId')}
        />
    ));
  }

  get collections() {
    return this.props.collections?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('collectionId', id)}
        key={id}
        name={name}
        id={id}
        disabled={this.isDisabled('collectionId', id)}
        onChange={this.props.setValue('collectionId')}
      />
    ));
  }

  get finishingMaterials() {
    return this.props.finishingMaterials?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('finishingMaterial', id)}
        key={id}
        name={name}
        id={id}
        disabled={this.isDisabled('finishingMaterial', id)}
        onChange={this.props.setValue('finishingMaterial')}
      />
    ));
  }

  isChecked = (key, value) => {
    const {checked} = this.props;

    return checked[`${key}-${value}`] || false;
  };

  isDisabled = (key, value) => {
    const {disabled} = this.props;

    return disabled[`${key}-${value}`];
  };

  render() {
    const {
      isFinishingMaterialActive,
      isCollectionActive,
      isBrandActive
    } = this.props;

    return (
      <React.Fragment>
        <SimpleAccordion id={3} name={'Фабрика'} active={isBrandActive}>
          {this.brands}
        </SimpleAccordion>
        <SimpleAccordion id={1} name={'Коллекция'} active={isCollectionActive}>
          {this.collections}
        </SimpleAccordion>
        <SimpleAccordion id={2} name={'Материал отделки'} active={isFinishingMaterialActive}>
          {this.finishingMaterials}
        </SimpleAccordion>
      </React.Fragment>
    );
  }
}

Fields.propTypes = {
  collections: PropTypes.array,
  finishingMaterials: PropTypes.array,
  setCollection: PropTypes.func,
  setFinishingMaterial: PropTypes.func
};

export default Fields;
