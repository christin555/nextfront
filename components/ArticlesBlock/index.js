import React, {Component} from 'react';
import s from './style.module.scss';
import Title from '../Title';
import NextLink from "next/link";
import Cards from "../NewsCards/Cards";
import {inject, observer} from "mobx-react";
import {Typography} from "@mui/material";


@inject(({RootStore: {BlocksStore}}) => {
    return {
        articles: BlocksStore.articles || []
    };
})
@observer
class Blog extends Component {

    render() {
        const {articles} = this.props;

        return (
            <div className={s.blog}>
                <div>
                    <div className={s.title}>
                        <Typography variant={'h6'}>
                            {'Помогаем выбрать лучшее'}
                        </Typography>
                        <NextLink href={`/catalog`} passHref>
                            <a> Все статьи </a>
                        </NextLink>
                    </div>
                    <span>
                            Наши специалисты имеют многолетний опыт в укладке напольных покрытий и всегда рады
                            поделиться
                            своими
                            знаниями!
                        </span>
                </div>
                <div className={s.cards}><Cards articles={articles} mediaClass={s.media}/></div>
            </div>
        )
    }
};

export default Blog;
