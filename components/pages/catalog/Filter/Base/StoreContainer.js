import React from 'react';
import {inject, Provider} from 'mobx-react';
import Fields from './renderFields';
import FilterView from '../FilterView';

@inject('RootStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {RootStore, storeName} = this.props;

        // this.FilterStore = RootStore.ActiveFilterStore;
       // RootStore.CatalogStore.setActiveFilterStore(this.FilterStore);
    }

    componentWillUnmount() {
        const {RootStore, storeName} = this.props;
        //RootStore.deleteStore(storeName)
        //RootStore.CatalogStore.setActiveFilterStore({});
    }

    render() {
        return (
                <FilterView>
                    <Fields addFields={this.props.addFields}/>
                </FilterView>
        );
    }
}

export default FilterViewHOC;
