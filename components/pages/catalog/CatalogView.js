import React from 'react';
import s from './Catalog.module.scss';
import {inject, observer} from 'mobx-react';
import Title from '../../Title';
import Content from './Content'
import Head from "next/head";
import {autorun} from "mobx";


@inject(({RootStore: {CatalogStore}}) => {
    return {
        hierarchy: CatalogStore.hierarchy,
        status: CatalogStore.status,
        fastfilter: CatalogStore.fastfilter,
        alias: CatalogStore.category,
        CatalogStore
    };
}) @observer
class Catalog extends React.Component {
    componentWillUnmount() {

        // this.props.CatalogStore.getHierarchyDisposer();
        // this.props.CatalogStore.getCatalogDisposer();
        // this.props.CatalogStore.getCountProductsDisposer();
    }

    get headerTitle() {
        const {hierarchy, fastfilter} = this.props;

        if (!hierarchy?.length && fastfilter) {
            return `Поиск`;
        }

        return hierarchy?.length && hierarchy[hierarchy.length - 1].name || 'Каталог';
    }

    render() {
        const {status} = this.props

        return (
            <>
                <Head>
                    <title>   {this.headerTitle} | Мастер Пола</title>
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
                                                            "@id": "https://master-pola.com/catalog",
                                                            "name": "Каталог"
                                                        }
                                                },
                                                {
                                                    "@type": "ListItem",
                                                    "position": 2,
                                                    "item":
                                                        {
                                                            "@id": `https://master-pola.com/catalog/${this.props.alias}`,
                                                            "name": this.headerTitle
                                                        }
                                                }
                                            ]
                                    }
                                )
                            }}
                    ></script>
                </Head>
                <div className={s.header}>
                    <Title title={this.headerTitle}/>
                </div>
                <div className={s.content}>
                    <Content/>
                </div>
            </>
        );
    }
}

export default Catalog;
