import {action, computed, makeObservable, observable} from 'mobx';
import Router from "next/router";

export class PageStore {
    RouterStore;
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

    @action setPage = (page) => {
        this.page = page;

        this.RouterStore.push({
            query: {
                ...this.RouterStore.query,
                page
            },
        }, undefined, {shallow: true});
    };

    @action setLimit = (limit) => {
        this.limit = limit;

        this.RouterStore.push({
            query: {
                ...this.RouterStore.query,
                page: 1,
                limit
            },

        }, undefined, {shallow: true});
    };
}
