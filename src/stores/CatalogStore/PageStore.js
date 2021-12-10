import {action, computed, makeObservable, observable} from 'mobx';
import Router from "next/router";

export class PageStore {
    RouterStore;
    CatalogStore
    @observable limit;
    @observable page;

    constructor(RootStore) {
        makeObservable(this);
        this.RouterStore = RootStore.RouterStore;

        this.limit =  RootStore.RouterStore.router.query.limit || 12;
        this.page = RootStore.RouterStore.router.query.page || 1;
    }

    @computed get offset() {
        return (this.page - 1) * this.limit;
    }

    @action setPage = async(page) => {
        this.page = page;

        await Router.router.push({
            query: {
                ...this.RouterStore.query,
                page
            },
        }, undefined, {shallow: true});
    };

    @action setLimit = async(limit) => {
        this.limit = limit;

        await Router.router.push({
            query: {
                ...this.RouterStore.query,
                page: 1,
                limit
            },

        }, undefined, {shallow: true});
    };
}
