import React from 'react';
import s from './ArticlesFull.module.scss';
import CardMedia from '@mui/material/CardMedia';
import MovieIcon from '@mui/icons-material/Movie';
import NextLink from 'next/link';
import {inject, observer} from 'mobx-react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import CollectionsIcon from '@mui/icons-material/Collections';
import Image from 'next/image';
import cn from 'classnames';
import PlayerView from '../VideoPlayer';
import {A11y, Navigation, Pagination} from 'swiper';
import Button from '../Button';
import {Swiper, SwiperSlide} from 'swiper/react';

require('dayjs/locale/ru');

dayjs.locale('ru');

@inject(`RootStore`)
@observer
class ArticlesView extends React.Component {
  mediaPositionPlayerContainerClass = {
    horizontal: 'horizontalContainerPlayer',
    vertical: 'verticalContainerPlayer'
  }

  mediaPositionPlayerClass = {
    horizontal: 'horizontalPlayer',
    vertical: 'verticalPlayer'
  }

  mediaPositionClass = {
    horizontal: 'horizontalContainer',
    vertical: 'verticalContainer'
  }

  routeChange = (alias) => {
    this.props.RootStore.ArticlesStore.setAlias(alias);
  };

  icons = {
    'video': <PlayArrowIcon className={s.icon} />,
    'carousel': <CollectionsIcon className={s.icon} />,
    'short': <MovieIcon className={s.icon} />
  };

  media = ({media, articleType, title, mediaPosition}) => {
    switch (articleType) {
      case 'video':
      case 'short':
        const video = media[0];
        const _src = video.type === 'youtube' ? `https://www.youtube-nocookie.com/watch?v=${video.src}` : video.src;

        return (
          <PlayerView
            muted={'true'}
            classNameContainer={s[this.mediaPositionPlayerContainerClass[mediaPosition]]}
            classNamePlayer={s[this.mediaPositionPlayerClass[mediaPosition]]}
            src={_src}
          />
        );
      case 'img':
        return (
          <div className={s.mediaI}>
            <Image
              placeholder={'blur'}
              blurDataURL='/blur.png'
              width='100%'
              height='100%'
              layout='responsive'
              objectFit='contain'
              alt={title}
              src={media[0].src}
              loader={() => media[0].src}
            />
          </div>
        );
      case 'carousel':
        return (
          <div className={s.carousel}>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              slidesPerView={1}
              navigation={true}
              pagination={{
                clickable: true
              }}
            >
              {
                media?.map(({src, type}, index) => (
                  <SwiperSlide key={index}>
                    <div className={s.slide}>
                      <img src={src} alt={title} />
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    const {articles, mediaClass} = this.props;

    return articles.map(({title, id, watchCount, content, media, imgPreview, mediaPosition, alias, articleType}) => (
      <div className={s.cardContainer}>
        {this.media({media, articleType, title, mediaPosition})}
        <div className={s.body}>
          <div className={s.title}> {title} </div>
          <div className={s.more}>
            <NextLink
              href={{
                pathname: '/blog/article/[id]',
                query: {id: alias}
              }}
              as={`/blog/article/${alias}`}
              passHref
              shallow={true}
              key={id}
            >
              <a className={s.button} onClick={() => this.routeChange(alias)}>
                <Button
                  color={'secondary'}
                >
                  {'Подробнее'}
                </Button>
              </a>
            </NextLink>
          </div>
          <div className={s.content}>
            {(content || '')
              .split('\n')
              .map((item, index) =>
                <span key={index}>{item.replace(/\\n/g, '')}</span>)}
          </div>

        </div>
      </div>

    ));
  }
}

export default ArticlesView;
