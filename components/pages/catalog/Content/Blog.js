import React, {Component} from 'react';
import s from './Content.module.scss';
import {Typography} from "@mui/material";
import Cards from "../../../NewsCards/Cards";
import {inject, observer} from "mobx-react";
import TitleBlock from "../../../TitleBlock";


@inject(({RootStore: {CatalogStore}}) => {
    return {
        articles: CatalogStore.articles || []
    };
})
@observer
class Blog extends Component {

    render() {
        const {articles} = this.props;
        if (!articles?.length) {
            return null
        }

        return (
            <div className={s.blog}>
                <TitleBlock title={'Будет полезно'}/>
                <span style={{display: 'none'}}> Видео, фото и статьи от наших специалистов, чтобы сделать ваш выбор лучшим </span>
                <div className={s.popularNews}>
                    <Cards articles={articles}/>
                </div>
            </div>
        )
    }
};

export default Blog;
