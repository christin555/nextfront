import React, {useRef} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Nophoto from "../../public/nophoto.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import s from './carousel.module.scss';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {IconButton} from '@mui/material';


const CarouselView = ({imgs}) => {
    const carouselRef = useRef(null);
    const carouselBlockRef = useRef(null);

    let images;

    if (!imgs) {
        images = [{original: Nophoto}];
    }

    images = imgs.map(({src}, index) => <Carousel.Item key={index} className={s.itemCarousel}>
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
    </Carousel.Item>);

    return (
        <div ref={carouselBlockRef}>
            <Carousel
                prevIcon={
                    <IconButton size={'large'} className={s.upButton}>
                        <ArrowBackIosNewIcon className={s.icon}/>
                    </IconButton>
                }
                nextIcon={
                    <IconButton size={'large'} className={s.upButton}>
                        <ArrowForwardIosIcon className={s.icon}/>
                    </IconButton>
                }
                interval={null}
                className={s.carouselHeight}>
                {images}
            </Carousel>
        </div>
    )
}

export default CarouselView;
