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
      this.getArticleDisposer = autorun(this.getArticle);
      this.getArticlesDisposer = autorun(this.getArticles);
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
    if (!this.alias){
      return
    }

    try {
      const alias = this.alias;
      const article =  await api.post('article/get', {alias});

      this.setArticle(article);
    } catch(err) {
      console.log(err);
    }
  }

  getArticles = async() => {
    this.setStatus(statusEnum.LOADING);
    try {
      const articles = await api.post('articles/getArticles', {});

      this.setArticles(articles);
      this.setStatus(statusEnum.SUCCESS);
    } catch(e) {
      this.setStatus(statusEnum.ERROR);
      alert({type: 'error', title: 'Ошибка при получении статей'});
    }
  }
}

export {ArticlesStore};
