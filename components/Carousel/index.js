import React, {useRef, useState} from 'react';
import Nophoto from '../../public/nophoto.png';
import s from './carousel.module.scss';
import Image from 'next/image';
import {A11y, Thumbs, EffectFade, FreeMode, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/a11y';
import 'swiper/css/zoom';
import Gallery from './gallery';

const CarouselView = ({imgs, name}) => {
  const carouselBlockRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpenGallery, setIsOpenGallery] = useState(false);

  let images;

  if (!imgs) {
    return (
      <SwiperSlide className={s.itemCarousel}>
        <Image
          placeholder={'blur'}
          blurDataURL='/blur.png'
          width='100%'
          height='100%'
          layout='responsive'
          objectFit='contain'
          alt={name || 'Слайд'}
          src={Nophoto}
          unoptimized={true}
          loader={() => Nophoto}
        />
      </SwiperSlide>
    );
  }

  images = imgs.map(({src}, index) => (
    <SwiperSlide
      onClick={() => setIsOpenGallery(true)}
      key={index}
      className={s.itemCarousel}
    >
      <Image
        placeholder={'blur'}
        blurDataURL='/blur.png'
        quality={90}
        width='100%'
        height='100%'
        layout='responsive'
        objectFit='contain'
        alt={name || 'Слайд'}
        src={src}
        unoptimized={true}
        loader={() => src}
      />
    </SwiperSlide>
  ));
  const thumbs = imgs.map(({src}, index) => (
    <SwiperSlide key={index} className={s.thumbCarousel}>
      <Image
        unoptimized={true}
        quality={30}
        placeholder={'blur'}
        blurDataURL='/blur.png'
        width='80'
        height='80'
        objectFit='cover'
        alt={'Слайд'}
        src={src}
        loader={() => src}
      />
    </SwiperSlide>
  ));

  return (
    <div ref={carouselBlockRef}>
      <Swiper
        thumbs={{swiper: thumbsSwiper}}
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
        className={s.thumbs}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={'auto'}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {thumbs}
      </Swiper>
      <Gallery
        imgs={imgs}
        isOpen={isOpenGallery}
        setIsOpenGallery={setIsOpenGallery}
      />
    </div>
  );
};

export default CarouselView;
