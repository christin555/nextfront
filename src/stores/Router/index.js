import {observable, get, action, makeObservable, computed, toJS, reaction, autorun} from 'mobx';
import Router from 'next/router'

const isServer = typeof window === 'undefined';

class RouterStore {
    @observable location = {};
    @observable match = {};
    @observable history = {};

    @observable router;
    @observable isService;

    constructor({router} = {}) {
        makeObservable(this);
        this.router = router;
    }

    @computed get pathname() {
        return this.router.pathname;
    }

    @computed get query() {
        return this.router.query;
    }

    @action push = async(params) => {
       await Router.router.push(params);

       this.router = {...Router.router}
    }

}

// Global store
export default RouterStore;
