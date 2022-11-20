import {computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';
import {priceUnit} from "../../enums";

export class DefaultStore extends BaseFilterStore {
    fieldsLabel = {
        'using': 'Область применения',
        'materialOfBase': 'Материал основы',
        'bestseller': 'Хит продаж',
        'price': 'Цена',
        isPopular: 'Хит продаж',
        'brandId': 'Бренд',
        'collectionId': 'Коллекция',
        'collections' : 'Коллекция',
        'brands' : 'Бренд',
    };

    constructor(RootStore) {
        super(RootStore);
        this.unitPrice = priceUnit.RUBLE;
        makeObservable(this);
    }

    @computed get collections() {
        return this.values.collections;
    }

    @computed get brands() {
        return this.values.brands;
    }
}
