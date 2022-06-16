import React from 'react';
import {inject} from 'mobx-react';
import s from './Article.module.scss';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import Image from "next/image";
import PlayerView from "../../../VideoPlayer";
import {A11y, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/a11y';
import PlaceIcon from "@mui/icons-material/Place";
import CardProduct from "../../../Cards/Card";
import CardService from "../../../ServiceCard";

require('dayjs/locale/ru');

dayjs.locale('ru')

@inject(({RootStore: {ArticlesStore}}) => {
    return {
        article: ArticlesStore.article || {}
    };
})
class Content extends React.Component {
    get cardsProducts() {
        const {products} = this.props.article?.relations;

        return products.map((item) => (<CardProduct key={item.id} {...item}/>));
    }

    get cardsServices() {
        const {services} = this.props.article?.relations;

        return services.map((item) => (<CardService key={item.id} {...item}/>));
    }


    get services() {
        const {services} = this.props.article?.relations;

        if (!services?.length) {
            return <div/>
        }
        return <div className={s.details}>
            <Typography variant={'overline'}>
                {'УСЛУГИ'}
            </Typography>
            <div className={s.cards}>
                {this.cardsServices}
            </div>
        </div>
    }

    get products() {
        const {products} = this.props.article?.relations;

        if (!products.length) {
            return <div/>
        }
        return <div className={s.details}>
            <Typography variant={'overline'}>
                {'ТОВАРЫ'}
            </Typography>
            <div className={s.cards}>
                {this.cardsProducts}
            </div>
        </div>
    }

    get media() {
        const {article} = this.props;
        const {media, articleType, title, mediaPosition} = article;
        switch (articleType) {
            case 'video':
            case  'short':
                const video = media[0];
                const _src = video.type === 'youtube' ? 'https://www.youtube-nocookie.com/watch?v=' + video.src : video.src;
                return <PlayerView
                    classNameContainer={s[this.mediaPositionPlayerContainerClass[mediaPosition]]}
                    classNamePlayer={s[this.mediaPositionPlayerClass[mediaPosition]]}
                    src={_src}
                />
            case 'img':
                return <div className={s.mediaI}>
                    <Image
                        placeholder={'blur'}
                        blurDataURL="/blur.png"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        alt={title}
                        src={media[0].src}
                        loader={() => media[0].src}
                    />
                </div>
            case 'carousel':
                return <div className={s.container}>
                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        slidesPerView={1}
                        navigation={true}
                        pagination={{
                            clickable: true
                        }}
                    >
                        {
                            media.map(({src, type}, index) => {
                                return <SwiperSlide key={index}>
                                    <div className={s.slide}>
                                        <img src={src}/>
                                    </div>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            default:
                return null
        }
    }

    get category() {
        const {category} = this.props.article;

        switch (category) {
            case 1:
                return <span className={s.categoryLabel}> Работы </span>;
            case 2:
                return <span className={s.categoryLabel}> Товары </span>;
        }

        return null;
    }

    mediaPositionPlayerContainerClass = {
        horizontal: 'horizontalContainerPlayer',
        vertical: 'verticalContainerPlayer',
    }

    mediaPositionPlayerClass = {
        horizontal: 'horizontalPlayer',
        vertical: 'verticalPlayer',
    }

    mediaPositionClass = {
        horizontal: 'horizontalContainer',
        vertical: 'verticalContainer',
    }

    render() {
        const {article} = this.props;
        const {title, place, content, createdAt, mediaPosition, watchCount, media = []} = article;

        return (
            <div className={s[this.mediaPositionClass[mediaPosition]]}>
                {this.media}
                <div>
                    <Box padding={'0 20px'}>
                        <Typography variant="h5" component="h2" className={s.title}>
                            {title}
                        </Typography>
                        {
                            place && <Typography variant={'overline'} display={'flex'} alignItems={'center'}>
                                <PlaceIcon className={s.icon}/>
                                {place}
                            </Typography> || null
                        }
                    </Box>
                   {/*<div className={s.divider}/>*/}
                    <Box padding={'0 20px 50px'}>
                        <div className={s.contentText}>
                            <div className={s.articleContent}>
                                {(content || '')
                                    .split('\n')
                                    .map((item, index) =>
                                        <span key={index}>{item.replace(/\\n/g, '')}</span>)}

                            </div>
                        </div>
                        <span className={s.count}> Просмотры: {watchCount} </span>
                        <span className={s.date}>
                            {createdAt && dayjs(createdAt).format('D MMMM YYYY')}
                        </span>
                    </Box>
                    {this.services}
                    {this.products}
                </div>


            </div>
        );
    }
}

export default Content;
