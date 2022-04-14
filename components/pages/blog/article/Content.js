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
        const {src, type, title} = article;
        switch (type) {
            case 'youtube':
                return <CardMedia
                    alt={title}
                    className={s.mediaV}
                    component={"iframe"}
                    image={`https://www.youtube.com/embed/${src}`}
                />

            case 'img':
                return <div className ={s.mediaI}>
                    <Image
                        placeholder={'blur'}
                        blurDataURL="/blur.png"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        alt={title}
                        src={src}
                        loader={() => src}
                        />
                </div>
            default:
                return {}
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

    mediaPositionClass = {
        horizontal: 'horizontalContainer',
        vertical: 'verticalContainer',
    }

    render() {
        const {article} = this.props;
        const {title, content, createdAt, mediaPosition, watchCount} = article;

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
