import React from 'react';
import s from './Catalog.module.scss';
import {inject, observer} from 'mobx-react';
import Title from '../../Title';
import Content from './Content'
import {toJS} from "mobx";
import Meta from "../../HeadComponent";
import DescriptionMain from "./Description";
import Watched from "./Content/Watched";


@inject(({RootStore: {CatalogStore, ActiveFilterStore}}) => {
    return {
        hierarchy: CatalogStore.hierarchy,
        fastfilter: CatalogStore.fastfilter,
        alias: CatalogStore.category,
        selection: ActiveFilterStore.selection
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
        const {hierarchy, fastfilter, selection} = this.props;

        if (selection?.title) {
            return selection.title;
        }

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
                <div className={s.content}>
                    <Content headerTitle={this.headerTitle}/>
                </div>
                <DescriptionMain/>
            </>
        );
    }
}

export default Catalog;
