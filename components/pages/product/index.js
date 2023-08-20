import React from 'react';
import {inject, observer} from 'mobx-react';
import {status as statusEnum} from '../../../src/enums';
import Loader from '../../Loader';
import ProductView from './ProductView';
import PageNotFound from '../../InformBlocks/PageNotFound';

@inject(({RootStore: {ProductStore}}) => {
  return {
    status: ProductStore.status
  };
}) @observer
class Product extends React.Component {
  render() {
    const {status} = this.props;

    if (status === statusEnum.LOADING) {
      return <Loader />;
    }
    if (status === statusEnum.SUCCESS) {
      return <ProductView />;
    }
    if (status === statusEnum.ERROR) {
      return <PageNotFound />;
    }

    return null;
  }
}

export default Product;
