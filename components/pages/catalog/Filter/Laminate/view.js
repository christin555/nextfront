import React from 'react';
import {inject, Provider} from 'mobx-react';
import Fields from './fields';
import FilterView from '../FilterView';
import {LaminateStore} from "../../../../../src/stores/Filter/LaminateStore";

@inject('RootStore')
class LaminateFilterView extends React.Component {
    constructor(props) {
        super(props);

        const {RootStore} = this.props;

        this.FilterStore = RootStore.LaminateStore;
    }

    render() {
        return (
            <Provider FilterStore={this.FilterStore}>
                <FilterView>
                    <Fields/>
                </FilterView>
            </Provider>
        );
    }
}

LaminateFilterView.CATEGORY = LaminateStore.category;

export default LaminateFilterView;
