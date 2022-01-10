import React from 'react';
import {inject} from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Articles.module.scss';
import Cards from "../../NewsCards/Cards";
import Head from "next/head";
import Hierarchy from "../../HierarchyNew";


@inject(({RootStore: {ArticlesStore}}) => {
    return {
        articles: ArticlesStore.articles || []
    };
})
class ArticlesView extends React.Component {
    render() {
        const {articles} = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>   Наш блог | Мастер Пола</title>
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
                                                }
                                            ]
                                    }
                                )
                            }}
                    ></script>
                </Head>
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
