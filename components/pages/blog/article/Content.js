import React from 'react';
import {inject} from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Article.module.scss';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
import Cards from "../../../NewsCards/Cards";
import NextLink from 'next/link';
import Button from '../../../Button';
import dayjs from 'dayjs';
import Head from "next/head";
import Hierarchy from "../../../HierarchyNew";
import Title from "../../../Title";
import Image from "next/image";
import YouTube from "react-youtube";
import ReactPlayer from 'react-player'
import PlayerView from "../../../VideoPlayer";
import {A11y, EffectFade, Navigation, Pagination} from "swiper";
import classNames from "classnames";
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/a11y';

require('dayjs/locale/ru');

dayjs.locale('ru')

@inject(({RootStore: {ArticlesStore}}) => {
    return {
        article: ArticlesStore.article || {}
    };
})
class Content extends React.Component {

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
                return <span className={s.categoryLabel}> Полезные статьи</span>;
            case 2:
                return <span className={s.categoryLabel}> Новости</span>;
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
        const {title, content, createdAt, mediaPosition, watchCount, media = []} = article;
        console.log(media)

        return (
            <div className={s[this.mediaPositionClass[mediaPosition]]}>
                {this.media}
                <div>
                    <Box padding={'0 20px'}>
                        <Typography variant="h5" component="h2" className={s.title}>
                            {title}
                        </Typography>

                        <Box margin={'8px 0'}>
                            {this.category}
                        </Box>
                    </Box>

                    <div className={s.divider}/>
                    <Box padding={'0 20px'}>
                        <span className={s.count}> Просмотры: {watchCount} </span>
                        <div className={s.contentText}>
                            <div className={s.logo}>
                                <Image
                                    quality={100}
                                    width={45}
                                    height={45}
                                    src={'/logoCircle.jpg'}
                                />
                            </div>
                            <div className={s.articleContent}>
                                {(content || '')
                                    .split('\n')
                                    .map((item, index) =>
                                        <span key={index}>{item.replace(/\\n/g, '')}</span>)}

                            </div>
                        </div>
                        <span className={s.date}>
                            {createdAt && dayjs(createdAt).format('D MMMM YYYY')}
                        </span>
                    </Box>
                </div>
            </div>
        );
    }
}

export default Content;
