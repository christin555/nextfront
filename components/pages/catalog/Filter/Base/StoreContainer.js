import React from 'react';
import {inject, Provider} from 'mobx-react';
import Fields from './renderFields';
import FilterView from '../FilterView';

@inject('RootStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {RootStore, storeName} = this.props;

        this.FilterStore = RootStore[storeName];

        RootStore.CatalogStore.setActiveFilterStore(this.FilterStore);
    }

    componentWillUnmount() {
        const {RootStore} = this.props;
        RootStore.CatalogStore.setActiveFilterStore({});
    }

    render() {
        return (
            <Provider FilterStore={this.FilterStore}>
                <FilterView>
                    <Fields addFields={this.props.addFields}/>
                </FilterView>
            </Provider>
        );
    }
}

export default FilterViewHOC;
