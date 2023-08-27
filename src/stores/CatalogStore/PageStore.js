import {action, computed, makeObservable, observable} from 'mobx';
import Router from 'next/router';

export class PageStore {
    RouterStore;
    CatalogStore
    @observable limit;
    @observable page;
    @observable order;

    optionsOrder = [
      {value: 1, label: 'Исходная сортировка', direction: 'asc', field: null},
      {value: 3, label: 'Цены: по убыванию', direction: 'desc', field: 'orderPrice'},
      {value: 4, label: 'Цены: по возрастанию', direction: 'asc', field: 'orderPrice'}
    ]

    constructor(RootStore) {
      makeObservable(this);
      this.RouterStore = RootStore.RouterStore;

      this.limit = Number(RootStore.RouterStore.router.query.limit) || 12;
      this.page = Number(RootStore.RouterStore.router.query.page) || 1;
      this.order = Number(RootStore.RouterStore.router.query.order) || 1;
    }

    @computed get offset() {
      return (this.page - 1) * this.limit;
    }

    @action setLimitWithoutSSR = async(limit) => {
      this.limit = limit;
    }

    @action setPageWithoutSSR = async(page) => {
      this.page = page;
    }

    @action setPage = async(page) => {
      if (!page) {
        return;
      }
      this.page = page;

      await Router.router.push({
        query: {
          ...this.RouterStore.query,
          page
        }
      }, undefined, {shallow: true});
    };

    @action setOrder = async({value: order}) => {
      this.order = order;

      await Router.router.push({
        query: {
          ...this.RouterStore.query,
          order
        }
      }, undefined, {shallow: true});
    };

    @action setLimit = async({value: limit}) => {
      this.limit = limit;

      await Router.router.push({
        query: {
          ...this.RouterStore.query,
          page: 1,
          limit
        }

      }, undefined, {shallow: true});
    };
}
