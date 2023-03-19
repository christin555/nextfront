import React, {Component} from 'react';
import PropTypes from 'prop-types';
import filterFabric from './filterFabric';

class Filter extends Component {
  render() {
    const Fields = filterFabric(this.props.category);

    if (!Fields) {
      return <div />;
    }

    return Fields;
  }
}

Filter.propTypes = {
  category: PropTypes.string
};

export default Filter;
