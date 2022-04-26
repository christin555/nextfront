import React from 'react';
import s from './Articles.module.scss';
import CardMedia from '@mui/material/CardMedia';
import MovieIcon from '@mui/icons-material/Movie';
import NextLink from 'next/link';
import {inject, observer} from "mobx-react";
import dayjs from 'dayjs';
import classNames from "classnames";
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import CollectionsIcon from '@mui/icons-material/Collections';

require('dayjs/locale/ru');

dayjs.locale('ru')

@inject(`RootStore`)
@observer
class ArticlesView extends React.Component {
    routeChange = (alias) => {
        this.props.RootStore.ArticlesStore.setAlias(alias);
    }

    icons = {
        'video': <PlayArrowIcon className={s.icon}/>,
        'carousel': <CollectionsIcon className={s.icon}/>,
        'short': <MovieIcon className={s.icon}/>
    }

    render() {
        const {articles, mediaClass} = this.props;

        return articles.map(({title, id, watchCount, content, imgPreview, alias, articleType}) => {

            const icon = this.icons[articleType];
            return (
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
                    <a className={s.card} onClick={() => this.routeChange(alias)}>
                        <div className={s.cardContainer}>
                            <div className={s.iconBlock}>
                                {icon}
                            </div>
                            <div className={s.hoverBlock}>
                                <p className={s.hide}> {content} </p>
                                <span>
                                   <b>{title} </b>
                                   <p> Просмотры: {watchCount} </p>
                               </span>
                            </div>
                            <CardMedia
                                alt={title}
                                className={classNames(s.media, mediaClass)}
                                image={imgPreview}
                            />
                        </div>
                    </a>
                </NextLink>
            )
        })
    }
}

export default ArticlesView;
