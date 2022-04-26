import React from 'react';
import {inject} from 'mobx-react';
import s from './Articles.module.scss';
import Cards from "../../NewsCards/Cards";
import Meta from "../../HeadComponent";
import Title from "../../Title";
import AppsIcon from '@mui/icons-material/Apps';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import MovieIcon from '@mui/icons-material/Movie';
import classNames from "classnames";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Image from "next/image";
import Skeleton from '@mui/material/Skeleton';

@inject(({RootStore: {ArticlesStore}}) => {
    return {
        articles: ArticlesStore.articlesFiltered || [],
        filter: ArticlesStore.filter || [],
        setFilter: ArticlesStore.setFilter
    };
})
class ArticlesView extends React.Component {
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
                                "@id": "https://master-pola.com/blog",
                                "name": "Блог"
                            }
                    }
                ]
        }
    }

    filterItems = [
        {value: 'all', Icon: AppsIcon},
        {value: 'short', Icon: MovieIcon},
        {value: 'video', Icon: PlayArrowIcon},
    ]

    render() {
        const {articles, filter, setFilter} = this.props;

        return (
            <React.Fragment>
                <Meta
                    desc={'Наши специалисты имеют многолетний опыт в укладке напольных покрытий и всегда рады поделиться своими знаниями! Рассказываем как укладывать и выбрать напольное покрытие'}
                    title={'Наш блог - советы, новости и полезные статьти - Мастер Пола'}
                    breadcumbs={this.breadcumbs}
                />
                <Title title={'Наш блог'}/>
                <div className={s.desc}>
                    <div className={s.logo}>
                        <Image
                            quality={100}
                            width={45}
                            height={45}
                            layout='responsive'
                            src={'/logoCircle.jpg'}
                        />
                    </div>
                    <div>
                        <b>САЛОН НАПОЛЬНЫХ ПОКРЫТИЙ И ДВЕРЕЙ</b>
                        <p> 🏠 Уложено более 80 000 м²</p>
                        <p> 💥 Лучшие цены в городе</p>
                        <p>{'🌍 Продаём по всей России'}</p>
                        <p> 👍🏻 Для тех, кто ценит качество</p>
                        <b> <a href={'vk.com/masterpola'}> vk.com/masterpola</a></b>
                    </div>
                </div>
                <Tabs
                    onChange={setFilter}
                    TabIndicatorProps={{style: {background: 'black', height: '1px'}}}
                    variant="fullWidth" className={s.filter} value={filter}>
                    {this.filterItems.map(({value, Icon}) =>
                        <Tab label={
                            <Icon
                                className={classNames(s.icon, ({[s.activeIcon]: value === filter}))}/>
                        }
                             value={value} key={value}/>)
                    }
                </Tabs>
                <div className={s.cards}>
                    {
                        articles?.length && <Cards articles={articles}/>
                        || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <Skeleton key={i} variant="rectangular" width={300}
                                                                              height={300}/>)
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default ArticlesView;
