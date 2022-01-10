import {observable, get, action, computed, makeObservable} from 'mobx';
import api from 'api';
import API from "api";

class ServicesStore {
    @observable services = [];

    constructor(RootStore) {
        makeObservable(this);
        const {stores: {ServicesStore} = {}} = RootStore.initialData;

        this.services = ServicesStore?.services;

        if (!this.services) {
            this.getServices()
        }
    }

    @action setServices = (services) => {
        this.services = services;
    }


    async getServices() {
        try {
            const services = await API.post('services/get', {})
            this.setServices(services);
        } catch (err) {
            console.log(err)
        }
    }
}

export default ServicesStore;
