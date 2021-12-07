import {observable, when, action, computed, makeObservable, autorun} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

const isServer = typeof window === 'undefined';

class ProductStore {
    RouterStore

    @observable status = statusEnum.LOADING;
    @observable hierarchy;
    @observable values;
    @observable fields;

    constructor(RootStore) {
        this.hydrate(RootStore);

        makeObservable(this);

        if(!isServer) {
            this.getHierarchyDisposer = autorun(this.getHierarchy);
            this.getCatalogDisposer = autorun(this.getProduct);
        }
    }

    async hydrate(RootStore) {
        const {ProductStore = {}} = RootStore.initialData.stores || {};

        this.RouterStore = RootStore.RouterStore;
        this.hierarchy = ProductStore.hierarchy;
        this.values = ProductStore.values;
        this.fields = ProductStore.fields;
    }

    @computed get alias() {
        return this.RouterStore.query.id || null;
    }

    @action setValues = (values) => {
        this.values = values;
    }

    @action setFields = (fields) => {
        this.fields = fields;
    }

    @action setHierarchy = (hierarchy) => {
        this.hierarchy = hierarchy;
    }

    getHierarchy = async () => {
        if (!this.alias){
            return
        }
        try {
            const body = {product: this.alias};
            const {hierarchy} = await api.post('catalog/getHierarchy', body);

            this.setHierarchy(hierarchy);
        } catch (_) {
            alert({type: 'error', title: 'Ошибка при получении иерархии'});
        }
    }

    getProduct = async () => {
        if (!this.alias){
            return
        }
        try {
            const {values, fields} = await api.get(`products/get/${this.alias}`);

            this.setValues(values);
            this.setFields(fields);
        } catch (_) {
            alert({type: 'error', title: 'Ошибка при получении товара'});
        }
    }
}

export {ProductStore};
