import {computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';

export class SportStore extends BaseFilterStore {
    fieldsLabel = {
        'colorFamily': 'Оттенок',
        'totalThickness': 'Размер',
        'collections': 'Коллекция',
        'bestseller': 'Хит продаж',
        'price': 'Цена',
        isPopular: 'Хит продаж'
    };

    constructor(RootStore) {
        super(RootStore);
        makeObservable(this);
    }

    @computed get collections() {
        return this.values.collections;
    }

    @computed get brands() {
        return this.values.brands;
    }
}
