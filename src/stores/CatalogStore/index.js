import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import Router from 'next/router';

const isServer = typeof window === 'undefined';

class CatalogStore {

    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products;
    @observable articles = {};
    @observable category;

    @observable watchedProducts = [];

    @observable hierarchy;
    @observable fastFilter;
    @observable isLastLevel;
    @observable count = 0;
    @observable isHydrating;

    @observable ActiveFilterStore = {};

    body = {};

    constructor(RootStore) {
      this.hydrate(RootStore);
      makeObservable(this);

      if (!isServer) {
        this.getCountProductsDisposer = autorun(this.getCountProducts);
        this.getHierarchyDisposer = autorun(this.getHierarchy);
        this.getCatalogDisposer = autorun(this.getCatalog);
        this.getArticlesDisposer = autorun(this.getArticles);

        this.getWatchedReaction = reaction(
          () => this.RouterStore.watched,
          this.getWatched,
          {fireImmediately: true}
        );
      }
    }

    async hydrate(RootStore) {
      this.isHydrating = true;
      const {CatalogStore = {}} = RootStore.initialData || {};

      this.RouterStore = RootStore.RouterStore;
      this.PageStore = RootStore.PageStore;
      this.category = RootStore.category;
      this.fastfilter = RootStore.RouterStore.fastfilter;

      this.ActiveFilterStore = RootStore.ActiveFilterStore || {};
      this.body = CatalogStore.body || {};
      this.categories = CatalogStore.categories;
      this.products = CatalogStore.products;
      this.hierarchy = CatalogStore.hierarchy || [];
      this.isLastLevel = CatalogStore.isLastLevel;
      this.count = CatalogStore.count || 0;
      this.isHydrating = false;
    }

    @computed get router() {
      return Router.router;
    }

    @computed get imgPosts() {
      return this.articles.filter(({articleType}) => {
        if (articleType === 'img' || articleType === 'carousel') {

        }
      });
    }

    @computed get videoPosts() {
      const video = [];

      this.articles.forEach(({media, articleType}) => {
        if (articleType === 'short' || articleType === 'video' && media[0]) {
          media[0].type !== 'youtube' && video.push(media[0].src);
        }
      });

      return video;
    }

    @computed get productsAvailable() {
      return !!this.products?.length;
    }

    @action setActiveFilterStore(ActiveFilterStore) {
      this.ActiveFilterStore = ActiveFilterStore;
    }

    @action setWatchedProducts = (watchedProducts) => {
      this.watchedProducts = watchedProducts.reverse();
    };

    @action merge = (newProps) => {
      this.isHydrating = true;
      ['category', 'fastfilter', 'ActiveFilterStore'].forEach((key) => {
        if (newProps[key] !== this[key]) {
          this[key] = newProps[key];
        }
      });

      this.PageStore.setPageWithoutSSR(1);
      this.isHydrating = false;
    };

    @action setBody = (body) => {
      this.body = body;
    };

    @action setArticles = (_articles) => {
      const articles = {
        video: [],
        static: []
      };

      _articles.forEach((post) => {
        if (post.articleType === 'short' || post.articleType === 'video' && post.media[0]) {
          if (post.media[0].type !== 'youtube' && articles.video.length < 3) {
            articles.video.push(post.media[0].src);
          } else if (articles.static.length < 6) {
            articles.static.push(post);
          }
        } else if (articles.static.length < 6) {
          articles.static.push(post);
        }
      });

      this.articles = articles;
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

    getHierarchy = async() => {
      if (this.isHydrating) {
        return;
      }

      try {
        const body = {category: this.category};
        const {hierarchy, isLastLevel} = await api.post('catalog/getHierarchy', body);

        this.setHierarchy(hierarchy);
        this.setIsLastLevel(isLastLevel);
      } catch(_) {
        // do nothing
      }
    };

    getCountProducts = async() => {
      if (this.isHydrating) {
        return;
      }

      const {category, filter, fastfilter, isLastLevel} = this;

      if (!category && !fastfilter) {
        return;
      }

      try {
        const body = {searchParams: {category, filter: {...filter, fastfilter}}};
        const count = await api.post('catalog/countProducts ', body);

        this.checkPageStore(count);
        this.setCount(count);
      } catch(_) {
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

        return true;
      }

      if (offset > count) {
        this.PageStore.setPageWithoutSSR(1);

        return true;
      }
    };

    getArticles = async() => {
      try {
        const articles = await api.post('articles/getArticles',
          {category: this.category, withMedia: true});

        this.setArticles(articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch(e) {
        console.log(e);
      }
    };

    getWatched = async(ids) => {
      try {
        const products = await api.post('products/get', {filter: {ids}});

        this.setWatchedProducts(products);
      } catch(e) {
      }
    };

    getCatalog = async() => {
      if (this.isHydrating) {
        return;
      }

      this.setStatus(statusEnum.LOADING);

      const {category, filter, fastfilter} = this;
      const {offset, limit, order, optionsOrder} = this.PageStore;

      try {
        const body = {
          searchParams: {
            category,
            filter: {...filter, fastfilter}
          },
          limit,
          offset,
          order: optionsOrder.find(({value}) => value === Number(order))
        };
        const {categories, products} = await api.post('catalog/getCatalog', body);

        this.setCategories(categories);
        this.setProducts(products);
        this.setStatus(statusEnum.SUCCESS);
      } catch(err) {
        this.setStatus(statusEnum.ERROR);
      }
    };

    closeStore() {
      this.getHierarchyDisposer();
      this.getCatalogDisposer();
      this.getArticlesDisposer();
      this.getCountProductsDisposer();
    }
}

export {CatalogStore};
