import React from 'react';
import Carousel from '../../components/Carousel';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Works.module.scss';
import Callme from '../../components/Callme';
import Card from "../../components/ServiceCard";
import {inject, observer} from "mobx-react";
import Hierarchy from "../../components/HierarchyNew";


@inject(({RootStore: {ServicesStore}}) => {
    return {
        services: ServicesStore.services || []
    };
})
@observer
class Works extends React.Component {
    get images() {
        return [
            'https://master-pola.com/dashboard/uploads/photo_2021_08_16_10_49_30_75873a6530.jpg',
            'https://master-pola.com/dashboard/uploads/photo_2021_09_26_18_21_54_8cf742ce77.jpg',
            'https://master-pola.com/dashboard/uploads/photo_2021_09_26_18_21_55_deb0f342fd.jpg',
            'https://master-pola.com/dashboard/uploads/231010181_367703998223584_4932221462493184205_n_6c40acb90a.jpg'
        ].map((img) => {
            return {src: img};
        });
    }

    get cards() {
        const {services} = this.props;

        return services.map((item, index) => (<Card key ={index} {...item}/>));
    }


    render() {
        return (
            <React.Fragment>
                {/*<div className={s.header}>*/}
                {/*    {'Услуги'}*/}
                {/*    <div className={s.line}/>*/}
                {/*</div>*/}
                <Hierarchy hierarchy={[{pathname: '/services', name: 'Услуги'}]}/>
                <div className={s.content}>
                    <div className={s.preview}>
                        <div className={s.text}>
                            <h2>
                                Команда, которой можно доверить ремонт
                            </h2>
                            <p>
                                Неважно, хотите ли вы отремонтировать ваш дом,
                                построить новый с нуля или вам нужны только небольшие косметические работы, - мы сможем
                                помочь вам
                            </p>
                            <p>
                                Наши клиенты доверяют нам и полагаются на наши товары и услуги.
                                Специалисты, которые работают у нас, обладают высокой профессиональной
                                компетенцией и всегда готовы помочь советом и делом
                            </p>
                            <Callme className={s.button} buttonText={'Рассчитайте стоимость монтажа в вашем доме'}/>
                        </div>
                    </div>

                    <div className={s.cards}>
                        {this.cards}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Works.getInitialProps = async ({MobxStore}) => {
    await MobxStore.RootStore.ServicesStore.getServices();

    return {MobxStore};
}


export default Works;
