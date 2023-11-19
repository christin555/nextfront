import React, {useRef, useState} from 'react';
import Nophoto from '../../public/nophoto.png';
import s from './carousel.module.scss';
import Image from 'next/image';
import {A11y, Thumbs, EffectFade, FreeMode, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import Gallery from './gallery';
import 'swiper/css/effect-fade';
import 'swiper/css/a11y';
import {Portal} from '@mui/base/Portal';
import PlayerView from '../VideoPlayer';

const CarouselView = ({imgs, name}) => {
  const carouselBlockRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpenGallery, setIsOpenGallery] = useState(false);

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

  const images = imgs.map(({src, type}, index) => (
    <SwiperSlide
      onClick={() => setIsOpenGallery(true)}
      key={index}
      className={s.itemCarousel}
    >
      {
        type === 'video' ? (
          <React.Fragment>
            <video src={`https://master-pola.com/${src}`} className={s.videoBg} />
            <PlayerView
              key={src}
              muted={'false'}
              classNameContainer={s.verticalContainerPlayer}
              classNamePlayer={s.verticalPlayer}
              src={`https://master-pola.com/${src}`}
              autoplay={false}
            />
          </React.Fragment>
        ) : (
          <Image
            placeholder={'blur'}
            blurDataURL='/blur.png'
            quality={90}
            width='100%'
            height='100%'
            layout='responsive'
            objectFit='contain'
            alt={name || 'Слайд'}
            src={`https://master-pola.com/${src}`}
            unoptimized={true}
            loader={() => `https://master-pola.com/${src}`}
          />
        )
      }

    </SwiperSlide>
  ));

  const thumbs = imgs.map(({src, type}, index) => (
    <SwiperSlide key={index} className={s.thumbCarousel}>
      {
        type === 'video' ? (
          <div
            className={s.videoThumb}
          >
            <div className={s.iconPlay}>
              <svg
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
              >
                <path
                  d='m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                />
              </svg>
            </div>
            <video
              src={`https://master-pola.com/${src}`}
            />
          </div
          >

        ) : (
          <Image
            unoptimized={true}
            quality={30}
            placeholder={'blur'}
            blurDataURL='/blur.png'
            width='80'
            height='80'
            objectFit='cover'
            alt={'Слайд'}
            src={`https://master-pola.com/${src}`}
            loader={() => `https://master-pola.com/${src}`}
          />
        )
      }
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
      <Portal>
        <Gallery
          imgs={imgs}
          isOpen={isOpenGallery}
          setIsOpenGallery={setIsOpenGallery}
        />
      </Portal>
    </div>
  );
};

export default CarouselView;
