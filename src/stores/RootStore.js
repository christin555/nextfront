import {observable, action, computed} from 'mobx';
import {DoorsStore} from './Filter/DoorsStore';
import {FloorStore} from './Filter/FloorStore';
import {CatalogStore} from "./CatalogStore";
import PopularStore from "./PopularStore";
import {PageStore} from "./CatalogStore/PageStore";
import {ProductStore} from "./ProductStore";
import {ArticlesStore} from "./ArticlesStore";
import Router from "next/router";
import {KeramogranitStore} from "./Filter/KeramogranitStore";
import {SportStore} from "./Filter/SportStore";
import {HomeStore} from "./HomeStore";
import WorksStore from "./WorksStore";
import {BlocksStore} from "./BlocksStore";
import ServicesStore from "./ServicesStore";
import React from "react";

class RootStore {
    @observable stores = {};
    initialData;
    RouterStore;

    @observable category;

    constructor({initialData = {}, RouterStore, deviceType}) {
        this.RouterStore = RouterStore;
        this.deviceType = deviceType || initialData.deviceType;
        this.initialData = initialData.stores || {};
        this.category = initialData.category || RouterStore.router?.query?.category;
    }

    @computed get ActiveFilterStore() {
        switch (this.category) {
            case 'doors':
                return this.DoorsStore;
            case 'keramogranit':
                return this.KeramogranitStore;
            case 'quartzvinyl':
            case 'quartzvinyl_zamkovay':
            case 'quartzvinyl_kleevay':
            case 'laminate':
            case 'probkovoe_pokrytie':
                return this.FloorStore;
            case 'sport':
                return this.SportStore;
            default:
                return {};
        }
    }

    getStore = (name, NewStore) => {
        if (!this.stores[name]) {
            const Store = new NewStore(this);

            this.register(name, Store);
        }


        return this.stores[name] || {};
    }


    get WorksStore() {
        return this.getStore('WorksStore', WorksStore)
    }

    get BlocksStore() {
        return this.getStore('BlocksStore', BlocksStore)
    }


    get ServicesStore() {
        return this.getStore('ServicesStore', ServicesStore)
    }

    get HomeStore() {
        return this.getStore('HomeStore', HomeStore)
    }

    get ArticlesStore() {
        return this.getStore('ArticlesStore', ArticlesStore)
    }

    get ProductStore() {
        return this.getStore('ProductStore', ProductStore)
    }

    get DoorsStore() {
        return this.getStore('DoorsStore', DoorsStore)
    }

    get SportStore() {
        return this.getStore('SportStore', SportStore)
    }

    get KeramogranitStore() {
        return this.getStore('KeramogranitStore', KeramogranitStore)
    }

    get FloorStore() {
        return this.getStore('FloorStore', FloorStore)
    }

    get PageStore() {
        return this.getStore('PageStore', PageStore)
    }

    get CatalogStore() {
        return this.getStore('CatalogStore', CatalogStore)
    }

    get PopularStore() {
        return this.getStore('PopularStore', PopularStore)
    }

    @action setCategory = (category) => {
        this.category = category;
    };

    @action setSelection = async (selection, category) => {
        this.CatalogStore.isHydrating = true;
        this.setCategory(category);

        if (this.ActiveFilterStore.updateCategory) {
            this.ActiveFilterStore?.updateCategory(category, {selection})
        }
        this.RouterStore.router.query = {category, selection}
        this.CatalogStore.merge({category, ActiveFilterStore: this.ActiveFilterStore}, this)
    };

    @action setCategoryMerge = async (category, fastfilter) => {
        this.CatalogStore.isHydrating = true;
        this.setCategory(category);

        if (this.ActiveFilterStore.updateCategory) {
            this.ActiveFilterStore?.updateCategory(category)
        }

        this.RouterStore.router.query = {category}
        this.CatalogStore.merge({category, fastfilter, ActiveFilterStore: this.ActiveFilterStore}, this)
    };

    @action mergeStores = ({stores, category}) => {
        this.setCategory(category);

        Object.keys(stores).forEach((key) => {
                if (key === 'HomeStore') {
                    this.stores.HomeStore = stores.HomeStore;
                } else if (key === 'category') {
                    this.category = stores.category;
                } else {

                    if (!this.stores[key]) {
                        this.stores[key] = this[key]
                    }

                    this.stores[key] && this.stores[key]?.merge && this.stores[key].merge(stores[key], this);
                }
            }
        )
    }

    @action deleteStore = (name) => {
        delete this.stores[name];
    }

    @action register = (name, store) => {
        if (this.stores[name]) {
            delete this.stores[name];
        }

        this.stores[name] = store;

        this.initialData[name] = store;
    };
}

export default RootStore;
