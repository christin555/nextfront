import s from './Gallery.module.scss';
import {Zoom, A11y, EffectFade, Navigation, Pagination} from 'swiper';
import React, {useRef, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';
import PlayerView from '../../VideoPlayer';

const Gallery = (props) => {

  const {
    isOpen,
    imgs,
    setIsOpenGallery
  } = props;
  const carouselBlockRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  });

  if (!isOpen) {
    return null;
  }
  const images = imgs.map(({src, type}, index) => (
    <SwiperSlide
      key={index}
      className={s.active}
    >
      <div className="swiper-zoom-container">
        {
          type === 'video' ? (
            <PlayerView
              key={src}
              muted={'false'}
              classNameContainer={s.verticalContainerPlayer}
              classNamePlayer={s.verticalPlayer}
              src={`https://master-pola.com/${src}`}
              autoplay={false}
            />
          ) : (
            <img
              placeholder={'blur'}
              alt={'Напольные покрытие и двери'}
              src={`https://master-pola.com/${src}`}
            />
          )
        }
      </div>
    </SwiperSlide>
  ));

  return (
    <div className={s.galleryContainer} ref={carouselBlockRef}>
      <IconButton
        onClick={() => setIsOpenGallery(false)}
        className={s.close}
        size={'small'}
      >
        <CloseIcon/>
      </IconButton>

      <div>
        <Swiper
          zoom={true}
          slidesPerView={1}
          navigation={true}
          pagination={{
            clickable: true
          }}
          modules={[
            Zoom, Navigation, Pagination, EffectFade, A11y
          ]}
        >
          {images}
        </Swiper>
      </div>
    </div>
  );
};

export default Gallery;
