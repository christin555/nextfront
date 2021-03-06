import React from 'react';
import {inject, observer} from 'mobx-react';
import CatalogCard from '../../../CatalogCard';
import s from './Content.module.scss';

@inject(({RootStore: {CatalogStore}}) => {
    return {
        categories: CatalogStore.categories || []
    };
}) @observer
class CategoriesView extends React.Component {
    render() {
        const {categories} = this.props;

        if (!categories.length) {
            return <div/>
        }

        return (
            <div className={s.categories}>
                {
                    categories.map(({name, img, alias}, index) => (
                        <CatalogCard key={index} name={name} img={img} alias={alias}/>
                    ))
                }
            </div>
        );
    }
}

export default CategoriesView;
