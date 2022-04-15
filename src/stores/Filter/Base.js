import {action, computed, makeObservable, observable, toJS} from 'mobx';
import api from '../../api';
import {alert} from '../Notifications';
import Router from 'next/router';

export class BaseFilterStore {
    @observable values = {};
    @observable checked = {};
    @observable chips = [];
    @observable currentParams = {};
    @observable category;
    @observable disabled = {};

    // Override in child;
    fieldsLabel = {};

    constructor(RootStore) {
        this.category = RootStore.category;
        this.RouterStore = RootStore.RouterStore;

        this.setCurrentParams(RootStore.RouterStore.query);

        this.loadValues();

        makeObservable(this);
    }


    @action merge = ({values, category, checked, currentParams, chips}) => {
        this.values = values || [];
        this.category = category;
        this.chips = chips;
        this.checked = checked;
        this.currentParams = currentParams;
    }

    @action setCurrentParams = (_params) => {
        const params = {..._params};
        delete params.limit;
        delete params.page;

        this.currentParams = params;
    }

    @action setCategory(category) {
        this.category = category;
    }

    @computed get isActive() {
        return Object.values(this.checked).filter(Boolean).length;
    }

    @action _setValues(values) {
        this.values = values;
    }

    @action resetTemps() {
        this.checked = {};
        this.chips = [];
        this.currentParams = {}
        this.disabled = {};
    }

    @action.bound clear() {
        this.clearPath();
        this.resetTemps();
    }

    @action initPrice = (val, chips, checked) => {
        const price = val.split("-")

        checked['minPrice'] = price[0];
        checked['maxPrice'] = price[1];
        const label = `${price[0]} - ${price[1]}`;

        chips.push({
            fieldName: this.fieldsLabel['price'],
            label: label,
            key: 'price',
            val: 'price'
        })
    }


    @action disableCollectionsByBrandId = (brandId, checked) => {
        const brandIds = Object.keys(this.checked)
            .filter((key) => key.indexOf('brands') > -1 && this.checked[key])
            .map((key) => Number(key.split('-')[1]));

        // Если ничего не выбрано в брендах, то все коллекции по умолчанию можно тыкать
        if (!brandIds.length) {
            this.setToKey('disabled', 'collections', false);

            return;
        }

        this.collections.forEach((collection) => {
            const brId = collection.brandId;

            let state;

            if (checked) {
                // Дизейблим если бренд текущего элемента не был выбран в фильтре
                state = !brandIds.includes(brId) && brId !== brandId;
            } else {
                // Если бренд в фильтре был выбран, а потом чекбокс убрали,
                // то необходимо снова задизейблить
                state = !brandIds.includes(brandId) && brId === brandId;
            }

            this.setDisabled('collections', collection.id, state);
        });
    };

    setDisabled = (key, value, state) => {
        this.disabled[`${key}-${value}`] = state;
    };

    setToKey = (field, key, value) => {
        Object.keys(this[field])
            .forEach((objectKey) => {
                if (objectKey.indexOf(key) > -1) {
                    this[field][objectKey] = value;
                }
            });
    };

    @action initChecked() {
        const _chips = []
        const _checked = {};
        Object.entries(this.currentParams).forEach(([key, value]) => {
            if (key !== 'category') {
                if (key === 'price') {
                    this.initPrice(value, _chips, _checked);
                } else if (Array.isArray(value)) {
                    value.forEach((val) => {
                        _checked[`${key}-${val}`] = true;

                        const item = this.values[key]?.find(({id}) => Number(id) === Number(val));
                        item && _chips.push({
                            fieldName: this.fieldsLabel[key],
                            label: item.name,
                            key: key,
                            val: item.id
                        });
                    })
                } else if (this.fieldsLabel[key]) {
                    _checked[`${key}-${value}`] = true;

                    let item = this.values[key]?.find(({id}) => Number(id) === Number(value));

                    if (!item) {
                        item = {
                            name: 'Да',
                            val: 1
                        }
                    }

                    _chips.push({
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


    async clearPath() {
        const {limit, page} = {...this.RouterStore.query || {}};
        const query = {}

        if (limit) {
            query[limit] = limit;
        }
        if (page) {
            query[page] = page
        }

        await this.pushRouter({
            category: this.RouterStore.router.query.category,
            ...query
        })
    }

    getBody() {
        return {
            category: this.category
        };
    }


    // Тут можно переопределить логику после выбора элемента
    initDisabled() {
        // implement in child
    }

    // Тут можно переопределить логику после выбора элемента
    afterValueCheck() {
        // implement in child
    }

    // Тут можно переопределить логику до выбора элемента
    beforeValueCheck() {
        // implement in children
    }

    @action setPrice = (price, key) => {
        console.log(price)
        this.checked[key] = price;
    }

    setPricePath = async (price, key) => {
        /// await this.resetPage();

        !this.checked['minPrice'] && this.setPrice('1000', 'minPrice');
        !this.checked['maxPrice'] && this.setPrice('4200', 'maxPrice');

        // await this.resetPage();
        await this.setPathPrice(
            `${this.checked['minPrice']}-${this.checked['maxPrice']}`.replace(/\s/g, ''),
            true
        );

        const oldChip = this.chips.find(({key}) => key === 'price');
        const label = ` от ${this.checked['minPrice']} до ${this.checked['maxPrice']}`;

        if (oldChip) {
            oldChip.label = label;
        } else {
            this.setChips(
                'price',
                {
                    name: label
                },
                true
            );
        }
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

    hasValue = (key, id) => this.checked[`${key} -${id}`];

    hasKey = (key) => Object
        .keys(this.checked)
        .filter((checkedKey) => checkedKey.indexOf(key) > -1 && this.checked[checkedKey] === true).length > 0;

    resetPage = () => {
        //this.PageStore.setPage(1);
    };

    async loadValues() {
        try {
            const values = await api.post('catalog/getFilterFields', this.getBody());
            this._setValues(values);
            this.initChecked();
            this.initDisabled();
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

    async setPathPrice(val, checked) {
        const urlSearch = toJS({...Router.router.query || {}});

        if (checked) {
            urlSearch['price'] = val
        } else {
            delete urlSearch['price']
        }


        await this.pushRouter(urlSearch)
    }

    pushRouter = async (urlSearch) => {
        await Router.push({
                pathname: this.RouterStore.router.pathname,
                query: {
                    category: this.RouterStore.router.query.category,
                    ...urlSearch
                }
            },
            undefined,
            {shallow: true}
        );
        // await this.RouterStore.pushFilter(urlSearch)

        this.setCurrentParams(urlSearch);
    }

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


        await this.pushRouter(urlSearch)
    }
}
