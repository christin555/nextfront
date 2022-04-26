import React from 'react';
import s from './Content.module.scss';
import {inject, observer} from 'mobx-react';
import Hierarchy from '../../../Hierarchy';
import classNames from 'classnames';
import Categories from './Categories';
import Products from './Products';
import Filter from '../Filter';
import Banner from "./Banner";
import Blog from "./Blog";
import Title from "../../../Title";

@inject(({RootStore: {CatalogStore}}) => {
    return {
        hierarchy: CatalogStore.hierarchy || [],
        status: CatalogStore.status,
        productsAvailable: CatalogStore.productsAvailable,
        fastfilter: CatalogStore.fastfilter,
        category: CatalogStore.category
    };
}) @observer
class Content extends React.Component {
    render() {
        const {hierarchy, fastfilter, category} = this.props;

        if (fastfilter) {
            return (
                <div className={s.container}>
                    {this.InformBlock}
                    <div className={classNames(s.content, s.buttomMargin)}>
                        <Products/>
                    </div>
                    <Categories/>
                </div>
            );
        }

        return (
            <div className={s.container}>
                <Banner className={s.banner}/>
                <Title title={this.props.headerTitle}/>
                <Hierarchy hierarchy={hierarchy} className={s.hierarchy}/>
                <Categories/>
                <div className={s.content}>
                    <Filter category={category}/>
                    <Products/>
                </div>
                <Blog/>
            </div>
        );
    }
}

export default Content;
