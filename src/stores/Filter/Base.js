import {action, computed, makeObservable, observable, toJS} from 'mobx';
import api from '../../api';
import {alert} from '../Notifications';
import Router from 'next/router';
import formatPrice from "../../utils/formatPrice";

export class BaseFilterStore {
    @observable values = {};
    @observable checked = {};
    @observable chips = new Map();
    @observable currentParams = {};
    @observable category;
    @observable disabled = {};
    @observable selection = {};
    @observable unitPrice = '₽';

    // Override in child;
    fieldsLabel = {};
    withUnit = [
      'width',
        'thickness',
        'totalThickness',
        'size',
        'widthRange',
        'heightRange',
      'height'
    ];

    constructor(RootStore) {
        this.category = RootStore.category;
        this.RouterStore = RootStore.RouterStore;

        this.setCurrentParams(RootStore.RouterStore.query);

        this.loadValues();

        makeObservable(this);
    }

    @action updateCategory = (category, params = {}) => {
        this.category = category;
        this.setCurrentParams(params);
        this.loadValues();
    }

    @action merge = ({values, category, checked, currentParams, chips}) => {
        this.values = values || [];
        this.category = category;
        //  this.chips = chips;
        this.checked = checked;
        this.currentParams = currentParams;
    }

    @action setCurrentParams = async (_params) => {
        const params = {..._params};
        delete params.limit;
        delete params.page;

        this.currentParams = params;

        await this.setSelection(params.selection)
    }

    @action setSelection = async (selectionAlias) => {
        if (!selectionAlias) {
            this.selection = {}
            return;
        }

        try {
            this.selection = await api.post('selections/get', {alias: selectionAlias});

            this.setChips('selection', {
                fieldName: 'Подборка',
                name: this.selection.title,
                id: this.selection.alias
            }, true);
        } catch (e) {
            this.selection = {}
        }
    }

    @action setCategory(category) {
        this.category = category;
    }

    @computed get isActive() {
        return Object.values(this.checked).filter(Boolean).length;
    }

    @action _setValues(values) {
        this.values = Object.entries(values).reduce((res, [key, val]) => {
            res[key] = val.sort((a,b) => a.name - b.name).map(({name, ...item}) =>{
                const label = this.withUnit.includes(key) ? `${name} мм` : name;

                return {...item, name: label}
            });

            return res
        }, {});
    }

    @action resetTemps() {
        this.checked = {};
        this.chips = new Map();
        this.currentParams = {}
        this.disabled = {};
    }

    @action.bound clear() {
        this.clearPath();
        this.resetTemps();
    }

    @action initRange = (key, val, chips, checked) => {
        const range = val.split("-")

        checked[key] = {};

        checked[key]['min'] = range[0];
        checked[key]['max'] = range[1];

        const min = range[0] > 0 ? `от ${range[0]} мм` : '';

        const max =  range[1] > 0 ? `до ${range[1]} мм` : ''

        const label = `${min} ${max}`.trim();

        chips.set(key, {
            fieldName: this.fieldsLabel[key],
            label: label,
            key,
            val: key
        })
    }

    @action initPrice = (val, chips, checked) => {
        const price = val.split("-")

        checked['minPrice'] = price[0];
        checked['maxPrice'] = price[1];

        const min = price[0] > 0 ? `от ${formatPrice({
              price: price[0],
              unit: this.unitPrice
          })} ` : '';

        const max =  price[1] > 0 ? `до ${formatPrice({
            price:  price[1],
            unit: this.unitPrice
        })}` : ''

        const label = `${min} ${max}`.trim();

        chips.set('price', {
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
        const _chips = new Map();
        const _checked = {};
        Object.entries(this.currentParams).forEach(([key, value]) => {
            if (key !== 'category') {
                if (key === 'price') {
                    this.initPrice(value, _chips, _checked);
                } else if (key.includes('Range')) {
                    this.initRange(key, value, _chips, _checked);
                } else if (Array.isArray(value)) {
                    value.forEach((val) => {
                        const _key = this.getKey(key, val);
                        _checked[_key] = true;

                        const item = this.values[key]?.find(({id}) => Number(id) === Number(val));

                        item && _chips.set(_key, {
                            fieldName: this.fieldsLabel[key],
                            label: item.name,
                            key: key,
                            val: item.id
                        });
                    })
                } else if (this.fieldsLabel[key]) {
                    const _key = this.getKey(key, value);
                    _checked[_key] = true;

                    let item = this.values[key]?.find(({id}) => Number(id) === Number(value));

                    if (!item) {
                        item = {
                            name: 'Да',
                            val: 1
                        }
                    }

                    const label = this.withUnit.includes(key) ? `${item.name} мм` : item.name;
                    _chips.set(_key, {
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

    @action setRange = (name, key, val) => {
        if(!this.checked[name]){
            this.checked[name] = {}
        }
        this.checked[name][key] = val
    }

    @action setPrice = (price, key) => {
        this.checked[key] = price;
    }

    setRangePath = async (name) => {
        if(!Number(this.checked[name]['min']) && !Number(this.checked[name]['max'])){
            this.setRange(name, 'min', null);
            this.setPrice(name, 'max', null);

            await this.setPathRange(name, null, true);

            return;
        }

        !this.checked[name]['min'] && this.setRange(name, 'min', '0');

        let pathString = this.checked[name]['max'] > 0 ?
          `${this.checked[name]['min']}-${this.checked[name]['max']}` :
          `${this.checked[name]['min']}`;

        await this.setPathRange(name, pathString.replace(/\s/g, ''), true);

        const oldChip = this.chips.get(name);
        const min = this.checked[name]['min'] > 0 ? `от ${this.checked[name]['min']} мм` : '';

        const max = this.checked[name]['max'] > 0 ? `до ${this.checked[name]['max']} мм` : '';

        const label = `${min} ${max}`.trim();

        if (oldChip) {
            oldChip.label = label;
        } else {
            this.setChips(
              name,
              {
                  name: label
              },
              true
            );
        }
    }

    setPricePath = async (price, key) => {
        if(!Number(this.checked['minPrice']) && !Number(this.checked['maxPrice'])){
            this.setPrice(null, 'minPrice');
            this.setPrice(null, 'maxPrice');

            await this.setPathPrice(null, true);

            return;
        }

        // await this.resetPage();
        !this.checked['minPrice'] && this.setPrice('0', 'minPrice');
        // !this.checked['maxPrice'] && this.setPrice('20000', 'maxPrice');
        // await this.resetPage();

        let pathString = this.checked['maxPrice'] > 0 ?
          `${this.checked['minPrice']}-${this.checked['maxPrice']}` :
          `${this.checked['minPrice']}`;

        await this.setPathPrice(pathString.replace(/\s/g, ''), true);

        const oldChip = this.chips.get('price');
        const min = this.checked['minPrice'] > 0 ? `от ${formatPrice(
            {
                price: this.checked['minPrice'],
                unit: this.unitPrice
            })} ` : '';

        const max = this.checked['maxPrice'] > 0 ? `до ${formatPrice({
            price: this.checked['maxPrice'],
            unit: this.unitPrice})}` : '';

        const label = `${min} ${max}`.trim();

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

        if(key === 'price' && !checked) {
            this.setPrice(null, 'minPrice');
            this.setPrice(null, 'maxPrice');
        } else {
            this.setChecked(key, id, checked);
        }

        this.setChips(key, item, checked);

        await this.afterValueCheck(key, item, checked);
    };

    hasValue = (key, id) => this.checked[`${key} -${id}`];

    hasKey = (key) => {
        if(key === 'price') {
            return this.checked['minPrice'] || this.checked['maxPrice']
        }
       return Object
            .keys(this.checked)
            .filter((checkedKey) => checkedKey.indexOf(key) > -1 && this.checked[checkedKey] === true).length > 0;
    }

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
        const _key = this.getKey(key, item.id);
        if (checked) {
            this.chips.set(_key, {
                fieldName: this.fieldsLabel[key] || item.fieldName,
                label: item.name,
                key: key,
                val: item.id
            });
        } else {
            this.chips.has(_key) ?
              this.chips.delete(_key) :
              this.chips.has(key) ? this.chips.delete(key) : null;
        }
    };

    getKey = (key, val) => `${key}-${val}`;

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

    async setPathPrice(val, checked) {
        const urlSearch = toJS({...Router.router.query || {}});

        if (checked) {
            urlSearch['price'] = val
        } else {
            delete urlSearch['price']
        }


        await this.pushRouter(urlSearch)
    }

    async setPathRange(name, val, checked) {
        const urlSearch = toJS({...Router.router.query || {}});

        if (checked) {
            urlSearch[name] = val
        } else {
            delete urlSearch[name]
        }


        await this.pushRouter(urlSearch)
    }

    async setPath(key, id, checked) {
        const urlSearch = toJS({...Router.router.query || {}});

        if (checked) {
            const val = urlSearch[key] ? [id].concat(urlSearch[key]) :[id]
            urlSearch[key] = val
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
