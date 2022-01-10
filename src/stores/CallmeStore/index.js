import {observable, action, makeObservable} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from '../../api';
import {alert} from '../Notifications';

class CallmeStore {

    @observable isShow;
    @observable status = statusEnum.LOADING;
    @observable name;
    @observable phone;

    constructor() {
      makeObservable(this);
    }

    @action toggleShow = () => {
      this.isShow = !this.isShow;
    }

    @action setName = ({target: {value}}) => {
      this.name = value;
    }

    @action setPhone = ({target: {value}}) => {
      this.phone = value;
    }

    @action clear = () => {
        this.phone = '';
        this.name = '';
    }

    checkFields = () => this.phone && this.name

    apply = (product) => {
      const isreq = this.checkFields();

      if (!isreq) {
        alert({type: 'warning', title: 'Заполните контактную информацию!'});

        return;
      }
      this.sendEmail(product);
      this.toggleShow();
    }

    getProduct = (product) => {
      if (!product) {
        return null;
      }

      return {
        id: product.id,
        name: product.name,
        img: product.imgs && product.imgs[0]?.src
      };
    }

    sendEmail = async(_product) => {
      const {phone, name} = this;
      const product = this.getProduct(_product);

      try {
        const body = {phone, name, product};

        await api.post('send/callme ', body);

        alert({
          type: 'success',
          title: 'Ваша заявка принята! Наш специалист свяжется с вами в ближайщее время'
        });

        this.clear();

      } catch(e) {
          console.log(e);
        alert({type: 'error', title: 'Извините, произошла ошибка при создании заявки'});
      }
    }
}

export {CallmeStore};
