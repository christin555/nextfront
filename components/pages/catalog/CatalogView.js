import React from 'react';
import s from './Catalog.module.scss';
import {inject, observer} from 'mobx-react';
import Title from '../../Title';
import Content from './Content'
import {toJS} from "mobx";
import Meta from "../../HeadComponent";
import Contact from "../home/Blocks/Contact";


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
    get breadcumbs() {

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
        const {headers = {}} = this.props;
        const desc = headers.desc;
        const title = headers.title;
        const canonical = headers.asPath;

        return (
            <>
                <Meta
                    desc={desc}
                    title={title}
                    breadcumbs={this.breadcumbs}
                    canonical={canonical}
                />
                <Title title={this.headerTitle}/>
                <div className={s.content}>
                    <Content/>
                </div>
            </>
        );
    }
}

export default Catalog;
