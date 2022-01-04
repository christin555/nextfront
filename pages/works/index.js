import React from 'react';
import s from './Works.module.scss';
import Callme from '../../components/Callme';
import Card from "../../components/WorkCard";
import {inject, observer} from "mobx-react";


@inject(({RootStore: {WorksStore}}) => {
    return {
        works: WorksStore.works || []
    };
})
@observer
class Works extends React.Component {

    get cards() {
        const {works} = this.props;

        console.log(works)
        return works.map((item) => (<Card {...item}/>));
    }


    render() {
        return (
            <React.Fragment>
                {/*<div className={s.header}>*/}
                {/*    {'Услуги'}*/}
                {/*    <div className={s.line}/>*/}
                {/*</div>*/}
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
    await MobxStore.RootStore.WorksStore.getWorks();

    return {MobxStore};
}


export default Works;
