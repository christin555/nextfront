import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import Router from "next/router";
import {isObjectEqual} from "../../utils/isObjectEqual";

const isServer = typeof window === 'undefined';


class CatalogStore {

    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products;

    @observable category;

    @observable hierarchy;
    @observable fastFilter;
    @observable isLastLevel;
    @observable count = 0;
    @observable isHydrating;

    @observable ActiveFilterStore;

    body = {};

    constructor(RootStore) {
        this.hydrate(RootStore);
        makeObservable(this);

        if (!isServer) {
            this.getCountProductsDisposer = autorun(this.getCountProducts);
            this.getHierarchyDisposer = autorun(this.getHierarchy);
            this.getCatalogDisposer = autorun(this.getCatalog);
        }
    }

    async hydrate(RootStore) {
        this.isHydrating = true;
        const {CatalogStore = {}} = RootStore.initialData || {};

        this.RouterStore = RootStore.RouterStore;
        this.PageStore = RootStore.PageStore;
        this.ActiveFilterStore = RootStore.ActiveFilterStore;
        this.category = RootStore.category;
        this.fastfilter = RootStore.RouterStore.fastfilter;

        this.body = CatalogStore.body || {};
        this.categories = CatalogStore.categories;
        this.products = CatalogStore.products;
        this.hierarchy = CatalogStore.hierarchy || [];
        this.isLastLevel = CatalogStore.isLastLevel;
        this.count = CatalogStore.count || 0;
        this.isHydrating = false;
    }

    // @computed get category() {
    //     return this.RouterStore.query.category || null;
    // }

    // @computed get fastfilter() {
    //     return this.RouterStore.fastfilter || null;
    // }

    @computed get router() {
        return Router.router;
    }

    @computed get productsAvailable() {
        return !!this.products?.length;
    }


    @action merge = (newProps, {ActiveFilterStore}) => {
        this.isHydrating = true;
        (['category', 'fastfilter']).forEach((key) => {
            if (newProps[key] !== this[key]) {
                this[key] = newProps[key]
            }
        })
        this.PageStore.setPageWithoutSSR(1);
        this.ActiveFilterStore = ActiveFilterStore;
        this.isHydrating = false;
    };

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
        if (this.isHydrating) {
            return
        }

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
        if (this.isHydrating) {
            return
        }

        const {category, filter, fastfilter, isLastLevel} = this;

        if (!category && !fastfilter) {
            return;
        }

        try {
            const body = {searchParams: {category, filter: {...filter, fastfilter},}};
            const count = await api.post('catalog/countProducts ', body);

            this.checkPageStore(count)
            this.setCount(count);
        } catch (_) {
            // do nothing
        }
    };

    @computed get filter() {
        return toJS(this.ActiveFilterStore.currentParams) || {};
    }

    checkPageStore = (count) => {
        const {offset, limit} = this.PageStore;

        if (limit > 36) {
            this.PageStore.setLimitWithoutSSR(36);
            return true
        }

        if (offset > count) {
            this.PageStore.setPageWithoutSSR(1)
            return true
        }
    }

    getCatalog = async () => {
        if (this.isHydrating) {
            return
        }

        this.setStatus(statusEnum.LOADING);

        const {category, filter, fastfilter} = this;
        const {offset, limit, order, optionsOrder} = this.PageStore;

        try {
            const body = {
                searchParams: {
                    category,
                    filter: {...filter, fastfilter},
                },
                limit,
                offset,
                order: optionsOrder.find(({value}) => value === Number(order))
            };
            const {categories, products} = await api.post('catalog/getCatalog', body);
            this.setCategories(categories);
            this.setProducts(products);
            this.setStatus(statusEnum.SUCCESS);
        } catch (err) {
            this.setStatus(statusEnum.ERROR);
        }
    };

    closeStore() {
        this.getHierarchyDisposer();
        this.getCatalogDisposer();
        this.getCountProductsDisposer();
    }
}

export {CatalogStore};
