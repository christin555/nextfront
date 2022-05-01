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

@inject(({RootStore: {CatalogStore, ActiveFilterStore}}) => {
    return {
        hierarchy: CatalogStore.hierarchy || [],
        fastfilter: CatalogStore.fastfilter,
        category: CatalogStore.category,
        selection: ActiveFilterStore.selection
    };
}) @observer
class Content extends React.Component {
    get desc() {
        const {selection} = this.props;

        if (!selection?.desc) {
            return <div/>
        }

        return <div dangerouslySetInnerHTML={{__html: selection.desc}} className={s.selectionDesc}/>
    }

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
                {this.desc}
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
