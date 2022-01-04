import React, {Component, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import SliderCards from '../../../SliderCards';

@inject(({RootStore: {HomeStore}}) => {
    return {
        works: HomeStore.works || [1, 2, 4, 5, 6, 7]
    };
})
@observer
class News extends Component {

    render() {
        const {works} = this.props;

        return (
            <SliderCards cards={works} title={'Новинки'} />
        );
    }
}

export default News;
