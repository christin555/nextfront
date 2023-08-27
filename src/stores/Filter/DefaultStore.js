import {computed, makeObservable} from 'mobx';
import {BaseFilterStore} from './Base';

export class DefaultStore extends BaseFilterStore {
    fieldsLabel = {
      using: 'Область применения',
      materialOfBase: 'Материал основы',
      bestseller: 'Хит продаж',
      price: 'Цена',
      isPopular: 'Хит продаж',
      brandId: 'Бренд',
      collectionId: 'Коллекция',
      collections: 'Коллекция',
      brands: 'Бренд',
      isSale: 'Со скидкой',
      type: 'Тип',
      material: 'Материал',
      width: 'Ширина (Толщина)',
      height: 'Высота',
      length: 'Длина',
      forPainting: 'Под покраску'
    };

    constructor(RootStore) {
      super(RootStore);
      this.unitPrice = '₽';
      makeObservable(this);
    }

    @computed get collections() {
      return this.values.collections;
    }

    @computed get brands() {
      return this.values.brands;
    }
}
