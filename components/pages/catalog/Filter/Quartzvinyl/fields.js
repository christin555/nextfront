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
        resistanceClasses: FilterStore.resistanceClasses,
        thickness: FilterStore.thickness,
        width: FilterStore.width,
        brands: FilterStore.brands,
        texture: FilterStore.texture,
        fixation: FilterStore.fixation,

        collections: FilterStore.collections,
        setValue: FilterStore.setValue,

        setPrice: FilterStore.setPrice,
        setPricePath: FilterStore.setPricePath,

        checked: toJS(FilterStore.checked),
        disabled: toJS(FilterStore.disabled),

        isColorActive: FilterStore.isColorActive,
        isResistanceClassesActive: FilterStore.isResistanceClassesActive,
        isThicknessActive: FilterStore.isThicknessActive,
        isWidthActive: FilterStore.isWidthActive,
        isBrandsActive: FilterStore.isBrandsActive,
        isCollectionsActive: FilterStore.isCollectionsActive,
        isWithHeatingFloor: FilterStore.isWithHeatingFloor,
        isPriceActive: FilterStore.isPriceActive,
        isTextureActive: FilterStore.isTextureActive,
        isBestsellerActive: FilterStore.isBestsellerActive,
        isFixationActive: FilterStore.isFixationActive
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

    get resistanceClasses() {
        return this.props.resistanceClasses?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('resistanceClass', id)}
                key={id}
                name={`${name} класс`}
                id={id}
                onChange={this.props.setValue('resistanceClass')}
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
        return this.props.thickness?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('thickness', id)}
                key={id}
                name={`${name} мм`}
                id={id}
                onChange={this.props.setValue('thickness')}
            />
        ));
    }

    get width() {
        return this.props.width?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('width', id)}
                key={id}
                name={`${name} мм`}
                id={id}
                onChange={this.props.setValue('width')}
            />
        ));
    }

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

    get fixation() {
        return this.props.fixation?.map(({id, name}) => (
            <FormCheckbox
                checked={this.isChecked('fixation', id)}
                key={id}
                name={name}
                id={id}
                onChange={this.props.setValue('fixation')}
            />
        ));
    }

    get withHeatingFloor() {
        return (
            <FormCheckbox
                checked={this.isChecked('withHeatingFloor', 1)}
                name={'Да'}
                id={1}
                onChange={this.props.setValue('withHeatingFloor')}
            />
        );
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
            isResistanceClassesActive,
            isThicknessActive,
            isWidthActive,
            isBrandsActive,
            isCollectionsActive,
            isWithHeatingFloorActive,
            isPriceActive,
            isTextureActive,
            isBestsellerActive,
            isFixationActive
        } = this.props;

        return (
            <React.Fragment>
                <SimpleAccordion id={1} name={'Бренд'} active={isBrandsActive}>
                    {this.brands}
                </SimpleAccordion>
                <SimpleAccordion id={2} name={'Коллекция'} active={isCollectionsActive}>
                    {this.collections}
                </SimpleAccordion>
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
                <SimpleAccordion id={10} name={'Способ укладки'} active={isFixationActive}>
                    {this.fixation}
                </SimpleAccordion>
                <SimpleAccordion id={4} name={'Класс нагрузки'} active={isResistanceClassesActive}>
                    {this.resistanceClasses}
                </SimpleAccordion>
                <SimpleAccordion id={5} name={'Совместимость с теплыми полами'} active={isWithHeatingFloorActive}>
                    {this.withHeatingFloor}
                </SimpleAccordion>
                <SimpleAccordion id={6} name={'Толщина'} active={isThicknessActive}>
                    {this.thickness}
                </SimpleAccordion>
                <SimpleAccordion id={7} name={'Ширина'} active={isWidthActive}>
                    {this.width}
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
