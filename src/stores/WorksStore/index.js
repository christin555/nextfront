import {observable, get, action, computed, makeObservable, autorun} from 'mobx';
import api from 'api';
import API from "api";

const isServer = typeof window === 'undefined';


class WorksStore {
    @observable works = [];
    @observable work = {};

    RouterStore

    constructor(RootStore) {
        makeObservable(this);
        this.hydrate(RootStore);

        if (!this.works) {
            this.getWorks()
        }

        if (!isServer) {
            autorun(this.getWork)
        }
    }

    hydrate(RootStore) {
        const {WorksStore = {}} = RootStore.initialData.stores || {};

        this.RouterStore = RootStore.RouterStore;
        this.works = WorksStore.works;
        this.work = WorksStore.work;
    }

    @computed get id() {
        return this.RouterStore.router.query.id || null;
    }

    @action setWorks = (services) => {
        this.works = services;
    }

    @action setWork = (work) => {
        this.work = work;
    }

    async getWorks() {
        try {
            const services = await API.post('works/get', {})
            this.setWorks(services);
            console.log(services)

        } catch (err) {
            console.log(err)
        }
    }

    getWork = async () => {
        if (!this.id) {
            return
        }

        try {
            const id = this.id;
            const work = await API.post('work/get', {id})
            this.setWork(work);
            console.log(work)

        } catch (err) {
            console.log(err)
        }
    }
}

export default WorksStore;
