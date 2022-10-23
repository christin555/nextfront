import s from './Gallery.module.scss';
import {Zoom, A11y, EffectFade, Navigation, Pagination} from "swiper";
import React, {useRef} from "react";
import {Swiper, SwiperSlide,} from 'swiper/react';
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from '@mui/material';

const Gallery = (props) => {
    const {
        isOpen,
        imgs,
        setIsOpenGallery
    } = props;
    const carouselBlockRef = useRef(null);

    if(!isOpen){
        return null
    }
    const images = imgs.map(({src}, index) => <SwiperSlide
        key={index} className={s.active}>
        <div className="swiper-zoom-container">
        <img
            placeholder={'blur'}
            alt={'Слайд'}
            src={src}
        />
        </div>
    </SwiperSlide>);

    return (
        <div className={s.galleryContainer} ref={carouselBlockRef}>
            <IconButton
                onClick={()=>setIsOpenGallery(false)}
                className={s.close}
                size={'small'}
            >
                <CloseIcon />
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
    )
}
export default Gallery;
