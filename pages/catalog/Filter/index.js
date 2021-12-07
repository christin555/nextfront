import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FilterView from './FilterView';
import {inject, observer} from 'mobx-react';
import {get} from 'mobx';
import filterFabric from './filterFabric';

@inject(({RouterStore, RootStore: {ActiveFilterStore}}) => {
  return {
    category: RouterStore.query.category || null,
    isActive: ActiveFilterStore.isActive
  };
}) @observer
class Filter extends Component {
  render() {
    const Fields = filterFabric(this.props.category);

    if (!Fields) {
      return null;
    }

    return <Fields />
  }
}

Filter.propTypes = {
  category: PropTypes.string
};

export default Filter;
