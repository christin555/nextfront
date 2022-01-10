import {computed, makeObservable, observable, action, toJS} from 'mobx';
import {BaseFilterStore} from './Base';
import Router from "next/router";

export class SportStore extends BaseFilterStore {
    @observable disabled = {};
    fieldsLabel = {
        'colorFamily': 'Оттенок',
        'totalThickness': 'Размер',
        'collectionId': 'Коллекция',
        'bestseller': 'Хит продаж',
        'price': 'Цена'
    };

    tableFields = {
        colorFamily: 'colorFamily',
        totalThickness: 'totalThickness',
        collectionId: 'collections',
        bestseller: 'bestseller',
    }

    constructor(RootStore) {
        super(RootStore);
        makeObservable(this);
    }


    @computed get colorFamily() {
        return this.values.colorFamily;
    }

    @computed get totalThickness() {
        return this.values.totalThickness;
    }

    @computed get collections() {
        return this.values.collections;
    }

    @computed get isColorActive() {
        return this.hasKey('colorFamily');
    }

    @computed get isTotalThicknessActive() {
        return this.hasKey('totalThickness');
    }

    @computed get isPriceActive() {
        return this.hasKey('price');
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
