import React, {Component, useEffect, useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Cards/Card';
import s from './styles.module.scss';
import Title from '../Title';

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
        const {cards, deviceType, title} = this.props;

        const Cards = cards.map((item, index) => (
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
            <div className={s.container}>
                <Title title={title} className={s.title}/>
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
