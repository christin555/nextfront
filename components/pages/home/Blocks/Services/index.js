import React, {Component, useEffect, useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../../../../ServiceCard';
import {inject, observer} from 'mobx-react';
import s from './Style.module.scss';
import TitleBlock from '../../../../TitleBlock';
import Link from 'next/link';

@inject(({RootStore: {HomeStore}}) => {
    return {
        services: HomeStore.services || [],
        deviceType: HomeStore.deviceType
    };
})
@observer
class CardsView extends Component {
    responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        }
    };

    render() {
        const {services, deviceType} = this.props;

        const Cards = services.map((item, index) => (
            <div key={index} className={s.cardContainer}>
                <Card
                    classNamesRoot={s.card}
                    key={index}
                    {...item}
                />
            </div>
        ));


        return (
            <div className={s.container}>
                <div className={s.header}>
                    <TitleBlock title={'Популярные услуги'}/>
                    <Link href={{
                        pathname: '/services',
                    }}
                          as={`/services`}
                          passHref
                    >
                        <a> Все услуги </a>
                    </Link>
                </div>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={this.responsive}
                    infinite={false}
                    autoPlay={false}
                    keyBoardControl={true}
                    customTransition='all 1s linear'
                    transitionDuration={300}
                    containerClass='carousel-container'
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    deviceType={deviceType}
                    itemClass={s.carouselItem}
                    ssr={true}
                >
                    {Cards}
                </Carousel>
            </div>
        );
    }
}

export default CardsView;
