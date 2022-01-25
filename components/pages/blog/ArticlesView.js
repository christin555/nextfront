import React from 'react';
import {inject} from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Articles.module.scss';
import Cards from "../../NewsCards/Cards";
import Head from "next/head";
import Hierarchy from "../../HierarchyNew";
import Meta from "../../HeadComponent";


@inject(({RootStore: {ArticlesStore}}) => {
    return {
        articles: ArticlesStore.articles || []
    };
})
class ArticlesView extends React.Component {
    get breadcumbs(){
        return {
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
                    }
                ]
        }
    }
    render() {
        const {articles} = this.props;

        return (
            <React.Fragment>
                    <Meta
                        desc={'Наши специалисты имеют многолетний опыт в укладке напольных покрытий и всегда рады поделиться своими знаниями! Рассказываем как укладывать и выбрать напольное покрытие'}
                        title={'Наш блог - советы, новости и полезные статьти - Мастер Пола'}
                        breadcumbs={this.breadcumbs}
                    />

                <div className={s.header}>
                    {'БЛОГ'}
                    <div className={s.line}/>
                </div>
                <Hierarchy hierarchy={[{pathname: '/blog', name: 'Блог'}]}/>
                <div className={s.cards}>
                        <Cards articles={articles}/>
                </div>
            </React.Fragment>
        );
    }
}

export default ArticlesView;
