import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import FormCheckbox from '../Base/FormCheckbox';
import SimpleAccordion from '../Base/SimpleAccordion';
import {toJS} from 'mobx';

@inject(({FilterStore}) => {
  return {
    collections: FilterStore.collections,
    finishingMaterials: FilterStore.finishingMaterials,
    setValue: FilterStore.setValue,
    isCollectionActive: FilterStore.isCollectionActive,
    isFinishingMaterialActive: FilterStore.isFinishingMaterialActive,
    checked: toJS(FilterStore.checked)
  };
})
class Fields extends Component {
  get collections() {
    return this.props.collections?.map(({id, name}) => (
      <FormCheckbox
        checked={this.isChecked('collectionId', id)}
        key={id}
        name={name}
        id={id}
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
        onChange={this.props.setValue('finishingMaterial')}
      />
    ));
  }

  isChecked = (key, value) => {
    const {checked} = this.props;

    return checked[`${key}-${value}`] || false;
  };

  render() {
    const {
      isFinishingMaterialActive,
      isCollectionActive
    } = this.props;

    return (
      <React.Fragment>
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
