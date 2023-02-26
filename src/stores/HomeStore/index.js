import {observable, get, action, makeObservable} from 'mobx';;
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

    @action setWorks  = (works) => {
        this.works = works;
    }

    getWorks = async () => {
        try {
            const works = await api.post(`works/get`, {limit: 4});
            this.setWorks(works);
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
            const articles = await api.post('articles/getArticles', {
                limit: 5,
                showOnMainPage: true
            });

            this.setArticles(articles);
        } catch(e) {
            alert({type: 'error', title: 'Ошибка при получении статей'});
        }
    }
}

export {HomeStore};
