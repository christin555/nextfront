import {computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';

export class KeramogranitStore extends BaseFilterStore {
    fieldsLabel = {
        'color': 'Оттенок',
        'size': 'Размер',
        'brandId': 'Бренд',
        'collectionId': 'Коллекция',
        'bestseller': 'Хит продаж',
        'price': 'Цена',
        texture: 'Дизайн',
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
