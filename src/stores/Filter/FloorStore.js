import {makeObservable, action, toJS, computed} from 'mobx';
import {BaseFilterStore} from './Base';
import Router from "next/router";

export class FloorStore extends BaseFilterStore {
    fieldsLabel = {
        'brandId': 'Бренд',
        'collectionId': 'Коллекция',
        'collections' : 'Коллекция',
        'brands' : 'Бренд',
        'fixationType' : 'Тип',
        'withHeatingFloor': 'Совместимость с теплыми полами',
        'bestseller': 'Хит продаж',
        'price': 'Цена',
        'size': 'Размеры',
        fixation: 'Тип соединения',
        texture: 'Дизайн',
        isPopular: 'Хит продаж',
        'color': 'Оттенок',
        'resistanceClass': 'Класс нагрузки',
        'resistanceClasses': 'Класс нагрузки',
        'thickness': 'Толщина',
        'width': 'Ширина'
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

    @action clearCheckedCollections = async () => {
        const params = toJS(Router.query);
        const colId = 'collections';

        delete params[colId];

        await this.RouterStore.push({
            pathname: this.RouterStore.pathname,
            query: params
        })

        this.setToKey('checked', colId, false);
        this.chips.delete(colId);
    };

    initDisabled(){
        const brandIds = Object.keys(this.checked)
            .filter((key) => key.indexOf('brands') > -1 && this.checked[key])
            .map((key) => Number(key.split('-')[1]));

        if (!brandIds.length) {
            this.setToKey('disabled', 'collections', false);

            return;
        }

        this.collections.forEach((collection) => {
            const brId = collection.brandId;
            let state = !brandIds.includes(brId);

            this.setDisabled('collections', collection.id, state);
        });
    }

    afterValueCheck = (key, {id}, checked) => {
        if (key === 'brands') {
            this.clearCheckedCollections();
            this.disableCollectionsByBrandId(id, checked);
        }
    };
}
