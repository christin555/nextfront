import React from 'react';
import s from './Works.module.scss';
import Callme from '../../components/Callme';
import Card from "../../components/WorkCard";
import {inject, observer} from "mobx-react";
import Hierarchy from "../../components/HierarchyNew";


@inject(({RootStore: {WorksStore}}) => {
    return {
        works: WorksStore.works || [],
        setId: WorksStore.setId
    };
})
@observer
class Works extends React.Component {

    onClick = (id) => {
        //this.props.setId(id);
    }

    get cards() {
        const {works} = this.props;

        return works.map((item) => (<Card onClick = {this.onClick} {...item}/>));
    }


    render() {
        const hierarchy = [{pathname: '/works', name: 'Работы'}]

        return (
            <React.Fragment>
                <Hierarchy hierarchy={hierarchy}/>
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
