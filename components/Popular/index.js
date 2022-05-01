import React, {Component, useEffect, useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Cards/Card';
import {inject, observer} from 'mobx-react';
import s from './styles.module.scss';
import TitleBlock from '../TitleBlock';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

@inject(({RootStore: {PopularStore, deviceType}}) => {
    return {
        popularProducts: PopularStore?.popularProducts || [],
        deviceType: deviceType
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
            breakpoint: {max: 1024, min: 650},
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 650, min: 0},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        }
    };

    render() {
        const {popularProducts, deviceType} = this.props;

        const Cards = popularProducts.map((item, index) => (
            <Card
                withCategory={true}
                key={index}
                {...item}
            />
        ));

        return (
            <div className={s.container}>
                <TitleBlock title={
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                    <FavoriteRoundedIcon className={s.favIcon}/>
                    Мастер советует
                </span>}/>
                <div className={s.cards}>
                    <Carousel
                        swipeable={true}
                        draggable={false}
                        showDots={false}
                        responsive={this.responsive}
                        infinite={false}
                        autoPlay={false}
                        keyBoardControl={true}
                        customTransition='all 0.5s linear'
                        transitionDuration={300}
                        removeArrowOnDeviceType={['tablet', 'mobile']}
                        deviceType={deviceType}
                        itemClass={s.carouselItem}
                        ssr={true}
                    >
                        {Cards}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default CardsView;
