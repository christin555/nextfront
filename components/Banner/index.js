// Import Swiper React components
import {Navigation, Pagination, Autoplay, EffectFade, A11y} from 'swiper';
import Image from 'next/image';
import Button from '../Button';
import s from './Banner.module.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import {Typography} from '@mui/material';
import React from 'react';
import classNames from 'classnames';
import NextLink from 'next/link';

const CarouselView = ({deviceType, className, setSelection, items}) => {

  const isMobile = deviceType === 'mobile';

  return (
    <div className={classNames(s.container, className)}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={!isMobile}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true
        }}
        pagination={{clickable: true}}
      >
        {
          items.map(({
            category,
            mobileBackground,
            img,
            text,
            title,
            reverse,
            background,
            link,
            alignItems = 'center',
            justifyContent = 'flex-end',
            textButton,
            selection,
            mobAlignItems,
            mobJustifyContent
          }, index) => (
            <SwiperSlide key={index}>
              <div className={classNames(s.slide, {[s.reverse]: reverse})}>
                {
                  img && (
                    <div className={s.image}>
                      <img src={img} />
                    </div>
                  ) || null
                }
                <div className={s.text}>
                  <div
                    className={s.content}
                    style={{
                      alignItems: isMobile && mobAlignItems || alignItems,
                      justifyContent: isMobile && mobJustifyContent || justifyContent
                    }}
                  >
                    <Typography
                      className={s.title}
                      variant={isMobile && 'h4' || 'h3'}
                    > {title}
                    </Typography>
                    <Typography
                      className={s.desc}
                      variant={isMobile && 'body2' || 'h6'}
                    >
                      {text}
                    </Typography>
                    {link ? (
                      <NextLink
                        href={link}
                        passHref={true}
                        shallow={true}
                      >
                        <Button
                          onClick={() => selection && setSelection(selection, category) || null}
                          variant={'contained'}
                          color={'secondary'}
                          className={s.button}
                        >
                          {textButton}
                        </Button>
                      </NextLink>
                    ) : null}
                  </div>

                  <div className={s.background}>
                    <img src={isMobile && mobileBackground || background} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default CarouselView;
