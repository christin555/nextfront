import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import CarouselCards from '../../../CarouselCards';

@inject(({RootStore: {PopularStore,  deviceType}}) => {
    return {
        popularProducts: PopularStore.popularProducts || [],
        deviceType
    };
})
@observer
class WatchedProducts extends Component {

    render() {
        const {popularProducts, deviceType} = this.props;

        if (!popularProducts?.length) {
            return <div/>
        }

        return (
            <CarouselCards
                deviceType={deviceType}
                products={popularProducts}
                title={'Мастер советует'}
            />
        )
    }
};

export default WatchedProducts;
