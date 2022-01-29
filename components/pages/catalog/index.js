import React from 'react';
import {inject, observer} from 'mobx-react';
import {status as statusEnum} from '../../../src/enums';
import Loader from "../../Loader";
import CatalogView from "./CatalogView";
import PageNotFound from "../../InformBlocks/PageNotFound";

@inject(({RootStore: {CatalogStore}}) => {
    return {
        status: CatalogStore.status
    };
}) @observer
class Product extends React.Component {
    render() {
        const {status} = this.props;

        if (status === statusEnum.LOADING) {
            return <Loader/>
        }
        if (status === statusEnum.SUCCESS) {
            return <CatalogView/>
        }
        if (status === statusEnum.ERROR) {
            return <PageNotFound />
        }
        return null;
    }
}

export default Product;
