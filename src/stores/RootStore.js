import {makeObservable, observable, action, computed, toJS, reaction} from 'mobx';
import {DoorsStore} from './Filter/DoorsStore';
import {FloorStore} from './Filter/FloorStore';
import {CatalogStore} from "./CatalogStore";
import PopularStore from "./PopularStore";
import {status as statusEnum} from "../enums";
import {PageStore} from "./CatalogStore/PageStore";
import {ProductStore} from "./ProductStore";
import {ArticlesStore} from "./ArticlesStore";
import Router from "next/router";
import {KeramogranitStore} from "./Filter/KeramogranitStore";
import {SportStore} from "./Filter/SportStore";

const isServer = typeof window === 'undefined';

class RootStore {
    @observable stores = {};
    initialData;
    RouterStore;

    // @observable ActiveFilterStore = {};

    constructor({initialData = {}, RouterStore}) {
        this.RouterStore = RouterStore;
        this.initialData = initialData;
        // this.searchValue = RouterStore.query.fastfilter || '';
    }

    get ActiveFilterStore() {
        switch (this.RouterStore.query.category) {
            case 'doors':
                return this.DoorsStore;
            case KeramogranitStore.category:
                return this.KeramogranitStore;
            case 'sport':
                return this.SportStore;
            case 'quartzvinyl':
            case 'laminate':
                return this.FloorStore;
            case 'quartzvinyl_kleevay':
            case 'quartzvinyl_zamkovay':
                return this.FloorStore;
            default:
                return {};
        }
    }

    get ArticlesStore() {
        if (!this.stores.ArticlesStore) {
            const Store = new ArticlesStore(this);

            this.register('ArticlesStore', Store);
        }

        return this.stores.ArticlesStore || {};
    }

    get ProductStore() {
        if (!this.stores.ProductStore) {
            const Store = new ProductStore(this);

            this.register('ProductStore', Store);
        }

        return this.stores.ProductStore || {};
    }

    get DoorsStore() {
        if (!this.stores.DoorsStore) {
            const Store = new DoorsStore(this);

            this.register('DoorsStore', Store);
        }

        return this.stores.DoorsStore || {};
    }

    get SportStore() {
        if (!this.stores.SportStore) {
            const Store = new SportStore(this);

            this.register('SportStore', Store);
        }

        return this.stores.SportStore || {};
    }

    get KeramogranitStore() {
        if (!this.stores.KeramogranitStore) {
            const Store = new KeramogranitStore(this);

            this.register('KeramogranitStore', Store);
        }

        return this.stores.KeramogranitStore || {};
    }

    get FloorStore() {
        if (!this.stores.FloorStore) {
            const Store = new FloorStore(this);

            this.register('FloorStore', Store);
        }

        if (this.stores.FloorStore?.category !== this.RouterStore.query.category) {
            this.stores.FloorStore.changeCategory(this.RouterStore.query)
        }

        return this.stores.FloorStore || {};
    }

    get PageStore() {
        if (!this.stores.PageStore) {
            const Store = new PageStore(this);

            this.register('PageStore', Store);
        }

        return this.stores.PageStore || {};
    }

    get CatalogStore() {
        if (!this.stores.CatalogStore) {
            const Store = new CatalogStore(this);

            this.register('CatalogStore', Store);
            return Store
        }

        return this.stores.CatalogStore;
    }

    get PopularStore() {
        if (!this.stores.PopularStore) {
            const Store = new PopularStore(this);

            this.register('PopularStore', Store);
            return Store
        }
        return this.stores.PopularStore || {};
    }

    @action register = (name, store) => {
        if (this.stores[name]) {
            delete this.stores[name];
        }
        this.stores[name] = store;
    };
}

export default RootStore;
