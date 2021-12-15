import React from 'react';
import {inject, Provider} from 'mobx-react';
import Fields from './fields';
import FilterView from '../FilterView';
import {KeramogranitStore} from "../../../../../src/stores/Filter/KeramogranitStore";
import DoorsFilterView from "../Doors/view";

@inject('RootStore')
class KeramogranitFilterView extends React.Component {
    constructor(props) {
        super(props);

        const {RootStore} = this.props;

        this.FilterStore = RootStore.KeramogranitStore;
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

KeramogranitFilterView.CATEGORY = KeramogranitStore.category;

export default KeramogranitFilterView;
