import React from 'react';
import s from './Content.module.scss';
import Cards from '../../../Cards';
import {inject, observer} from 'mobx-react';
import Chips from './Chips';
import Pagination from '@mui/material/Pagination';
import {IconButton} from '@mui/material';
import classNames from 'classnames';
import Select from "../../../Select";
import Order from "./Order";
import Limit from "./Limit";
import {status as statusEnum} from "../../../../src/enums";
import {NoResults} from "../../../InformBlocks";
import Skeleton from '@mui/material/Skeleton';
const plural = require('plural-ru');

@inject(({RootStore: {CatalogStore, PageStore}}) => {
    return {
        products: CatalogStore.products || [],
        productsAvailable: CatalogStore.productsAvailable,
        count: CatalogStore.count,
        fastfilter: CatalogStore.fastfilter,
        setPage: PageStore.setPage,
        setLimit: PageStore.setLimit,
        page: PageStore.page,
        limit: PageStore.limit,
        isLastLevel: CatalogStore.isLastLevel,
        status: CatalogStore.status
    };
}) @observer
class Content extends React.Component {
    get label() {
        const {
            count,
            fastfilter,
            status
        } = this.props;

        if (status === statusEnum.LOADING) {
            return   <Skeleton width={210} variant="text" />
        }

        const pluralLabel = plural(
            count,
            'товар',
            'товара',
            'товаров'
        );

        if (fastfilter) {
            return `По вашему запросу «${fastfilter}» нашлось ${count} ${pluralLabel}`;
        }

        return `${count} ${pluralLabel}`;
    }

    get count() {
        const {
            count,
            limit
        } = this.props;

        return Math.ceil(count / limit);
    }

    setPage = (_, count) => {
        const {setPage, contentRef} = this.props;

        console.log(contentRef);

        window.scrollTo(0, contentRef.current.offsetTop - 50);

        setPage(count);
    }

    get InformBlock() {
        const {status, productsAvailable, fastfilter} = this.props;

        if (!productsAvailable && status !== statusEnum.LOADING) {
            return <NoResults label={fastfilter}/>;
        }

        return <div/>;
    }

    get pagination() {
        const {page} = this.props;

        return (
            <Pagination
                size='small'
                className={s.pagnt}
                count={this.count}
                page={Number(page)}
                onChange={this.setPage}
                color={'secondary'}
            />
        );
    }

    render() {
        const {products, isLastLevel, fastfilter} = this.props;

        if (!isLastLevel && !fastfilter) {
            return <div/>;
        }

        return (
            <div className={s.cardsContainer}>
                <div className={s.header}>
                    <div className={s.count}>
                        {this.label}
                    </div>
                    <div>
                        <div className={s.options}>
                            <Order/>
                        </div>
                    </div>
                </div>
                <Chips/>
                {this.InformBlock}
                <div className={s.cards}>
                    <Cards items={products} value={1}/>
                </div>
                <div className={s.footer}>
                    {this.pagination}
                    <div>
                        <Limit/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
