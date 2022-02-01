import React from 'react';
import {inject, observer} from 'mobx-react';
import {status as statusEnum} from '../../../src/enums';
import Loader from "../../Loader";
import CatalogView from "./CatalogView";
import PageNotFound from "../../InformBlocks/PageNotFound";
import Box from "@mui/material/Box";

@inject(({RootStore: {CatalogStore}}) => {
    return {
        status: CatalogStore.status
    };
}) @observer
class Product extends React.Component {
    render() {
        const {status, headers} = this.props;

        if (status === statusEnum.ERROR) {
            return <PageNotFound/>
        }

        return <>
            {status === statusEnum.LOADING  && <Loader/> || <Box position={'absolute'}/>}
            <CatalogView headers={headers}/>
        </>;
    }
}

export default Product;
