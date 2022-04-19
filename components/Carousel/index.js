import React, {useRef, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Nophoto from "../../public/nophoto.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './carousel.module.scss';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {IconButton} from '@mui/material';
import {A11y, Thumbs, EffectFade,FreeMode, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/a11y';

const CarouselView = ({imgs}) => {
    const carouselRef = useRef(null);
    const carouselBlockRef = useRef(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    let images;

    if (!imgs) {
        images = [{original: Nophoto}];
    }

    images = imgs.map(({src}, index) => <SwiperSlide key={index} className={s.itemCarousel}>
            <Image
                placeholder={'blur'}
                blurDataURL="/blur.png"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                alt={'Слайд'}
                src={'https://master-pola.com' + src}
                loader={() => 'https://master-pola.com' + src}
            />
    </SwiperSlide>
    );


   const thumbs = imgs.map(({src}, index) => <SwiperSlide key={index} className={s.thumbCarousel}>
            <Image
                quality={30}
                placeholder={'blur'}
                blurDataURL="/blur.png"
                width="80"
                height="80"
                objectFit="cover"
                alt={'Слайд'}
                src={'https://master-pola.com' + src}
                loader={() => 'https://master-pola.com' + src}
            />
        </SwiperSlide>
    );

    return (
        <div ref={carouselBlockRef}>
            <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                className={s.carouselHeight}
                slidesPerView={1}
                navigation={true}
                pagination={{
                    clickable: true
                }}
                modules={[
                    Navigation, Thumbs, Pagination, EffectFade, A11y
                ]}
            >
                {images}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={'auto'}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {thumbs}
            </Swiper>
        </div>
    )
}

export default CarouselView;
