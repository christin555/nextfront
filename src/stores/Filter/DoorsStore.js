import {action, computed, makeObservable, toJS} from 'mobx';
import {BaseFilterStore} from './Base';
import Router from "next/router";

export class DoorsStore extends BaseFilterStore {
    constructor(RootStore) {
        super(RootStore);

        makeObservable(this);
    }

    fieldsLabel = {
        'collectionId': 'Коллекция',
        'finishingMaterial': 'Материал отделки',
        'brandId': 'Фабрика'
    };

    tableFields = {
        finishingMaterial: 'finishingMaterials',
        collectionId: 'collections',
        brandId: 'brands'
    }

    @computed get brands() {
        return this.values.brands;
    }

    @computed get collections() {
        return this.values.collections;
    }

    @computed get finishingMaterials() {
        return this.values.finishingMaterials;
    }

    @computed get isBrandActive() {
        return this.hasKey('brandId');
    }

    @computed get isFinishingMaterialActive() {
        return this.hasKey('finishingMaterial');
    }

    @computed get isCollectionActive() {
        return this.hasKey('collectionId');
    }

    @action clearCheckedCollections = async () => {
        const params = toJS(Router.query);


        delete params['collectionId'];
        delete params['finishingMaterial'];

        await this.RouterStore.push({
            pathname: this.RouterStore.pathname,
            query: params
        })

        this.setToKey('checked', 'collectionId', false);
        this.setToKey('checked', 'finishingMaterial', false);

        this.chips = this.chips.filter((chip) => ['collectionId', 'finishingMaterial'].includes(chip.key));
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

    initDisabled() {
        const brandIds = Object.keys(this.checked)
            .filter((key) => key.indexOf('brandId') > -1 && this.checked[key])
            .map((key) => Number(key.split('-')[1]));

        if (!brandIds.length) {
            return
        }

        this.collections.forEach((collection) => {
            const brId = collection.brandId;

            let state = !brandIds.includes(brId);

            this.setDisabled('collectionId', collection.id, state);
        });

        this.finishingMaterials.forEach((collection) => {
            const brId = collection.brandId;

            let state = !brandIds.includes(brId);

            this.setDisabled('finishingMaterial', collection.id, state);
        });
    }


    beforeValueCheck = (key, {id}, checked) => {
        if (key === 'brandId') {
            this.clearCheckedCollections();
            this.disableFinishingByBrandId(id, checked);
            this.disableCollectionsByBrandId(id, checked);
        }
    };
}
