import React from 'react';
import {inject} from 'mobx-react';
import s from './Articles.module.scss';
import Cards from "../../NewsCards/Cards";
import AppsIcon from '@mui/icons-material/Apps';
import Worker from '../../Icons/Worker';
import classNames from "classnames";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Image from "next/image";
import Skeleton from '@mui/material/Skeleton';
import {posts} from "../../../src/enums";
import StoreIcon from '@mui/icons-material/Store';
import {Box} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

@inject(({RootStore: {ArticlesStore}}) => {
    return {
        articles: ArticlesStore.articlesFiltered || [],
        filter: ArticlesStore.filter || [],
        setFilter: ArticlesStore.setFilter
    };
})
class ArticlesView extends React.Component {
    filterItems = [
        {value: 'all', Icon: AppsIcon},
        {value: posts.WORKS, Icon: Worker},
        {value: posts.PRODUCT, Icon: StoreIcon},
    ]

    render() {
        const {articles, filter, setFilter} = this.props;

        return (
            <React.Fragment>
                <div className={s.desc}>
                    <div className={s.logo}>
                        <Image
                            quality={100}
                            width={45}
                            height={45}
                            layout='responsive'
                            src={'/emoji.png'}
                        />
                    </div>
                    <div>
                        <p><b> Хочешь сделать что-то хорошо - сделай сам!</b></p>
                        <p><b> Хочешь идеальные полы - обратись к Мастер Пола!</b></p>
                        <Box marginTop={'10px'} className={s.flexItems}>
                            <p><DoneIcon/> Уложено более 80 000 м²</p>
                            <p><DoneIcon/> Лучшие цены в городе</p>
                            <p><DoneIcon/> Для тех, кто ценит качество</p>
                        </Box>
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
