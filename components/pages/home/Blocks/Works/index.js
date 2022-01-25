import React, {Component, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import s from './Style.module.scss';
import Card from '../../../../WorkCard';
import classNames from "classnames";
import Link from 'next/link';

@inject(({RootStore: {HomeStore}}) => {
    return {
        works: HomeStore.works || []
    };
})
@observer
class Works extends Component {

    render() {
        const {works} = this.props;

        const Cards = works.map((item, index) => (
            <div key={index} className={s.cardContainer}>
                <Card {...item}/>
            </div>
        ));


        return (
            <div className={s.container}>
                <div className={s.header}>
                    <h3>Наши работы </h3>
                    <Link href={{
                        pathname: '/works',
                    }}
                          as={`/works`}
                          passHref
                          shallow={true}>

                        <a> Все работы </a>
                    </Link>
                </div>
                <div className={s.cards}>
                    {Cards}
                </div>
            </div>
        );
    }
}

export default Works;
