import {observable, action, makeObservable} from 'mobx';
import api from 'api';

class PopularStore {
    @observable popularProducts = [];
    @observable deviceType = null;

    constructor(RootStore) {
      makeObservable(this);
      const {stores: {PopularStore} = {}} = RootStore.initialData;

      this.popularProducts = PopularStore?.popularProducts || [];
      this.deviceType = PopularStore?.deviceType;

      if (!PopularStore?.popularProducts.length) {
        this.getPopularProducts();
      }
    }

    @action merge = ({deviceType, popularProducts}) => {
      this.popularProducts = popularProducts;
      this.deviceType = deviceType;
    }

    @action setPopularProducts = (popularProducts) => {
      this.popularProducts = popularProducts;
    }

    @action setDevice = (deviceType) => {
      this.deviceType = deviceType;
    }

    async getPopularProducts() {
      try {
        const popular = await api.post('products/getPopular');

        this.setPopularProducts(popular);

      } catch(err) {
        console.log(err);
      }
    }
}

export default PopularStore;
