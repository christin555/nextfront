import {computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';
import {priceUnit} from '../../enums';

export class SportStore extends BaseFilterStore {
    fieldsLabel = {
      'colorFamily': 'Оттенок',
      'totalThickness': 'Толщина',
      'collections': 'Коллекция',
      'bestseller': 'Хит продаж',
      'price': 'Цена',
      isPopular: 'Хит продаж',
      'isSale': 'Со скидкой'
    };

    constructor(RootStore) {
      super(RootStore);
      this.unitPrice = '₽/м²';
      makeObservable(this);
    }

    @computed get collections() {
      return this.values.collections;
    }

    @computed get brands() {
      return this.values.brands;
    }
}
