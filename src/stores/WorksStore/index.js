import {observable, get, action, computed, makeObservable, autorun} from 'mobx';
import api from 'api';
import API from "api";

const isServer = typeof window === 'undefined';


class WorksStore {
    @observable works = [];
    @observable work = {};
    @observable id = null;

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

        this.works = WorksStore.works;
        this.work = WorksStore.work;
        this.id = WorksStore.id;
    }

    @action merge({id, work, works}) {
        this.id = id;
        this.work = work;
        this.works = works;
    }


    @action setId(id) {
        this.id = id;
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
        } catch (err) {
            console.log(err)
        }
    }
}

export default WorksStore;
