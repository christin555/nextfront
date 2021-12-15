import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import FormCheckbox from '../Base/FormCheckbox';
import SimpleAccordion from '../Base/SimpleAccordion';
import {toJS} from 'mobx';
import Price from "../Base/Price";

@inject(({FilterStore}) => {
    return {
        color: FilterStore.color,
        texture: FilterStore.texture,
        size: FilterStore.size,
        collections: FilterStore.collections,

        setValue: FilterStore.setValue,
        setPrice: FilterStore.setPrice,
        setPricePath: FilterStore.setPricePath,

        checked: toJS(FilterStore.checked),
        disabled: toJS(FilterStore.disabled),

        isColorActive: FilterStore.isColorActive,
        isBrandsActive: FilterStore.isBrandsActive,
        isCollectionsActive: FilterStore.isCollectionsActive,
        isPriceActive: FilterStore.isPriceActive,
        isTextureActive: FilterStore.isTextureActive,
        isBestsellerActive: FilterStore.isBestsellerActive
    };
}) @observer
class Fields extends Component {
    get color() {
        return this.props.color?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('color', id)}
                key={id}
                name={name}
                id={id}
                onChange={this.props.setValue('color')}
            />
        ));
    }

    get texture() {
        return this.props.texture?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('texture', id)}
                key={id}
                name={name}
                id={id}
                onChange={this.props.setValue('texture')}
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


    get size() {
        return this.props.size?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('size', id)}
                key={id}
                name={`${name} мм`}
                id={id}
                onChange={this.props.setValue('size')}
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
            isBrandsActive,
            isCollectionsActive,
            isSizeActive,
            isPriceActive,
            isTextureActive,
            isBestsellerActive
        } = this.props;

        return (
            <React.Fragment>
                <SimpleAccordion id={7} name={'Цена'} active={isPriceActive}>
                    {this.price}
                </SimpleAccordion>
                <SimpleAccordion id={8} name={'Дизайн'} active={isTextureActive}>
                    {this.texture}
                </SimpleAccordion>
                <SimpleAccordion id={9} name={'Хит продаж'} active={isBestsellerActive}>
                    {this.isPopular}
                </SimpleAccordion>
                <SimpleAccordion id={3} name={'Оттенок'} active={isColorActive}>
                    {this.color}
                </SimpleAccordion>
                <SimpleAccordion id={10} name={'Размер'} active={isSizeActive}>
                    {this.size}
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
