import React from 'react';
import s from './Catalog.module.scss';
import {inject, observer} from 'mobx-react';
import Title from '../../Title';
import Content from './Content'
import Head from "next/head";
import {autorun, toJS} from "mobx";
import Meta from "../../HeadComponent";


@inject(({RootStore: {CatalogStore}}) => {
    return {
        hierarchy: CatalogStore.hierarchy,
        status: CatalogStore.status,
        fastfilter: CatalogStore.fastfilter,
        alias: CatalogStore.category,
        products: toJS(CatalogStore.products),
        CatalogStore
    };
}) @observer
class Catalog extends React.Component {
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
    }
    get headerTitle() {
        const {hierarchy, fastfilter} = this.props;

        if (!hierarchy?.length && fastfilter) {
            return `Поиск`;
        }

        return hierarchy?.length && hierarchy[hierarchy.length - 1].name || 'Каталог';
    }

    render() {
        const {alias} = this.props;
        const url = alias && `/${alias}` || '';
        const desc = `Купить ${alias ? alias : 'напольные покрытия и двери'} в Тюмени. Только проверенные и качественные бренды по лучшей цене`;

        return (
            <>
                <Meta
                    desc={desc}
                    title={`${this.headerTitle} | Мастер Пола`}
                    breadcumbs={this.breadcumbs}
                    canonical={url}
                />

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
