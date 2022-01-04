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

require('dayjs/locale/ru');

dayjs.locale('ru')

@inject(({RootStore: {ArticlesStore}}) => {
    return {
        article: ArticlesStore.article || {},
        articles: ArticlesStore.articles || [],
    };
})
class ArticlesView extends React.Component {
    get media() {
        const {article} = this.props;
        const {src, type} = article;
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

    render() {
        const {article, articles, alias} = this.props;
        const {title, content, createdAt, type} = article;

        return (
            <React.Fragment>
                <Head>
                    <title>  {title} </title>
                    <script type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(
                                    {
                                        "@context": "http://schema.org",
                                        "@type": "BreadcrumbList",
                                        "itemListElement":
                                            [
                                                {
                                                    "@type": "ListItem",
                                                    "position": 1,
                                                    "item":
                                                        {
                                                            "@id": "https://master-pola.com/blog",
                                                            "name": "Блог"
                                                        }
                                                },
                                                {
                                                    "@type": "ListItem",
                                                    "position": 2,
                                                    "item":
                                                        {
                                                            "@id": "https://master-pola.com/article/${alias}",
                                                            "name": {title}
                                                        }
                                                }
                                            ]
                                    }
                                )
                            }}
                    ></script>
                </Head>
                <div className={s.header}>
                    БЛОГ
                    <div className={s.line}/>
                </div>
                <div className={s.content}>
                    <div className={s.sidebar}>
                        <Typography color='h4'>
                            Читaйтe тaкжe
                        </Typography>
                        <div className={s.cards}>
                            <Cards articles={articles.filter(({alias: _alias}) => alias !== _alias).slice(0, 2)}/>
                        </div>
                        <NextLink
                            href={{
                                pathname: '/blog',
                            }}
                            as={`/blog`}
                            passHref
                            shallow={true}
                        >
                            <Button color={'secondary'}> ВCЕ СТАТЬИ </Button>
                        </NextLink>
                    </div>
                    <div className={s.article}>
                        <Typography
                            className={s.articleContent}
                            variant="h5" component="h2"
                        >
                            {title}
                        </Typography>

                        <Box display={'flex'} margin={'10px 0'}>
                            {this.category}

                            <span className={s.date}>
                            {createdAt && dayjs(createdAt).format('D MMMM')}
                        </span>
                        </Box>

                        <CardMedia
                            alt={title}
                            className={s.media}
                            {...this.media}
                        />

                        <Typography
                            className={s.articleContent}
                            component={'div'}>
                            {(content || '')
                                .split('\n')
                                .map((item, index) =>
                                    <span key={index}>{item.replace(/\\n/g, '')}</span>)}
                        </Typography>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ArticlesView;
