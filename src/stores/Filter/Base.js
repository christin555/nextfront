import {action, computed, makeObservable, observable, toJS} from 'mobx';
import api from '../../api';
import {alert} from '../Notifications';
import Router from 'next/router';

export class BaseFilterStore {
    @observable values = {};
    @observable checked = {};
    @observable chips = [];
    @observable currentParams = {};

    // Override in child;
    fieldsLabel = {};
    tableFields = {};

    constructor(category, RootStore) {
        this.category = category;
        this.RouterStore = RootStore.RouterStore;

        this.setCurrentParams(RootStore.RouterStore.query);

        // this.values = RootStore.initialData.ActiveFilterStore?.values || {};
        // this.checked = RootStore.initialData.ActiveFilterStore?.checked || {};
        // this.chips = RootStore.initialData.ActiveFilterStore?.chips || [];

        this.loadValues();

        makeObservable(this);
    }

    @action setCurrentParams = (_params) => {
        const params = {..._params};
        delete params.limit;
        delete params.page;

        this.currentParams = params;
    }


    @computed get isActive() {
        return Object.values(this.checked).filter(Boolean).length;
    }

    @action _setValues(values) {
        this.values = values;
    }

    @action.bound clear() {
        this.clearPath();
        this.checked = {};
        this.chips = [];
    }

    @action initChecked() {
        const _chips = []
        const _checked = {};
        Object.entries(this.currentParams).forEach(([key, value]) => {
            if (key !== 'category') {
                const _key = this.tableFields[key]

                if (Array.isArray(value)) {
                    value.forEach((val) => {
                        _checked[`${key}-${val}`] = true;

                        const item = this.values[_key]?.find(({id}) => Number(id) === Number(val));
                        item && _chips.push({
                            fieldName: this.fieldsLabel[key],
                            label: item.name,
                            key: key,
                            val: item.id
                        });
                    })
                } else {
                    _checked[`${key}-${value}`] = true;

                    const item = this.values[_key]?.find(({id}) => Number(id) === Number(value));
                    item && _chips.push({
                        fieldName: this.fieldsLabel[key],
                        label: item.name,
                        key: key,
                        val: item.id
                    });
                }
            }
        });

        this.checked = _checked;
        this.chips = _chips;
    }


    clearPath() {
        const {limit, page} = {...this.RouterStore.query || {}};
        const query = {}
        if (limit) {
            query[limit] = limit;
        }
        if (page) {
            query[page] = page
        }

        this.RouterStore.push({
                pathname: this.RouterStore.pathname,
                query: {
                    category: this.RouterStore.router.query.category,
                    ...query
                }
            },
            undefined,
            {shallow: true}
        );
    }

    getBody() {
        return {
            category: this.category
        };
    }

    // Тут можно переопределить логику после выбора элемента
    afterValueCheck() {
        // implement in child
    }

    // Тут можно переопределить логику до выбора элемента
    beforeValueCheck() {
        // implement in children
    }

    setValue = (key) => async (checked, item) => {
        const {id} = item;

        await this.resetPage();
        await this.beforeValueCheck(key, item, checked);

        await this.setPath(key, id, checked);
        this.setChecked(key, id, checked);
        this.setChips(key, item, checked);

        await this.afterValueCheck(key, item, checked);
    };

    hasValue = (key, id) => this.checked[`${key}-${id}`];

    hasKey = (key) => Object
        .keys(this.checked)
        .filter((checkedKey) => checkedKey.indexOf(key) > -1 && this.checked[checkedKey] === true).length > 0;

    resetPage = () => {
        // this.PageStore.setPage(1);
    };

    async loadValues() {
        try {
            const values = await api.post('catalog/getFilterFields', this.getBody());

            this._setValues(values);
            this.initChecked();
        } catch (e) {
            console.log(e);
            alert({type: 'error', title: 'Ошибка при получении фильтра'});
        }
    }

    @action setChecked = (key, value, state) => {
        const prefix = `${key}-${value}`;

        this.checked[prefix] = state;
    };

    @action setChips = (key, item, checked) => {
        if (checked) {
            this.chips.push({
                fieldName: this.fieldsLabel[key],
                label: item.name,
                key,
                val: item.id
            });
        } else {
            const idx = this.chips.findIndex((chip) => {
                return chip.key === key && chip.val === item.id;
            });

            this.chips.splice(idx, 1);
        }
    };

    async setPath(key, id, checked) {
        const urlSearch = toJS({...Router.router.query || {}});

        if (checked) {
            urlSearch[key] = [id].concat(...(urlSearch[key] || []))
        } else {
            if (Array.isArray(urlSearch[key])) {
                urlSearch[key] = urlSearch[key].filter((val) => Number(val) !== Number(id))
            } else {
                delete urlSearch[key]
            }
        }


        await this.RouterStore.push({
                pathname: this.RouterStore.pathname,
                query: {
                    category: this.RouterStore.router.query.category,
                    ...urlSearch
                }
            },
            undefined,
            {shallow: true});

        this.setCurrentParams(urlSearch)
    }
}
