import React from 'react';
import {inject, Provider} from 'mobx-react';
import {DoorsStore} from '../../../../src/stores/Filter/DoorsStore';
import Fields from './fields';
import FilterView from "../FilterView";

@inject('RootStore')
class DoorsFilterView extends React.Component {
  constructor(props) {
    super(props);

    const {RootStore} = this.props;

    this.FilterStore = RootStore.DoorsStore;
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

DoorsFilterView.CATEGORY = DoorsStore.category;

export default DoorsFilterView;
