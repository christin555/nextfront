import {observable, get, action, computed, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';

class HomeStore {
    RouterStore

    @observable popularProducts;
    constructor() {
      makeObservable(this);

      this.getPopularProducts();
    }

    @action setPopularProducts= (popularProducts) => {
      this.popularProducts = popularProducts;
    }

    getPopularProducts = async() => {
      try {
        const popular = await api.post(`products/getPopular`);
      } catch(_) {
      }
    }
}

export {HomeStore};
