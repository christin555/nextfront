import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import CarouselCards from '../../../CarouselCards';

@inject(({RootStore: {CatalogStore,  deviceType}}) => {
    return {
        watchedProducts: CatalogStore.watchedProducts || [],
        deviceType
    };
})
@observer
class WatchedProducts extends Component {

    render() {
        const {watchedProducts, deviceType} = this.props;

        if (!watchedProducts?.length) {
            return <div/>
        }

        return (
                <CarouselCards
                    deviceType={deviceType}
                    products={watchedProducts}
                    title={'Вы смотрели'}
                />
        )
    }
};

export default WatchedProducts;
