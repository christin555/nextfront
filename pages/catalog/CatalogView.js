import React from 'react';
import s from './Catalog.module.scss';
import {inject, observer} from 'mobx-react';
import Title from '../../components/Title';
import Content from './Content'
import Head from "next/head";


@inject(({RootStore: {CatalogStore}}) => {
    return {
        hierarchy: CatalogStore.hierarchy,
        status: CatalogStore.status,
        fastfilter: CatalogStore.fastfilter
    };
}) @observer
class Catalog extends React.Component {
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
          </Head>
        <div className={s.header}>
          <Title title={this.headerTitle} />
        </div>
        <div className={s.content}>
          <Content />
        </div>
      </>
    );
  }
}

export default Catalog;
