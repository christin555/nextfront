import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import FormCheckbox from '../Base/FormCheckbox';
import SimpleAccordion from '../Base/SimpleAccordion';
import {toJS} from 'mobx';
import Price from "../Base/Price";

@inject(({FilterStore}) => {
    return {
        colorFamily: FilterStore.colorFamily,
        resistanceClasses: FilterStore.resistanceClasses,
        totalThickness: FilterStore.totalThickness,

        collections: FilterStore.collections,
        setValue: FilterStore.setValue,

        setPrice: FilterStore.setPrice,
        setPricePath: FilterStore.setPricePath,

        checked: toJS(FilterStore.checked),
        disabled: toJS(FilterStore.disabled),

        isColorActive: FilterStore.isColorActive,
        isTotalThicknessActive: FilterStore.isTotalThicknessActive,
        isCollectionsActive: FilterStore.isCollectionsActive,
        isPriceActive: FilterStore.isPriceActive,
        isBestsellerActive: FilterStore.isBestsellerActive,
    };
}) @observer
class Fields extends Component {
    get color() {
        return this.props.colorFamily?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('colorFamily', id)}
                key={id}
                name={name}
                id={id}
                onChange={this.props.setValue('colorFamily')}
            />
        ));
    }

    get price() {
        return (
            <Price
                minPrice={this.props.checked?.minPrice}
                maxPrice={this.props.checked?.maxPrice}
                checked={this.props.checked}
                onChange={this.props.setPrice}
                onSave={this.props.setPricePath}
            />
        );
    }

    get thickness() {
        return this.props.totalThickness?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('totalThickness', id)}
                key={id}
                name={name}
                id={id}
                onChange={this.props.setValue('totalThickness')}
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


    get isPopular() {
        return (
            <FormCheckbox
                checked={this.isChecked('bestseller', 1)}
                name={'Да'}
                id={1}
                onChange={this.props.setValue('bestseller')}
            />
        );
    }

    isChecked = (key, value) => {
        const {checked} = this.props;

        return !!checked[`${key}-${value}`];
    };

    isDisabled = (key, value) => {
        const {disabled} = this.props;

        return disabled[`${key}-${value}`];
    };

    render() {
        const {
            isColorActive,
            isTotalThicknessActive,
            isCollectionsActive,
            isPriceActive,
            isBestsellerActive
        } = this.props;


        return (
            <React.Fragment>
                <SimpleAccordion id={2} name={'Коллекция'} active={isCollectionsActive}>
                    {this.collections}
                </SimpleAccordion>
                <SimpleAccordion id={7} name={'Цена'} active={isPriceActive}>
                    {this.price}
                </SimpleAccordion>
                <SimpleAccordion id={9} name={'Хит продаж'} active={isBestsellerActive}>
                    {this.isPopular}
                </SimpleAccordion>
                <SimpleAccordion id={3} name={'Цвет'} active={isColorActive}>
                    {this.color}
                </SimpleAccordion>
                <SimpleAccordion id={6} name={'Толщина'} active={isTotalThicknessActive}>
                    {this.thickness}
                </SimpleAccordion>
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
