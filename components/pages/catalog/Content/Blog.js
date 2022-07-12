import React, {Component} from 'react';
import s from './Content.module.scss';
import Cards from "../../../NewsCards/Cards";
import {inject, observer} from "mobx-react";
import TitleBlock from "../../../TitleBlock";
import VideoBlock from '../../../VideoBlock';

@inject(({RootStore: {CatalogStore}}) => {
    return {
        articles: CatalogStore.articles || {}
    };
})
@observer
class Blog extends Component {

    render() {
        const {articles} = this.props;
        if (!articles['static']?.length && !articles['video']?.length) {
            return <div/>
        }

        return (
            <div className={s.blog}>
                <TitleBlock title={'Для лучшего выбора'}/>
                <span style={{display: 'none'}}> Видео, фото и статьи от наших специалистов, чтобы сделать ваш выбор лучшим </span>

                <div className={s.mediaContainer}>
                    {articles['video'].length &&
                    <VideoBlock className={s.video} video={articles['video']}/> || null}
                    <div className={s.popularNews}>
                        <Cards articles={articles['static']}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Blog;
