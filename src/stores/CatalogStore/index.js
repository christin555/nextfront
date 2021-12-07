import {observable, get, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';
import Router from "next/router";
import {isObjectEqual} from "../../utils/isObjectEqual";

const isServer = typeof window === 'undefined';

class CatalogStore {
    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products;
    @observable hierarchy;
    @observable isLastLevel;
    @observable count = 0;

@observable body = {};

    constructor(RootStore) {
        this.hydrate(RootStore);

        makeObservable(this);

        if (!isServer) {
            this.getHierarchyDisposer = autorun(this.getHierarchy);
            this.getCatalogDisposer = autorun(this.getCatalog);
            this.getCountProductsDisposer = autorun(this.getCountProducts);
        }
    }

    async hydrate(RootStore) {
        const {CatalogStore = {}} = RootStore.initialData.stores || {};

        this.RouterStore = RootStore.RouterStore;
        this.PageStore = RootStore.PageStore;
        this.ActiveFilterStore = RootStore.ActiveFilterStore;

        this.body = CatalogStore.body || {};
        this.categories = CatalogStore.categories;
        this.products = CatalogStore.products;
        this.hierarchy = CatalogStore.hierarchy || [];
        this.isLastLevel = CatalogStore.isLastLevel;
        this.count = CatalogStore.count;
        console.log('const1')
    }

    @computed get filter() {
        return  {...this.ActiveFilterStore.currentParams || {}, fastfilter: this.fastfilter};
    }

    @computed get category() {
        return this.RouterStore.query.category;
    }

    @computed get fastfilter() {
        return this.RouterStore.query.fastfilter;
    }

    @computed get router() {
        return Router.router;
    }

    @computed get productsAvailable() {
        return !!this.products?.length;
    }

    @action setBody = (body) => {
        this.body = body;
    };

    @action setCategories = (categories) => {
        this.categories = categories;
    };

    @action setProducts = (products) => {
        this.products = products;
    };

    @action setHierarchy = (hierarchy) => {
        this.hierarchy = hierarchy;
    };

    @action setIsLastLevel = (isLastLevel) => {
        this.isLastLevel = isLastLevel;
    };

    @action setCount = (count) => {
        this.count = count;
    };

    @action setStatus = (status) => {
        this.status = status;
    };

    getHierarchy = async () => {
        try {
            const body = {category: this.category};
            const {hierarchy, isLastLevel} = await api.post('catalog/getHierarchy', body);

            this.setHierarchy(hierarchy);
            this.setIsLastLevel(isLastLevel);
        } catch (_) {
            // do nothing
        }
    };

    getCountProducts = async () => {
        const {category, filter} = this;

        try {
            const body = {searchParams: {category, filter}};
            const count = await api.post('catalog/countProducts ', body);

            this.setCount(count);
        } catch (_) {
            // do nothing
        }
    };

    getCatalog = async () => {
        const {category, filter} = this;
        const {offset, limit} = this.PageStore;

        this.setStatus(statusEnum.LOADING);

        try {
            const body = {
                searchParams: {
                    category,
                    filter
                },
                limit,
                offset
            };
            if (isObjectEqual(toJS(this.body), body)) {
                return
            }
            this.setBody(body)

            const {categories, products} = await api.post('catalog/getCatalog', body);

            this.setCategories(categories);
            this.setProducts(products);
            this.setStatus(statusEnum.SUCCESS);
        } catch (err) {
            this.setStatus(statusEnum.ERROR);
            console.log(err);
            alert({type: 'error', title: 'Ошибка при получении товаров'});
        }
    };

    closeStore() {
        this.getHierarchyDisposer();
        this.getCatalogDisposer();
        this.getCountProductsDisposer();
    }
}

export {CatalogStore};
