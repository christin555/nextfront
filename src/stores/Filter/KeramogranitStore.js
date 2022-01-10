import {computed, makeObservable, observable, action, toJS} from 'mobx';
import {BaseFilterStore} from './Base';
import Router from "next/router";

export class KeramogranitStore extends BaseFilterStore {
    @observable disabled = {};
    fieldsLabel = {
        'color': 'Оттенок',
        'size': 'Размер',
        'brandId': 'Бренд',
        'collectionId': 'Коллекция',
        'bestseller': 'Хит продаж',
        'price': 'Цена',
        texture: 'Дизайн'
    };

    tableFields = {
        color: 'color',
        resistanceClasses: 'resistanceClass',
        thickness: 'thickness',
        width: 'width',
        brandId: 'brands',
        collectionId: 'collections',
        bestseller: 'bestseller',
    }

    constructor(RootStore) {
        super(RootStore);
        makeObservable(this);
    }

    static get category() {
        return 'keramogranit';
    }

    @computed get color() {
        return this.values.color;
    }

    @computed get texture() {
        return this.values.texture;
    }

    @computed get size() {
        return this.values.size;
    }

    @computed get brands() {
        return this.values.brands;
    }

    @computed get collections() {
        return this.values.collections;
    }

    @computed get isColorActive() {
        return this.hasKey('color');
    }

    @computed get isPriceActive() {
        return this.hasKey('price');
    }

    @computed get isTextureActive() {
        return this.hasKey('texture');
    }

    @computed get isSizeActive() {
        return this.hasKey('size');
    }

    @computed get isBestsellerActive() {
        return this.hasKey('bestseller');
    }

    clear() {
        super.clear();

        this.disabled = {};
    }

    setToKey = (field, key, value) => {
        Object.keys(this[field])
            .forEach((objectKey) => {
                if (objectKey.indexOf(key) > -1) {
                    this[field][objectKey] = value;
                }
            });
    };

    setDisabled = (key, value, state) => {
        this.disabled[`${key}-${value}`] = state;
    };
}
