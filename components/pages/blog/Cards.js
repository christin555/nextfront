import React from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Articles.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';
import Button from '../../Button';
import NextLink from 'next/link';
import {inject, observer} from "mobx-react";
import dayjs from 'dayjs';
require('dayjs/locale/ru');

dayjs.locale('ru')

@inject(`RouterStore`)
@observer
class ArticlesView extends React.Component {
    getMedia = ({src, type}) => {
        switch (type) {
            case 'youtube':
                return {
                    component: "iframe",
                    image: `https://www.youtube.com/embed/${src}`
                }
            case 'img':
                return {image: src}
            default:
                return {}
        }
    }

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
        const {articles, maxW} = this.props;

        return articles.map(({src, title, createdAt, content, id, type, alias}) => {
            const media = this.getMedia({src, type});

            return (
                <Card sx={{maxWidth: maxW || 345}} key={id}>
                    <CardActionArea>
                        <CardMedia
                            alt={title}
                            className={s.media}
                            {...media}
                        />
                        <CardContent>
                            <Typography className={s.title}
                                        gutterBottom={true}
                                        variant='body2'
                                        component='div'>
                                {title}
                            </Typography>
                            <Typography
                                color='text.secondary'
                                className={s.articleContent}
                                component={'description'
                                }>
                                {(content || '').replace(/\\n/g, '').substr(0, 150)}
                            </Typography>
                            <span className={s.date}>
                            {createdAt && dayjs(createdAt).format('D MMMM')}
                        </span>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={s.actions}>
                        <NextLink
                            href={{
                                pathname: '/blog/article/[id]',
                                query: {id: alias}
                            }}
                            as={`/blog/article/${alias}`}
                            passHref
                            shallow={true}
                        >
                            <Button
                                size='small'
                                color='primary'
                                onClick={() => this.routeChange(alias)}>
                                ЧИТАТЬ
                            </Button>
                        </NextLink>
                    </CardActions>
                </Card>
            );
        })
    }
}

export default ArticlesView;
