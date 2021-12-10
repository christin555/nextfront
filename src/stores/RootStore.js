import {makeObservable, observable, action, computed, toJS, reaction} from 'mobx';
import {DoorsStore} from './Filter/DoorsStore';
import {LaminateStore} from './Filter/LaminateStore';
import {CatalogStore} from "./CatalogStore";
import PopularStore from "./PopularStore";
import {status as statusEnum} from "../enums";
import {PageStore} from "./CatalogStore/PageStore";
import {ProductStore} from "./ProductStore";
import {ArticlesStore} from "./ArticlesStore";
import Router from "next/router";

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

        // reaction(
        //     ()=>this.RouterStore.query.category,
        //     this.setActiveFilterStore
        // )
    }

    setActiveFilterStore = () => {
        switch (this.RouterStore.query.category) {
            case DoorsStore.category:
                this.ActiveFilterStore = this.DoorsStore;
            case LaminateStore.category:
                this.ActiveFilterStore =  this.LaminateStore;
            default:
                this.ActiveFilterStore = {};
        }
    }

    get ActiveFilterStore() {
        switch (this.RouterStore.query.category) {
            case DoorsStore.category:
                return this.DoorsStore;
            case LaminateStore.category:
                return this.LaminateStore;
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

    get LaminateStore() {
        if (!this.stores.LaminateStore) {
            const Store = new LaminateStore(this);
            this.register('LaminateStore', Store);
        }

        return this.stores.LaminateStore || {};
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
        this.stores[name] = store;
    };
}

export default RootStore;
