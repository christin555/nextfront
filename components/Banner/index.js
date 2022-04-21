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
import {Box, Typography} from '@mui/material';
import React from 'react';
import classNames from "classnames";
import NextLink from 'next/link';

const CarouselView = ({deviceType, className, items}) => {

    const isMobile = deviceType === 'mobile';

    return (
        <div className={classNames(s.container, className)}>
            <Swiper
                modules={[Navigation, Autoplay, Pagination, EffectFade, A11y]}
                effect="fade"
                spaceBetween={'20px'}
                slidesPerView={1}
                navigation={!isMobile}
                autoplay={{
                    delay: 8500,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true
                }}
            >
                {
                    items.map(({
                                   mobileBackground,
                                   img,
                                   text,
                                   title,
                                   reverse,
                                   background,
                                   link,
                                   alignItems = 'center',
                                   justifyContent = 'flex-end',
                                   textButton
                               }, index) => {
                        return <SwiperSlide key={index}>
                            <div className={classNames(s.slide, {[s.reverse]: reverse})}>
                                {
                                    img && <div className={s.image}>
                                        <img src={img}/>
                                    </div> || null
                                }
                                <div className={s.text}>
                                    <div className={s.content} style={{alignItems, justifyContent}}>
                                        <Typography
                                            variant={isMobile && 'h4' || 'h3'}> {title} </Typography>
                                        <Typography className={s.desc}
                                                    variant={isMobile && 'body2' || 'subtitle1'}>
                                            {text}
                                        </Typography>
                                        {link ? <NextLink href={link}
                                                          passHref
                                                          shallow={true}
                                        >
                                            <Button variant={'contained'} color={'secondary'} className={s.button}>
                                                {textButton}
                                            </Button>
                                        </NextLink> : null}
                                    </div>

                                    <div className={s.background}>
                                        <img src={isMobile && mobileBackground || background}/>
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
