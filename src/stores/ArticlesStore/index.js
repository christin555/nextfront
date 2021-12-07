import {observable, action, makeObservable, computed, when, autorun} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

const isServer = typeof window === 'undefined';

class ArticlesStore {
  @observable status = statusEnum.LOADING;
  @observable articles;
  @observable  article;
  RouterStore

  constructor(RootStore) {
    makeObservable(this);
    this.hydrate(RootStore);

    if (!isServer) {
      this.getArticlesDisposer = autorun(this.getArticle);
    }
  }
   hydrate(RootStore) {
    const {ArticlesStore = {}} = RootStore.initialData.stores || {};

    this.RouterStore = RootStore.RouterStore;
    this.articles = ArticlesStore.articles;
    this.article = ArticlesStore.article;

   }

  @action setStatus = (status) => {
    this.status = status;
  }

  @action setArticle = (article) => {
    this.article = article;
  }

  @action setArticles = (articles) => {
    this.articles = articles;
  }

  @computed get alias() {
    return this.RouterStore.router.query.id || null;
  }

  getArticle = async() => {
    try {
      const alias = this.alias;
      const article =  await api.post('article/get', {alias});

      this.setArticle(article);
    } catch(err) {
      console.log(err);
      //alert({type: 'error', title: 'Ошибка при получении фильтра'});
    }
  }

  getArticles = async() => {
    this.setStatus(statusEnum.LOADING);
    try {
      const articles = await api.get('articles/getArticles');

      this.setArticles(articles);
      this.setStatus(statusEnum.SUCCESS);
    } catch(_) {
      this.setStatus(statusEnum.ERROR);
      alert({type: 'error', title: 'Ошибка при получении фильтра'});
    }
  }
}

export {ArticlesStore};
