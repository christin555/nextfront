import React from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Articles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';
import Button from '../Button';
import NextLink from 'next/link';
import {inject, observer} from "mobx-react";
import dayjs from 'dayjs';
import classNames from "classnames";

require('dayjs/locale/ru');

dayjs.locale('ru')

@inject(`RouterStore`)
@observer
class ArticlesView extends React.Component {
    routeChange = (alias) => {
        const pathname = `/blog/article/${alias}`;

        this.props.RouterStore.push({
                pathname: '/blog/article/[id]',
                query: {
                    id: alias
                },
            },
            undefined,
            {shallow: true}
        );
    }

    render() {
        const {articles, maxW, mediaClass} = this.props;

        return articles.map(({title, createdAt, id, imgPreview, alias}) => {

            return (
                <NextLink
                    href={{
                        pathname: '/blog/article/[id]',
                        query: {id: alias}
                    }}
                    as={`/blog/article/${alias}`}
                    passHref
                    shallow={true}
                >
                    <a className={s.card}>
                        <Card className={s.root} sx={{maxWidth: maxW}} key={id} onClick={() => this.routeChange(alias)}>
                            <CardMedia
                                alt={title}
                                className={classNames(s.media, mediaClass)}
                                image ={imgPreview}
                            />
                        </Card>
                        <div className={s.content}>
                            <span
                                className={s.articleContent}
                                >
                                {(title || '').replace(/\\n/g, '').substr(0, 150)}
                            </span>
                            <span className={s.date}>
                            {createdAt && dayjs(createdAt).format('D MMMM')}
                        </span>
                        </div>
                    </a>
                </NextLink>
            )
        })
    }
}

export default ArticlesView;
