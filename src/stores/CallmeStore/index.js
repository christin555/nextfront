import {observable, action, makeObservable, computed, toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from '../../api';
import {alert} from '../Notifications';
import axios from 'axios';

class CallmeStore {

    @observable isShow;
    @observable status = statusEnum.LOADING;
    @observable name = '';
    @observable phone = '';
    @observable square
    @observable channel = 'телефон';
    @observable listCalculates = [];
    @observable category = 'floors';
    @observable values = {};

    @observable failed = false;

    constructor(category) {
      makeObservable(this);

      this.category = category;
    }

    @computed get type() {
      switch (this.category.toLowerCase()) {
        case 'doors':
          return 'doors';
        case 'plintus':
          return 'plintus';
        case 'floor':
          return 'floor';
        default:
          return 'other';
      }
    }

    @action setListCalculates = (value, checked) => {
      if (this.listCalculates.includes(value) && checked === false) {
        this.listCalculates = toJS(this.listCalculates).filter((val) => val !== value);
      } else if (checked) {
        this.listCalculates = [...this.listCalculates, value];
      }
    }

    @action setValue = (key, value) => {
      this.values[key] = value;
    }

    @action setChannel = (_, value) => {
      this.channel = value;
    }

    @action setSquare = ({target: {value}}) => {
      this.square = value;
    }

    @action toggleShow = () => {
      this.isShow = !this.isShow;
    }

    @action setName = ({target: {value}}) => {
      this.name = value;
    }

    @action setClearPhone = (value) => {
      this.phone = value;
    }

    @action setPhone = ({target: {value}}) => {
      this.phone = value;
    }

    @action clear = () => {
      this.phone = null;
      this.name = null;
      this.failed = false;
    }

    @action setFail = (failed) => {
      this.failed = failed;
    }

    @computed get isNumberValid() {
      return this.phone.replace(/[^0-9]/g, '').length === 11;
    }

    checkFields = () => this.phone && this.name;

    apply = (product) => {
      const isreq = this.checkFields();

      if (!isreq) {
        alert({type: 'warning', title: 'Заполните контактную информацию'});
        this.setFail(true);

        return;
      }

      if (!this.isNumberValid) {
        alert({type: 'error', title: 'Некорректный номер телефона'});
        this.setFail(true);

        return;
      }

      this.sendEmail(product);
      this.toggleShow();
      this.clear();
    }

    getLocation = async() => {
      try {
        const address = await axios.get('https://geolocation-db.com/json/').then(({data}) => data);

        return address;
      } catch(e) {
        return null;
      }
    }

    getProduct = (product) => {
      if (!product) {
        return null;
      }

      return {
        alias: product.alias,
        name: product.name,
        img: product.imgs && product.imgs[0]?.src
      };
    }

    sendEmail = async(_product) => {
      const {phone, name, channel, square, listCalculates, values} = this;
      const product = this.getProduct(_product);
      const address = await this.getLocation();

      try {
        const body = {phone, name, product, address, channel, square, listCalculates, ...values};

        await api.post('send/callme ', body);

        alert({
          type: 'success',
          title: 'Ваша заявка принята! Наш специалист свяжется с вами в ближайшее время'
        });

        this.clear();

      } catch(e) {
        alert({type: 'error', title: 'Извините, произошла ошибка при создании заявки'});
      }
    }
}

export {CallmeStore};
