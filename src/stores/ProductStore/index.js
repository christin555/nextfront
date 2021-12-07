import {observable, when, action, computed, makeObservable} from 'mobx';
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
        console.log('init')

        makeObservable(this);

        if(!this.values && !isServer) {
           when(() => this.alias,
               ()=>{
                   this.getProduct();
                   this.getHierarchy();
               })
        }
    }

    async hydrate(RootStore) {
        const {ProductStore = {}} = RootStore.initialData.stores || {};
        console.log('RootStore', RootStore);

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
        try {
            const body = {product: this.alias};
            const {hierarchy} = await api.post('catalog/getHierarchy', body);

            this.setHierarchy(hierarchy);
        } catch (_) {
            alert({type: 'error', title: 'Ошибка при получении иерархии'});
        }
    }

    getProduct = async () => {
        try {
            console.log('getProduct', this.alias);
            const {values, fields} = await api.get(`products/get/${this.alias}`);

            this.setValues(values);
            this.setFields(fields);
        } catch (_) {
            alert({type: 'error', title: 'Ошибка при получении товара'});
        }
    }
}

export {ProductStore};
