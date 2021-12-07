import React, {Component, useEffect, useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Cards/Card';
import {inject, observer} from 'mobx-react';
import s from './styles.module.scss';
import Title from '../Title';

@inject(({RootStore: {PopularStore}}) => {
    return {
        popularProducts: PopularStore.popularProducts || [],
        deviceType: PopularStore.deviceType
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
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        }
    };

    render() {
        const {popularProducts, deviceType} = this.props;

        const Cards = popularProducts.map((item, index) => (
            <div key={index} className={s.cardContainer}>
                <Card
                    classNamesRoot={s.card}
                    withCategory={true}
                    withPopularLabel={false}
                    withPhone={false}
                    key={index}
                    {...item}
                />
            </div>
        ));


        return (
            <div>
                <Title title={'Популярные товары'} className={s.title}/>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={this.responsive}
                    infinite={true}
                    autoPlay={deviceType !== 'mobile'}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    customTransition='all 1s linear'
                    transitionDuration={3000}
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
