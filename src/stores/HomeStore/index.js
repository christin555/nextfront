import {observable, get, action, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

class HomeStore {
    RouterStore

    @observable works;
    @observable services;
    @observable articles;

    constructor(RootStore) {
        makeObservable(this);

        const {HomeStore = {}} = RootStore.initialData.stores || {};

        this.services = HomeStore.services;
        this.works = HomeStore.works;
        this.articles = HomeStore.articles;
    }

    @action setServices = (services) => {
        this.services = services;
    }

    @action setArticles = (articles) => {
        this.articles = articles;
    }

    getWorks = async () => {
        try {
            const popular = await api.post(`products/getPopular`);
        } catch (_) {
        }
    }

    getServices = async () => {
        try {
            const services = await api.post(`services/get`);
            this.setServices(services);
        } catch (e) {
            console.log(e)
        }
    }

    getArticles = async() => {
        try {
            console.log('getArticles')
            const articles = await api.post('articles/getArticles', {limit: 5, isPopular: true});

            this.setArticles(articles);
            console.log(articles)
        } catch(e) {
            alert({type: 'error', title: 'Ошибка при получении статей'});
        }
    }
}

export {HomeStore};
