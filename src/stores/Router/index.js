import {observable, get, action, makeObservable, computed, toJS, reaction, autorun} from 'mobx';
import Router from 'next/router'

const isServer = typeof window === 'undefined';

class RouterStore {
    @observable searchValue = '';
    @observable fastfilter;

    @observable location = {};
    @observable match = {};
    @observable history = {};

    @observable router = {};
    @observable isService;

    constructor({router} = {}) {
        makeObservable(this);

        this.router = router;
        this.fastfilter = router.query.fastfilter || '';
    }

    @computed get pathname() {
        return this.router.pathname;
    }

    @computed get query() {
        return this.router.query;
    }

    @action push = async (params) => {
        await Router.router.push(params);

        this.router = {...Router.router}
    }

    @action setValue = ({target: {value}}) => {
        this.searchValue = value;
    }

    @action search = async () => {
        if (!this.searchValue) {
            return
        }
        this.push({
                pathname: '/catalog',
                query: {
                    fastfilter: this.searchValue.trim()
                }
            },
            undefined,
            {shallow: true}
        );
        this.fastfilter = this.searchValue;
    }
}

// Global store
export default RouterStore;
