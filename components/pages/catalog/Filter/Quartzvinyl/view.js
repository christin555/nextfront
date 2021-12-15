import React from 'react';
import {inject, Provider} from 'mobx-react';
import Fields from './fields';
import FilterView from '../FilterView';
import {FloorStore} from "../../../../../src/stores/Filter/FloorStore";

@inject('RootStore')
class LaminateFilterView extends React.Component {
    constructor(props) {
        super(props);

        const {RootStore} = this.props;

        this.FilterStore = RootStore.FloorStore;
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


export default LaminateFilterView;
