// Import Swiper React components
import {Navigation, Pagination, Autoplay, EffectFade, A11y} from 'swiper';
import Image from "next/image";
import Button from '../Button';
import s from './Banner.module.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/a11y';
import {Box} from '@mui/material';
import React from 'react';
import classNames from "classnames";
import NextLink from 'next/link';

const CarouselView = ({deviceType, className, items}) => {

    return (
        <div className={classNames(s.container, className)}>
            <Swiper
                modules={[Navigation, Autoplay, Pagination, EffectFade, A11y]}
                effect="fade"
                spaceBetween={20}
                slidesPerView={1}
                navigation={deviceType !== 'mobile'}
                 autoplay={{
                //     delay: 5500,
                  //   disableOnInteraction: false,
                 }}
                pagination={{
                    clickable: true
                }}
            >
                {
                    items.map(({img, text, title, reverse, background, link, textButton}, index) => {
                        return <SwiperSlide key={index}>
                            <div className={classNames(s.slide, {[s.reverse]: reverse})}>
                                {
                                    img && <div className={s.image}>
                                        <img
                                            className={s.img}
                                            src={img}
                                        />
                                    </div> || null
                                }
                                <div className={s.text}>
                                    <div className={s.content}>
                                        <h3> {title} </h3>
                                        <div className={s.desc}>
                                            {text}
                                        </div>
                                        <NextLink href={link}
                                            passHref
                                            shallow={true}
                                        >
                                            <Button variant={'contained'} color={'secondary'} className={s.button}>
                                            {textButton}
                                        </Button>
                                        </NextLink>
                                    </div>

                                    <div className={s.background}>
                                        <img src={background}/>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    })}
            </Swiper>
        </div>
    );
};

export default CarouselView;
