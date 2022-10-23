import {observable, action, makeObservable, toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from '../../api';
import {alert} from '../Notifications';
import axios from "axios";

class CallmeStore {

    @observable isShow;
    @observable status = statusEnum.LOADING;
    @observable name;
    @observable phone;
    @observable square
    @observable channel = 'телефон';
    @observable listCalculates = [];

    constructor() {
        makeObservable(this);
    }


    @action setListCalculates = (value, checked) => {
        if (this.listCalculates.includes(value) && checked === false) {
            this.listCalculates = toJS(this.listCalculates).filter(val => val !== value);
        } else if (checked) {
             this.listCalculates = [...this.listCalculates, value];
        }
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

    @action setPhone = ({target: {value}}) => {
        this.phone = value;
    }

    @action clear = () => {
        this.phone = '';
        this.name = '';
    }

    checkFields = () => this.phone && this.name

    apply = (product) => {
        console.log('apply')
        const isreq = this.checkFields();

        if (!isreq) {
            alert({type: 'warning', title: 'Заполните контактную информацию!'});

            return;
        }

        this.sendEmail(product);
        this.toggleShow();
    }

    getLocation = async () => {
        try {
            const address = await axios.get('https://geolocation-db.com/json/').then(({data}) => data);
            return address
        } catch (e) {
            return null
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

    sendEmail = async (_product) => {
        console.log('sendEmail')

        const {phone, name, channel, square, listCalculates} = this;
        const product = this.getProduct(_product);
        const address = await this.getLocation();

        console.log('sendEmail')

        try {
            const body = {phone, name, product, address, channel, square, listCalculates};

            await api.post('send/callme ', body);

            alert({
                type: 'success',
                title: 'Ваша заявка принята! Наш специалист свяжется с вами в ближайщее время'
            });

            this.clear();

        } catch (e) {
            console.log(e);
            alert({type: 'error', title: 'Извините, произошла ошибка при создании заявки'});
        }
    }
}

export {CallmeStore};
