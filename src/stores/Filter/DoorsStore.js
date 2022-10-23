import {action, computed, makeObservable, toJS} from 'mobx';
import {BaseFilterStore} from './Base';
import Router from "next/router";
import {priceUnit} from "../../enums";

export class DoorsStore extends BaseFilterStore {
    constructor(RootStore) {
        super(RootStore);
        this.unitPrice = priceUnit.RUBLE;

        makeObservable(this);
    }

    fieldsLabel = {
        'collectionId': 'Коллекция',
        'finishingMaterial': 'Материал отделки',
        'brandId': 'Фабрика',
        isPopular: 'Хит продаж'
    };

    @computed get brands() {
        return this.values.brandId;
    }

    @computed get collections() {
        return this.values.collectionId;
    }

    @computed get finishingMaterials() {
        return this.values.finishingMaterial;
    }

    @action clearCheckedCollections = async () => {
        const params = toJS(Router.query);

        if (!'collectionId' in params) {
            return
        }

        delete params['collectionId'];
        delete params['finishingMaterial'];

        await this.RouterStore.push({
            pathname: this.RouterStore.pathname,
            query: params
        })

        this.setToKey('checked', 'collectionId', false);
        this.setToKey('checked', 'finishingMaterial', false);

        this.chips.delete('collectionId');
        this.chips.delete('finishingMaterial');
    };

    @action disableFinishingByBrandId = (brandId, checked) => {
        const brandIds = Object.keys(this.checked)
            .filter((key) => key.indexOf('brandId') > -1 && this.checked[key])
            .map((key) => Number(key.split('-')[1]));

        // Если ничего не выбрано в брендах, то все коллекции по умолчанию можно тыкать
        if (!brandIds.length) {
            this.setToKey('disabled', 'collectionId', false);

            return;
        }

        this.finishingMaterials.forEach((material) => {
            const brId = material.brandId;

            let state;

            if (checked) {
                // Дизейблим если бренд текущего элемента не был выбран в фильтре
                state = !brandIds.includes(brId) && brId !== brandId;
            } else {
                // Если бренд в фильтре был выбран, а потом чекбокс убрали,
                // то необходимо снова задизейблить
                state = !brandIds.includes(brandId) && brId === brandId;
            }

            this.setDisabled('finishingMaterial', material.id, state);
        });
    };

    @action initDisabled() {
        const disabled = {};
        const brandIds = Object.keys(this.checked)
            .filter((key) => key.indexOf('brandId') > -1 && this.checked[key])
            .map((key) => Number(key.split('-')[1]));

        if (!brandIds.length) {
            return
        }

        this.collections.forEach((collection) => {
            const brId = collection.brandId;
            let state = !brandIds.includes(brId);

            disabled[`collectionId-${collection.id}`] = state;
        });

        this.finishingMaterials.forEach((collection) => {
            const brId = collection.brandId;
            let state = !brandIds.includes(brId);

            disabled[`collectionId-${collection.id}`] = state;
        });

        this.disabled = disabled;
    }


    beforeValueCheck = async (key, {id}, checked) => {
        if (key === 'brandId') {
            await this.clearCheckedCollections();
            this.disableFinishingByBrandId(id, checked);
            this.disableCollectionsByBrandId(id, checked);
        }
    };
}
