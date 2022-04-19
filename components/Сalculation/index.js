import React from 'react';
import {Provider} from 'mobx-react';
import {CallmeStore} from '../../src/stores/CallmeStore';
import CalculationView from './CalculationView';

class Calculation extends React.Component {
  constructor(props) {
    super(props);

    this.CallmeStore = new CallmeStore();
  }

  render() {
    return (
      <Provider CallmeStore={this.CallmeStore}>
        <CalculationView {...this.props} />
      </Provider>
    );
  }
}

export default Calculation;
